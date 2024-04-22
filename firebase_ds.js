const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fetch = require('node-fetch');
const sharp = require('sharp');
const {Storage} = require('@google-cloud/storage');
const storage = new Storage();
const { Configuration, OpenAIApi } = require("openai");

admin.initializeApp();

// Assuming you've set your OpenAI API key in Firebase functions config
const openaiConfig = new Configuration({
    apiKey: functions.config().openai.key,
});
const openai = new OpenAIApi(openaiConfig);

exports.processUploadAndRecommend = functions.storage.object().onFinalize(async (object) => {
    const bucketName = object.bucket;
    const filePath = object.name; // The file path in the storage bucket 
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(filePath)
    
    try{
        // Download the image from Firebase Storage
        const [imageBuffer] = await file.download();

       // Preprocess the image: sharpen and auto-orient (correct orientation)
       const processedImageBuffer = await sharp(imageBuffer)
       .rotate() // Automatically adjust orientation based on EXIF data
       .sharpen() // Sharpen the image
       .toBuffer();
        
        await file.save(processedImageBuffer, { resumable: false });
        console.log('Processed image uploaded.');
    }catch(error){
        console.error('An error occurred while processing the image', error);
    }

    const imageLabels = await analyzeImageWithCloudVisionAPI(`gs://${bucketName}/${filePath}`);
    console.log('Detected Labels:', imageLabels);

    const recommendation = await getWellnessRecommendation(imageLabels);
    await storeRecommendationInFirestore(filePath, recommendation);

    console.log(`Recommendation stored for ${filePath}`);
});

async function analyzeImageWithCloudVisionAPI(imageUri) {
    const apiKey = functions.config().cloudvision.key; // Use Firebase functions config to store your API key
    const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

    const requestBody = {
        requests: [
            {
                image: { source: { imageUri } },
                features: [{ type: "LABEL_DETECTION" }],
            },
        ],
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error(`Cloud Vision API responded with status ${response.status}`);
        }

        const jsonResponse = await response.json();
        const labels = jsonResponse.responses[0].labelAnnotations.map(label => label.description);
        return labels;
    } catch (error) {
        console.error('Failed to analyze image:', error);
        throw error;
    }
}

async function getWellnessRecommendation(labels) {
    const response = await openai.createCompletion({
        model: "text-davinci-004", // Use the most suitable model
        prompt: `Generate a wellness recommendation based on these image labels: ${labels.join(', ')}`,
        max_tokens: 150,
    });

    return response.data.choices[0].text.trim();
}

// Store recommendation in Firestore
async function storeRecommendationInFirestore(filePath, recommendation){
    const docPath = `recommendations/${filePath.replace('/', '_')}`;
    await admin.firestore().collection('recommendations').doc(docPath).set({
        filePath,
        recommendation,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

}

