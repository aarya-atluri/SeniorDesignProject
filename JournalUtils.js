import { db } from './Firebase/firebaseConfig';
import { collection, query, where, getDocs, orderBy, limit, Timestamp, doc, getDoc } from 'firebase/firestore';

export const fetchJournalStreak = async (userId) => {
  try {
    let streakCount = 0;
    const today = new Date();
    
    // Query to get the earliest journal entry date
    const earliestEntryQuery = query(
      collection(db, 'users', userId, 'journal_entries'),
      orderBy('date', 'asc'),
      limit(1)
    );

    const earliestEntrySnapshot = await getDocs(earliestEntryQuery);
    if (!earliestEntrySnapshot.empty) {
      const earliestEntryDate = earliestEntrySnapshot.docs[0].data().date.toDate();

      let currentDate = new Date(earliestEntryDate);
      const endDateObj = new Date(today);

      while (currentDate <= endDateObj) {
        const start = Timestamp.fromDate(startOfDay(currentDate));
        const end = Timestamp.fromDate(endOfDay(currentDate));

        const q = query(
          collection(db, 'users', userId, 'journal_entries'),
          where('date', '>=', start),
          where('date', '<=', end)
        );

        const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) {
          streakCount++;
        } else {
          break;
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    return streakCount;
  } catch (error) {
    console.error('Error getting journal streak:', error);
    return 0;
  }
};

export const fetchJournalCount = async (userId) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

    const q = query(
      collection(db, 'users', userId, 'journal_entries'),
      where('date', '>=', Timestamp.fromDate(startOfDay)),
      where('date', '<=', Timestamp.fromDate(endOfDay))
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error('Error getting journal count for today:', error);
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
    const journalEntries = querySnapshot.docs.map(doc => doc.data());
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
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    const totals = {
      sleepHoursTotal: 0,
      sleepMinsTotal: 0,
      physicalActivityHoursTotal: 0,
      physicalActivityMinsTotal: 0,
      caffeineTotal: 0,
      waterIntakeTotal: 0
    };

    const totalQuery = query(
      collection(db, 'users', userId, 'journal_entries'), 
      where('date', '>=', Timestamp.fromDate(startOfDay))
    );
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

    totals.physicalActivityHoursTotal += Math.floor(totals.physicalActivityMinsTotal / 60);
    totals.physicalActivityMinsTotal = totals.physicalActivityMinsTotal % 60;
    totals.sleepHoursTotal += Math.floor(totals.sleepMinsTotal / 60);
    totals.sleepMinsTotal = totals.sleepMinsTotal % 60;

    return totals;
  } catch (error) {
    console.error('Error fetching today\'s totals:', error);
    return {};
  }
};

export const fetchPieChartData = async (userId) => {
  try {
    const totalQuery = query(
      collection(db, 'users', userId, 'journal_entries')
    );
    const querySnapshot = await getDocs(totalQuery);

    const moodCounts = {
      goodSleepExcited: 0,
      goodSleepHappy: 0,
      goodSleepMeh: 0,
      goodSleepSad: 0,
      goodSleepDead: 0,
      badSleepExcited: 0,
      badSleepHappy: 0,
      badSleepMeh: 0,
      badSleepSad: 0,
      badSleepDead: 0,
      goodExerciseExcited: 0,
      goodExerciseHappy: 0,
      goodExerciseMeh: 0,
      goodExerciseSad: 0,
      goodExerciseDead: 0,
      badExerciseExcited: 0,
      badExerciseHappy: 0,
      badExerciseMeh: 0,
      badExerciseSad: 0,
      badExerciseDead: 0
    }

    querySnapshot.forEach(doc => {
      const data = doc.data();
      console.log('Data from document:', data);
      if(data.sleep_hours >= 7) {
        switch (data.mood) {
          case 'excited':
            moodCounts.goodSleepExcited += 1;
            break;
          case 'happy':
            moodCounts.goodSleepHappy += 1;
            break;
          case 'meh':
            moodCounts.goodSleepMeh += 1;
            break;
          case 'sad':
            moodCounts.goodSleepSad += 1;
            break;
          case 'dead':
            moodCounts.goodSleepDead += 1;
            break;
        }
      } else {
        switch (data.mood) {
          case 'excited':
            moodCounts.badSleepExcited += 1;
            break;
          case 'happy':
            moodCounts.badSleepHappy += 1;
            break;
          case 'meh':
            moodCounts.badSleepMeh += 1;
            break;
          case 'sad':
            moodCounts.badSleepSad += 1;
            break;
          case 'dead':
            moodCounts.badSleepDead += 1;
            break;
        }
      }
 
      if(data.activity_hours >= 1 || data.activity_mins >= 30) {
        switch (data.mood) {
          case 'excited':
            moodCounts.goodExerciseExcited += 1;
            break;
          case 'happy':
            moodCounts.goodExerciseHappy += 1;
            break;
          case 'meh':
            moodCounts.goodExerciseMeh += 1;
            break;
          case 'sad':
            moodCounts.goodExerciseSad += 1;
            break;
          case 'dead':
            moodCounts.goodExerciseDead += 1;
            break;
        }
      } else {
        switch (data.mood) {
          case 'excited':
            moodCounts.badExerciseExcited += 1;
            break;
          case 'happy':
            moodCounts.badExerciseHappy += 1;
            break;
          case 'meh':
            moodCounts.badExerciseMeh += 1;
            break;
          case 'sad':
            moodCounts.badExerciseSad += 1;
            break;
          case 'dead':
            moodCounts.badExerciseDead += 1;
            break;
        }
      }
    });
    console.log(moodCounts)
    return moodCounts;

  } catch (error) {
    console.error('Error fetching pie chart data:', error);
    return {};
  }
};