import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  serverTimestamp,
  Timestamp,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

// Type definitions matching the DatingProfileScreen component
export interface DatingProfile {
  uid?: string;
  displayName?: string;
  age?: number;
  bio?: string;
  location?: string;
  interests?: string[];
  lookingFor?: string;
  genderIdentity?: string;
  genderPreference?: string[];
  photos?: string[];
  verified?: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface ProfilePreferences {
  uid?: string;
  ageRange: { min: number; max: number };
  maxDistance: number;
  genderPreference: string[];
  lookingFor: string[];
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// Validation constants
const VALID_GENDER_OPTIONS = [
  'Man', 'Woman', 'Non-binary', 'Genderfluid', 'Agender', 'Other', 'Prefer not to say'
];

const VALID_LOOKING_FOR_OPTIONS = ['friendship', 'casual', 'dating', 'serious'];

const VALID_INTERESTS = [
  'Gaming', 'Music', 'Movies', 'Travel', 'Cooking', 'Fitness', 'Reading',
  'Art', 'Photography', 'Dancing', 'Hiking', 'Sports', 'Tech', 'Fashion',
  'Food', 'Anime', 'Pets', 'Nature', 'Science', 'History', 'Politics',
  'Business', 'Cryptocurrency', 'AI', 'Programming', 'Design', 'Writing'
];

/**
 * Validates a user profile before saving to Firestore
 */
function validateProfile(profile: DatingProfile): string[] {
  const errors: string[] = [];

  // Required fields
  if (!profile.uid) errors.push('User ID is required');
  if (!profile.displayName || profile.displayName.trim().length < 2) {
    errors.push('Display name must be at least 2 characters');
  }
  if (profile.displayName && profile.displayName.length > 50) {
    errors.push('Display name must be less than 50 characters');
  }

  // Age validation
  if (!profile.age || profile.age < 18 || profile.age > 99) {
    errors.push('Age must be between 18 and 99');
  }

  // Bio length
  if (profile.bio && profile.bio.length > 500) {
    errors.push('Bio must be less than 500 characters');
  }

  // Interests validation
  if (profile.interests && profile.interests.length > 10) {
    errors.push('Maximum 10 interests allowed');
  }
  if (profile.interests) {
    const invalidInterests = profile.interests.filter(
      interest => !VALID_INTERESTS.includes(interest)
    );
    if (invalidInterests.length > 0) {
      errors.push(`Invalid interests: ${invalidInterests.join(', ')}`);
    }
  }

  // Gender validation
  if (profile.genderIdentity && !VALID_GENDER_OPTIONS.includes(profile.genderIdentity)) {
    errors.push('Invalid gender identity');
  }
  if (profile.genderPreference) {
    const invalidGenders = profile.genderPreference.filter(
      gender => !VALID_GENDER_OPTIONS.includes(gender)
    );
    if (invalidGenders.length > 0) {
      errors.push(`Invalid gender preferences: ${invalidGenders.join(', ')}`);
    }
  }

  // Looking for validation
  if (profile.lookingFor && !VALID_LOOKING_FOR_OPTIONS.includes(profile.lookingFor)) {
    errors.push('Invalid looking for option');
  }

  // Photos validation
  if (profile.photos && profile.photos.length > 6) {
    errors.push('Maximum 6 photos allowed');
  }

  return errors;
}

/**
 * Validates user preferences before saving to Firestore
 */
function validatePreferences(preferences: ProfilePreferences): string[] {
  const errors: string[] = [];

  // Age range validation
  if (preferences.ageRange.min < 18 || preferences.ageRange.min > 99) {
    errors.push('Minimum age must be between 18 and 99');
  }
  if (preferences.ageRange.max < 18 || preferences.ageRange.max > 99) {
    errors.push('Maximum age must be between 18 and 99');
  }
  if (preferences.ageRange.min > preferences.ageRange.max) {
    errors.push('Minimum age cannot be greater than maximum age');
  }

  // Distance validation
  if (preferences.maxDistance < 5 || preferences.maxDistance > 100) {
    errors.push('Maximum distance must be between 5 and 100 km');
  }

  // Gender preference validation
  if (preferences.genderPreference) {
    const invalidGenders = preferences.genderPreference.filter(
      gender => !VALID_GENDER_OPTIONS.includes(gender)
    );
    if (invalidGenders.length > 0) {
      errors.push(`Invalid gender preferences: ${invalidGenders.join(', ')}`);
    }
  }

  // Looking for validation
  if (preferences.lookingFor) {
    const invalidOptions = preferences.lookingFor.filter(
      option => !VALID_LOOKING_FOR_OPTIONS.includes(option)
    );
    if (invalidOptions.length > 0) {
      errors.push(`Invalid looking for options: ${invalidOptions.join(', ')}`);
    }
  }

  return errors;
}

/**
 * Creates a new user profile in Firestore
 */
export async function createUserProfile(profile: DatingProfile): Promise<void> {
  const errors = validateProfile(profile);
  if (errors.length > 0) {
    throw new Error(`Validation errors: ${errors.join(', ')}`);
  }

  const db = getFirestore();
  const userDoc = doc(db, 'users', profile.uid!);

  // Check if profile already exists
  const existingDoc = await getDoc(userDoc);
  if (existingDoc.exists()) {
    throw new Error('Profile already exists for this user');
  }

  const profileData = {
    ...profile,
    verified: profile.verified || false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  await setDoc(userDoc, profileData);
}

/**
 * Updates an existing user profile in Firestore
 */
export async function updateUserProfile(profile: DatingProfile): Promise<void> {
  const errors = validateProfile(profile);
  if (errors.length > 0) {
    throw new Error(`Validation errors: ${errors.join(', ')}`);
  }

  const db = getFirestore();
  const userDoc = doc(db, 'users', profile.uid!);

  // Check if profile exists
  const existingDoc = await getDoc(userDoc);
  if (!existingDoc.exists()) {
    throw new Error('Profile does not exist for this user');
  }

  const profileData = {
    ...profile,
    updatedAt: serverTimestamp()
  };

  await updateDoc(userDoc, profileData);
}

/**
 * Saves user profile (creates if new, updates if exists)
 */
export async function saveUserProfile(profile: DatingProfile): Promise<void> {
  const errors = validateProfile(profile);
  if (errors.length > 0) {
    throw new Error(`Validation errors: ${errors.join(', ')}`);
  }

  const db = getFirestore();
  const userDoc = doc(db, 'users', profile.uid!);

  const profileData = {
    ...profile,
    verified: profile.verified || false,
    updatedAt: serverTimestamp()
  };

  // Use merge: true to create or update
  await setDoc(userDoc, profileData, { merge: true });
}

/**
 * Retrieves a user profile from Firestore
 */
export async function getUserProfile(uid: string): Promise<DatingProfile | null> {
  const db = getFirestore();
  const userDoc = doc(db, 'users', uid);
  const docSnap = await getDoc(userDoc);

  if (docSnap.exists()) {
    return docSnap.data() as DatingProfile;
  }
  return null;
}

/**
 * Deletes a user profile from Firestore
 */
export async function deleteUserProfile(uid: string): Promise<void> {
  const db = getFirestore();
  const userDoc = doc(db, 'users', uid);
  await deleteDoc(userDoc);
}

/**
 * Creates user preferences in Firestore
 */
export async function createUserPreferences(uid: string, preferences: ProfilePreferences): Promise<void> {
  const errors = validatePreferences(preferences);
  if (errors.length > 0) {
    throw new Error(`Validation errors: ${errors.join(', ')}`);
  }

  const db = getFirestore();
  const prefsDoc = doc(db, 'userPreferences', uid);

  // Check if preferences already exist
  const existingDoc = await getDoc(prefsDoc);
  if (existingDoc.exists()) {
    throw new Error('Preferences already exist for this user');
  }

  const preferencesData = {
    uid,
    ...preferences,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  await setDoc(prefsDoc, preferencesData);
}

/**
 * Updates user preferences in Firestore
 */
export async function updateUserPreferences(uid: string, preferences: ProfilePreferences): Promise<void> {
  const errors = validatePreferences(preferences);
  if (errors.length > 0) {
    throw new Error(`Validation errors: ${errors.join(', ')}`);
  }

  const db = getFirestore();
  const prefsDoc = doc(db, 'userPreferences', uid);

  // Check if preferences exist
  const existingDoc = await getDoc(prefsDoc);
  if (!existingDoc.exists()) {
    throw new Error('Preferences do not exist for this user');
  }

  const preferencesData = {
    uid,
    ...preferences,
    updatedAt: serverTimestamp()
  };

  await updateDoc(prefsDoc, preferencesData);
}

/**
 * Saves user preferences (creates if new, updates if exists)
 */
export async function saveUserPreferences(uid: string, preferences: ProfilePreferences): Promise<void> {
  const errors = validatePreferences(preferences);
  if (errors.length > 0) {
    throw new Error(`Validation errors: ${errors.join(', ')}`);
  }

  const db = getFirestore();
  const prefsDoc = doc(db, 'userPreferences', uid);

  const preferencesData = {
    uid,
    ...preferences,
    updatedAt: serverTimestamp()
  };

  // Use merge: true to create or update
  await setDoc(prefsDoc, preferencesData, { merge: true });
}

/**
 * Retrieves user preferences from Firestore
 */
export async function getUserPreferences(uid: string): Promise<ProfilePreferences | null> {
  const db = getFirestore();
  const prefsDoc = doc(db, 'userPreferences', uid);
  const docSnap = await getDoc(prefsDoc);

  if (docSnap.exists()) {
    return docSnap.data() as ProfilePreferences;
  }
  return null;
}

/**
 * Deletes user preferences from Firestore
 */
export async function deleteUserPreferences(uid: string): Promise<void> {
  const db = getFirestore();
  const prefsDoc = doc(db, 'userPreferences', uid);
  await deleteDoc(prefsDoc);
}

/**
 * Finds potential matches based on user preferences
 */
export async function findPotentialMatches(uid: string): Promise<DatingProfile[]> {
  const db = getFirestore();
  
  // Get current user's preferences
  const userPreferences = await getUserPreferences(uid);
  if (!userPreferences) {
    throw new Error('User preferences not found');
  }

  // Get current user's profile
  const userProfile = await getUserProfile(uid);
  if (!userProfile) {
    throw new Error('User profile not found');
  }

  // Build query based on preferences
  const usersRef = collection(db, 'users');
  let matchQuery = query(
    usersRef,
    where('age', '>=', userPreferences.ageRange.min),
    where('age', '<=', userPreferences.ageRange.max)
  );

  // Filter by gender preference if specified
  if (userPreferences.genderPreference.length > 0) {
    matchQuery = query(
      matchQuery,
      where('genderIdentity', 'in', userPreferences.genderPreference)
    );
  }

  const querySnapshot = await getDocs(matchQuery);
  const matches: DatingProfile[] = [];

  querySnapshot.forEach((doc) => {
    const profile = doc.data() as DatingProfile;
    // Exclude current user from matches
    if (profile.uid !== uid) {
      matches.push(profile);
    }
  });

  return matches;
}

/**
 * Gets all user profiles (for admin purposes)
 */
export async function getAllUserProfiles(): Promise<DatingProfile[]> {
  const db = getFirestore();
  const usersRef = collection(db, 'users');
  const querySnapshot = await getDocs(usersRef);
  
  const profiles: DatingProfile[] = [];
  querySnapshot.forEach((doc) => {
    profiles.push(doc.data() as DatingProfile);
  });
  
  return profiles;
}

/**
 * Marks a user profile as verified
 */
export async function verifyUserProfile(uid: string): Promise<void> {
  const db = getFirestore();
  const userDoc = doc(db, 'users', uid);
  
  await updateDoc(userDoc, {
    verified: true,
    updatedAt: serverTimestamp()
  });
}

/**
 * Batch operation to create a complete user profile with preferences
 */
export async function createCompleteUserProfile(
  profile: DatingProfile, 
  preferences: ProfilePreferences
): Promise<void> {
  // Validate both profile and preferences
  const profileErrors = validateProfile(profile);
  const preferencesErrors = validatePreferences(preferences);
  
  const allErrors = [...profileErrors, ...preferencesErrors];
  if (allErrors.length > 0) {
    throw new Error(`Validation errors: ${allErrors.join(', ')}`);
  }

  // Save both profile and preferences
  await Promise.all([
    saveUserProfile(profile),
    saveUserPreferences(profile.uid!, preferences)
  ]);
}

/**
 * Batch operation to delete all user data
 */
export async function deleteAllUserData(uid: string): Promise<void> {
  await Promise.all([
    deleteUserProfile(uid),
    deleteUserPreferences(uid)
  ]);
}
