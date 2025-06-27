# Firebase Profile Data Structure

This document outlines the data structure for user profiles in Firebase Firestore based on the DatingProfileScreen component.

## Collections Structure

### 1. `users` Collection
Document ID: `{userId}` (Firebase Auth UID)

```json
{
  "uid": "string",
  "displayName": "string",
  "age": "number",
  "bio": "string",
  "location": "string",
  "interests": ["string"],
  "lookingFor": "string",
  "genderIdentity": "string", 
  "genderPreference": ["string"],
  "photos": ["string"],
  "verified": "boolean",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### 2. `userPreferences` Collection
Document ID: `{userId}` (Firebase Auth UID)

```json
{
  "uid": "string",
  "ageRange": {
    "min": "number",
    "max": "number"
  },
  "maxDistance": "number",
  "genderPreference": ["string"],
  "lookingFor": ["string"],
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

## Field Descriptions

### User Profile Fields

| Field | Type | Required | Description | Example Values |
|-------|------|----------|-------------|----------------|
| `uid` | string | Yes | Firebase Auth user ID | "abc123def456" |
| `displayName` | string | Yes | User's display name | "Alex Smith" |
| `age` | number | Yes | User's age (18-99) | 25 |
| `bio` | string | No | User's bio/description | "Love hiking and tech!" |
| `location` | string | No | User's city/location | "San Francisco, CA" |
| `interests` | array | No | Array of interests (max 10) | ["Gaming", "Music", "Travel"] |
| `lookingFor` | string | Yes | What user is seeking | "dating", "friendship", "casual", "serious" |
| `genderIdentity` | string | No | User's gender identity | "Man", "Woman", "Non-binary", etc. |
| `genderPreference` | array | No | Preferred genders | ["Man", "Woman"] |
| `photos` | array | No | Array of photo URLs | ["https://..."] |
| `verified` | boolean | No | Account verification status | true/false |
| `createdAt` | timestamp | Yes | Profile creation time | Firestore timestamp |
| `updatedAt` | timestamp | Yes | Last update time | Firestore timestamp |

### User Preferences Fields

| Field | Type | Required | Description | Example Values |
|-------|------|----------|-------------|----------------|
| `uid` | string | Yes | Firebase Auth user ID | "abc123def456" |
| `ageRange` | object | Yes | Preferred age range | {"min": 21, "max": 35} |
| `maxDistance` | number | Yes | Max distance in km (5-100) | 25 |
| `genderPreference` | array | No | Preferred genders for matching | ["Woman", "Non-binary"] |
| `lookingFor` | array | No | What user wants in matches | ["dating", "serious"] |
| `createdAt` | timestamp | Yes | Preferences creation time | Firestore timestamp |
| `updatedAt` | timestamp | Yes | Last update time | Firestore timestamp |

## Enum Values

### Gender Options
```typescript
const genderOptions = [
  'Man', 
  'Woman', 
  'Non-binary', 
  'Genderfluid', 
  'Agender', 
  'Other', 
  'Prefer not to say'
];
```

### Looking For Options
```typescript
const lookingForOptions = [
  'friendship',   // Friendship
  'casual',       // Something casual  
  'dating',       // Dating
  'serious'       // Long-term relationship
];
```

### Interest Suggestions
```typescript
const interestSuggestions = [
  'Gaming', 'Music', 'Movies', 'Travel', 'Cooking', 'Fitness', 'Reading',
  'Art', 'Photography', 'Dancing', 'Hiking', 'Sports', 'Tech', 'Fashion',
  'Food', 'Anime', 'Pets', 'Nature', 'Science', 'History', 'Politics',
  'Business', 'Cryptocurrency', 'AI', 'Programming', 'Design', 'Writing'
];
```

## Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can only read/write their own preferences
    match /userPreferences/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Optional: Allow users to read other profiles for matching
    match /users/{userId} {
      allow read: if request.auth != null;
    }
  }
}
```

## Firebase Functions Implementation

### Save User Profile
```typescript
export const saveUserProfile = async (profile: DatingProfile): Promise<void> => {
  const db = getFirestore();
  const userDoc = doc(db, 'users', profile.uid!);
  
  await setDoc(userDoc, {
    ...profile,
    updatedAt: serverTimestamp()
  }, { merge: true });
};
```

### Get User Profile
```typescript
export const getUserProfile = async (uid: string): Promise<DatingProfile | null> => {
  const db = getFirestore();
  const userDoc = doc(db, 'users', uid);
  const docSnap = await getDoc(userDoc);
  
  if (docSnap.exists()) {
    return docSnap.data() as DatingProfile;
  }
  return null;
};
```

### Save User Preferences
```typescript
export const saveUserPreferences = async (uid: string, preferences: ProfilePreferences): Promise<void> => {
  const db = getFirestore();
  const prefsDoc = doc(db, 'userPreferences', uid);
  
  await setDoc(prefsDoc, {
    uid,
    ...preferences,
    updatedAt: serverTimestamp()
  }, { merge: true });
};
```

### Get User Preferences
```typescript
export const getUserPreferences = async (uid: string): Promise<ProfilePreferences | null> => {
  const db = getFirestore();
  const prefsDoc = doc(db, 'userPreferences', uid);
  const docSnap = await getDoc(prefsDoc);
  
  if (docSnap.exists()) {
    return docSnap.data() as ProfilePreferences;
  }
  return null;
};
```

## Example Data

### Sample User Profile Document
```json
{
  "uid": "user123abc",
  "displayName": "Alex Chen",
  "age": 28,
  "bio": "Software engineer who loves hiking, cooking, and exploring new tech. Always up for an adventure!",
  "location": "San Francisco, CA",
  "interests": ["Tech", "Hiking", "Cooking", "Photography", "Travel"],
  "lookingFor": "dating",
  "genderIdentity": "Non-binary",
  "genderPreference": ["Woman", "Non-binary"],
  "photos": [
    "https://firebasestorage.googleapis.com/...",
    "https://firebasestorage.googleapis.com/..."
  ],
  "verified": false,
  "createdAt": "2025-06-27T18:30:00Z",
  "updatedAt": "2025-06-27T18:45:00Z"
}
```

### Sample User Preferences Document
```json
{
  "uid": "user123abc",
  "ageRange": {
    "min": 24,
    "max": 35
  },
  "maxDistance": 30,
  "genderPreference": ["Woman", "Non-binary"],
  "lookingFor": ["dating", "serious"],
  "createdAt": "2025-06-27T18:30:00Z",
  "updatedAt": "2025-06-27T18:45:00Z"
}
```

## Validation Rules

1. **Age**: Must be between 18-99
2. **Interests**: Maximum 10 interests per user
3. **Photos**: Maximum 6 photos per user
4. **Bio**: Maximum 500 characters
5. **Display Name**: Required, 2-50 characters
6. **Distance**: 5-100 km range
7. **Age Range**: Min must be ≤ Max, both within 18-99

## Indexes Required

Create these composite indexes in Firestore:

1. **users collection**:
   - `age` ascending, `location` ascending
   - `genderIdentity` ascending, `lookingFor` ascending
   - `interests` array-contains, `location` ascending

2. **userPreferences collection**:
   - `uid` ascending (automatically created)
