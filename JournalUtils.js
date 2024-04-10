import { db } from './Firebase/firebaseConfig';
import { collection, query, where, getDocs , orderBy, limit, Timestamp} from 'firebase/firestore';

export const fetchJournalCount = async (userId, date) => {
    try {
        const q = query(
            collection(db, 'users', userId, 'journal_entries'),
            where('date', '==', date)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.size;
    } catch (error) {
        console.error('Error getting journal count:', error);
        return 0;
    }
};


export const fetchLastMood = async (userId) => {
try {
    const q = query(
    collection(db, 'users', userId, 'journal_entries'),
    orderBy('date', 'desc'),
    limit(1)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return doc.data().mood;
    }
} catch (error) {
    console.error('Error getting last mood:', error);
    return '';
}
};

export const fetchJournalEntries = async (userId) => {
    try {
      const q = query(
        collection(db, 'users', userId, 'journal_entries')
      );
      const querySnapshot = await getDocs(q);
      const journalEntries = [];
      querySnapshot.forEach(doc => {
        journalEntries.push(doc.data());
      });
      return journalEntries;
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      return [];
    }
};

export const getButtonColorFromMood = (mood) => {
    switch (mood) {
      case 'excited':
        return '#E5EAD7'; // Green
      case 'happy':
        return '#FFEBC2'; // Yellow
      case 'meh':
        return '#E8DDD9'; // Brown
      case 'sad':
        return '#F7CFAB'; // Orange
      case 'dead':
        return '#DAD4FF'; // Purple
      default:
        return '#fff'; // Default white color
    }
};

export const fetchTodayTotal = async (userId) => {
  try {
      const today = new Date();
      const totals = {
          sleepHoursTotal: 0,
          sleepMinsTotal: 0,
          physicalActivityHoursTotal: 0,
          physicalActivityMinsTotal: 0,
          caffeineTotal: 0,
          waterIntakeTotal: 0
      };

      const totalQuery = query(collection(db, 'users', userId, 'journal_entries'), where('date', '>=', Timestamp.fromDate(today)));
      const querySnapshot = await getDocs(totalQuery);

      querySnapshot.forEach(doc => {

          const data = doc.data();
          totals.sleepHoursTotal += data.sleep_hours || 0;
          totals.sleepMinsTotal += data.sleep_mins || 0;
          totals.physicalActivityHoursTotal += data.activity_hours || 0;
          totals.physicalActivityMinsTotal += data.activity_mins || 0;
          totals.caffeineTotal += data.caffeine || 0;
          totals.waterIntakeTotal += data.water || 0;
      });

      totals.physicalActivityHoursTotal += Math.floor(totals.physicalActivityMinsTotal / 60); // Add extra hours from minutes
      totals.physicalActivityMinsTotal = totals.physicalActivityMinsTotal % 60; // Calculate remaining minutes

      return totals;
  } catch (error) {
      console.error('Error fetching today\'s totals:', error);
      return {};
  }
};
