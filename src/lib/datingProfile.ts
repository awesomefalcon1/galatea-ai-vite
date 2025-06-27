import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from './firebase';

export interface DatingProfile {
  uid: string;
  displayName: string;
  age: number;
  bio: string;
  location: string;
  interests: string[];
  lookingFor: 'friendship' | 'dating' | 'serious' | 'casual';
  genderIdentity: string;
  genderPreference: string[];
  photos: string[];
  verified: boolean;
  lastActive: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProfilePreferences {
  ageRange: { min: number; max: number };
  maxDistance: number;
  genderPreference: string[];
  lookingFor: string[];
}

// Get user's dating profile
export async function getUserProfile(uid: string): Promise<DatingProfile | null> {
  try {
    const docRef = doc(db, 'datingProfiles', uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
        lastActive: data.lastActive?.toDate(),
      } as DatingProfile;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

// Create or update user's dating profile
export async function saveUserProfile(profile: Partial<DatingProfile>): Promise<void> {
  try {
    if (!profile.uid) throw new Error('User ID is required');
    
    const docRef = doc(db, 'datingProfiles', profile.uid);
    const now = new Date();
    
    const profileData = {
      ...profile,
      updatedAt: now,
      lastActive: now,
      ...(!(await getDoc(docRef)).exists() && { createdAt: now })
    };
    
    await setDoc(docRef, profileData, { merge: true });
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw error;
  }
}

// Get user's preferences
export async function getUserPreferences(uid: string): Promise<ProfilePreferences | null> {
  try {
    const docRef = doc(db, 'userPreferences', uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as ProfilePreferences;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    throw error;
  }
}

// Save user's preferences
export async function saveUserPreferences(uid: string, preferences: ProfilePreferences): Promise<void> {
  try {
    const docRef = doc(db, 'userPreferences', uid);
    await setDoc(docRef, preferences, { merge: true });
  } catch (error) {
    console.error('Error saving user preferences:', error);
    throw error;
  }
}

// Update last active timestamp
export async function updateLastActive(uid: string): Promise<void> {
  try {
    const docRef = doc(db, 'datingProfiles', uid);
    await updateDoc(docRef, {
      lastActive: new Date()
    });
  } catch (error) {
    console.error('Error updating last active:', error);
    throw error;
  }
}

// Get potential matches based on preferences
export async function getPotentialMatches(
  uid: string, 
  preferences: ProfilePreferences, 
  userProfile: DatingProfile
): Promise<DatingProfile[]> {
  try {
    const profilesRef = collection(db, 'datingProfiles');
    
    // Build query based on preferences
    let q = query(
      profilesRef,
      where('uid', '!=', uid), // Exclude self
      where('age', '>=', preferences.ageRange.min),
      where('age', '<=', preferences.ageRange.max),
      orderBy('lastActive', 'desc'),
      limit(20)
    );
    
    // Add gender preference filter if specified
    if (preferences.genderPreference.length > 0) {
      q = query(q, where('genderIdentity', 'in', preferences.genderPreference));
    }
    
    const querySnapshot = await getDocs(q);
    const matches: DatingProfile[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      matches.push({
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
        lastActive: data.lastActive?.toDate(),
      } as DatingProfile);
    });
    
    return matches;
  } catch (error) {
    console.error('Error fetching potential matches:', error);
    throw error;
  }
}
