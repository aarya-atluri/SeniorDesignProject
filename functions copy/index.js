const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fetch = require('node-fetch');
const sharp = require('sharp');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const { OpenAI } = require("openai");
// const { getDoc, doc } = require('firebase/firestore');

admin.initializeApp();

// Assuming you've set your OpenAI API key in Firebase functions config
// const apiKey = functions.config().openai.key;
const openai = new OpenAI({
    apiKey: 'have-to-change',
});

exports.processUploadAndRecommend = functions.storage.object().onFinalize(async (object) => {
    const bucketName = object.bucket;
    const filePath = object.name; // The file path in the storage bucket 
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(filePath)
     // const userUid = extractUserUidFromFilePath(filePath);
    
    //  try {
    //     const imageBuffer = await file.download();
      
    //     let processedImageBuffer;
    //     try {
    //       processedImageBuffer = await sharp(imageBuffer)
    //         .rotate() // Automatically adjust orientation based on EXIF data
    //         .sharpen() // Sharpen the image
    //         .toBuffer();
    //     } catch (sharpError) {
    //       console.error('An error occurred while processing the image with sharp:', sharpError);
    //       throw sharpError;
    //     }
      
    //     await file.save(processedImageBuffer, { resumable: false });
    //     console.log('Processed image uploaded.');
    //   } catch (error) {
    //     console.error('An error occurred while processing the image', error);
    //     throw error;
    //   }

    const imageLabels = await analyzeImageWithCloudVisionAPI(`gs://${bucketName}/${filePath}`);
    console.log('Detected Labels:', imageLabels);

    try{
        const recommendation = await getWellnessRecommendation(imageLabels);

        if(recommendation == undefined) {
            throw new Error('Recommendation is undefined');
        }

        await storeRecommendationInFirestore(filePath, recommendation);
    } catch(error) {
        console.error('Error during the recommendation process:', error);
    }

    console.log(`Recommendation stored for ${filePath}`);

    // const token = getTokenForUser(userUid);
    // await sendNotification(token, recommendation);
});

// Get Labels from images 
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
        const labels = jsonResponse.responses?.[0]?.labelAnnotations?.map(label => ({
            description: label.description.toLowerCase(),
        score: label.score
    })) || [];
        
        // MODIFIED: Count occurrences of labels related to screen time and social interactions
        const screenTimeLabels = ['computer', 'laptop', 'mobile phone', 'television', 'screen', 'mobile device', 'telephone' ];
        const socialInteractionLabels = ['person', 'people', 'man', 'woman', 'child', 'face', 'hair', 'eyebrow', 'beard', 'jaw', 'neck', 'facial hair', 'moustache', 'forehead', 'smile', 'cheek', 'hair'];

        let screenTimeCount = 0;
        let socialInteractionCount = 0;

        labels.forEach(label => {
            if (screenTimeLabels.includes(label.description)) {
                screenTimeCount++;
            }
            if (socialInteractionLabels.includes(label.description)) {
                socialInteractionCount++;
            }
        });

        // MODIFIED: Add counts to the labels array, or you can handle these separately
        labels.push({ screenTimeCount, socialInteractionCount });
        
        return labels;
      } catch (error) {
        console.error('Failed to analyze image:', error);
        throw error;
      }

      // CATCH SCREENTIME AND SOCIAL INTERACTIONS BEFORE MAKING THE RECOMMENDATIONS 
      // ADD VARIABLE TO HAVE AN ESTIMATE OF HOW LONG WAS THE SCREENTIME AND HOW MUCH SOCIAL INTERACTION AND MATCH THOSE TO THE RECOMMENDATIONS 
}

// Get the wellness Recommendation (SPECIALIZE FOR SCREEN-TIME AND SOCIAL INTERACTIONS AND MAYBE TIME OUTSIDE)
async function getWellnessRecommendation(labels) {

    // Extract the special counts if they exist
    const screenTimeData = labels.find(label => label.screenTimeCount);
    const socialInteractionData = labels.find(label => label.socialInteractionCount);

    // Determine if the screen time or social interactions are above some threshold
    // Here, we're just using arbitrary thresholds for the example
    const screenTimeThreshold = 3; //CHANGE THRESHOLD 
    const socialInteractionThreshold = 3; //CHANGE THRESHOLD 

    let recommendationPrompt = "Generate a general wellness recommendation based on the following labels: ";
    if (screenTimeData && screenTimeData.screenTimeCount > screenTimeThreshold) {
        recommendationPrompt = "Generate a wellness recommendation for someone who might be spending too much time on screens.";
    } else if (socialInteractionData && socialInteractionData.socialInteractionCount > socialInteractionThreshold) {
        recommendationPrompt = "Generate a wellness recommendation for someone who might need more social interaction.";
    } else {
        recommendationPrompt += labels.map(label => label.description).join(', ');
    }

    // IF SCREEN TIME > THRESHOLD, SEND A RECOMMENDATION. MAKE RECOMMENDATION ON HOW LONG SOCIAL INTERACTIONS WERE (NOT PERSON DEPENDENT PROBABLY)
    try{const response = await openai.Completion.create({
        model: "text-davinci-004", // Use the most suitable model
        prompt: `Generate a wellness recommendation based on these image labels: ${labels.join(', ')}`,
        max_tokens: 150,
    });

    console.log(response.data);
    } catch(error) {
        console.error('An error occured:', error);
    }

}

// Store recommendation in Firestore
async function storeRecommendationInFirestore(filePath, recommendation) {
    try {
        const docId = filePath.replace(/\..+$/, '').replace(/\//g, '_');
        await admin.firestore().collection('recommendations').doc(docId).set({
            filePath,
            recommendation,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });
        console.log('Recommendation stored successfully.');
    } catch (error) {
        console.error('Error storing recommendation:', error);
    }
}

// async function sendNotification(token, recommendation){
//     const message = {
//         notification: {
//             title: 'Recommendation',
//             body: recommendation,
//         },
//         token: token,
//     };

//     try {
//         const response = await admin.messaging().send(message);
//         console.log('Successfully sent message:', response);
//     } catch (error){
//         console.error('Error sending message:', error);
//     }
// }

// async function getTokenForUser(userUid) {
//     const tokenDocRef = doc(admin.firestore(), 'users', userUid);
//     const docSnapshot = await getDoc(tokenDocRef);
  
//     if (docSnapshot.exists()) {
//       return docSnapshot.data().token;
//     } else {
//       console.error('No token found for user:', userUid);
//       return null; // Handle case where token is not found
//     }
//   }
