import React, { useState, useEffect } from 'react';
import { useAuth } from '@contexts/AuthContext';
import { updateProfile } from 'firebase/auth';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  FormControlLabel,
  Switch,
  IconButton,
  Fab,
  LinearProgress,
  Alert,
  Stack,
  Autocomplete,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  Paper,
  Container
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  PhotoCamera as PhotoCameraIcon,
  Favorite as FavoriteIcon,
  Person as PersonIcon,
  LocationOn as LocationOnIcon,
  Cake as CakeIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  getUserProfile,
  saveUserProfile,
  getUserPreferences,
  saveUserPreferences,
  DatingProfile,
  ProfilePreferences
} from '@pages/ProfilePage/firebaseIntegration/addToFirestore';

// Custom cyberpunk theme
const cyberpunkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ffff',
      dark: '#00cccc',
      light: '#66ffff',
    },
    secondary: {
      main: '#ff0080',
      dark: '#cc0066',
      light: '#ff4da6',
    },
    background: {
      default: '#050714',
      paper: '#0a0b1a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: '"Orbitron", "Roboto", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      color: '#00ffff',
      textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
    },
    h5: {
      fontWeight: 600,
      color: '#ff0080',
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(10, 11, 26, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 255, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 255, 255, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 20px rgba(0, 255, 255, 0.3)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(0, 255, 255, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 255, 255, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00ffff',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 0, 128, 0.2)',
          border: '1px solid rgba(255, 0, 128, 0.5)',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: 'rgba(255, 0, 128, 0.3)',
          },
        },
      },
    },
  },
});

export function DatingProfileScreenMUI() {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Profile state
  const [profile, setProfile] = useState<Partial<DatingProfile>>({
    displayName: '',
    age: 18,
    bio: '',
    location: '',
    interests: [],
    lookingFor: 'dating',
    genderIdentity: '',
    genderPreference: [],
    photos: [],
    verified: false
  });

  // Preferences state
  const [preferences, setPreferences] = useState<ProfilePreferences>({
    ageRange: { min: 18, max: 99 },
    maxDistance: 50,
    genderPreference: [],
    lookingFor: ['dating']
  });

  const [newInterest, setNewInterest] = useState('');

  // Options
  const interestSuggestions = [
    'Gaming', 'Music', 'Movies', 'Travel', 'Cooking', 'Fitness', 'Reading',
    'Art', 'Photography', 'Dancing', 'Hiking', 'Sports', 'Tech', 'Fashion',
    'Food', 'Anime', 'Pets', 'Nature', 'Science', 'History', 'Politics',
    'Business', 'Cryptocurrency', 'AI', 'Programming', 'Design', 'Writing'
  ];

  const genderOptions = [
    'Man', 'Woman', 'Non-binary', 'Genderfluid', 'Agender', 'Other', 'Prefer not to say'
  ];

  const lookingForOptions = [
    { value: 'friendship', label: 'Friendship' },
    { value: 'casual', label: 'Something casual' },
    { value: 'dating', label: 'Dating' },
    { value: 'serious', label: 'Long-term relationship' }
  ];

  useEffect(() => {
    if (currentUser) {
      loadUserData();
    }
  }, [currentUser]);

  const loadUserData = async () => {
    if (!currentUser) return;
    
    try {
      setLoading(true);
      
      // Load profile
      const userProfile = await getUserProfile(currentUser.uid);
      if (userProfile) {
        setProfile(userProfile);
      } else {
        // Initialize with basic info
        setProfile(prev => ({
          ...prev,
          uid: currentUser.uid,
          displayName: currentUser.displayName || '',
        }));
      }
      
      // Load preferences
      const userPrefs = await getUserPreferences(currentUser.uid);
      if (userPrefs) {
        setPreferences(userPrefs);
      }
    } catch (error: any) {
      setError('Failed to load profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      setError('');
      
      // Save profile to Firestore
      await saveUserProfile({
        ...profile,
        uid: currentUser.uid
      });
      
      // Save preferences
      await saveUserPreferences(currentUser.uid, preferences);
      
      // Update Firebase Auth profile
      if (profile.displayName !== currentUser.displayName) {
        await updateProfile(currentUser, {
          displayName: profile.displayName
        });
      }
      
      setMessage('Dating profile updated successfully!');
      setIsEditing(false);
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      setError('Failed to update profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const addInterest = (interest: string) => {
    if (interest && !profile.interests?.includes(interest) && profile.interests!.length < 10) {
      setProfile(prev => ({
        ...prev,
        interests: [...(prev.interests || []), interest]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests?.filter(i => i !== interest) || []
    }));
  };

  const toggleGenderPreference = (gender: string) => {
    setPreferences(prev => ({
      ...prev,
      genderPreference: prev.genderPreference.includes(gender)
        ? prev.genderPreference.filter(g => g !== gender)
        : [...prev.genderPreference, gender]
    }));
  };

  const calculateProfileCompletion = () => {
    const fields = [
      profile.displayName,
      profile.age,
      profile.bio,
      profile.location,
      profile.genderIdentity,
      profile.interests && profile.interests.length > 0
    ];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  };

  if (!currentUser) return null;

  return (
    <ThemeProvider theme={cyberpunkTheme}>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Box sx={{ mb: 4 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Box display="flex" alignItems="center" gap={2}>
              <FavoriteIcon sx={{ color: 'secondary.main', fontSize: 32 }} />
              <Typography variant="h4">
                DATING PROFILE
              </Typography>
            </Box>
            
            <Button
              variant="contained"
              color={isEditing ? "primary" : "secondary"}
              startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
              onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
              disabled={loading}
              size="large"
            >
              {isEditing ? 'Save Profile' : 'Edit Profile'}
            </Button>
          </Box>
          
          <Typography variant="body1" color="text.secondary">
            Create your perfect dating profile to connect with like-minded people
          </Typography>
        </Box>

        {/* Messages */}
        {message && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {message}
          </Alert>
        )}
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box display="flex" flexDirection={{ xs: 'column', lg: 'row' }} gap={4}>
          {/* Left Column - Basic Information */}
          <Box flex={1}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom display="flex" alignItems="center" gap={1}>
                  <PersonIcon />
                  Profile Information
                </Typography>

                {/* Profile Picture */}
                <Box display="flex" alignItems="center" gap={3} mb={4}>
                  <Box position="relative">
                    <Avatar
                      src={currentUser.photoURL || undefined}
                      sx={{ 
                        width: 100, 
                        height: 100,
                        background: 'linear-gradient(45deg, #00ffff, #ff0080)',
                        fontSize: 40
                      }}
                    >
                      {!currentUser.photoURL && <PersonIcon fontSize="large" />}
                    </Avatar>
                    {isEditing && (
                      <Fab
                        size="small"
                        color="secondary"
                        sx={{ position: 'absolute', bottom: -8, right: -8 }}
                      >
                        <PhotoCameraIcon />
                      </Fab>
                    )}
                  </Box>
                  
                  <Box flexGrow={1}>
                    {isEditing ? (
                      <TextField
                        fullWidth
                        label="Display Name"
                        value={profile.displayName}
                        onChange={(e) => setProfile(prev => ({ ...prev, displayName: e.target.value }))}
                        variant="outlined"
                      />
                    ) : (
                      <Typography variant="h6">
                        {profile.displayName || 'Your Name'}
                      </Typography>
                    )}
                  </Box>
                </Box>

                {/* Basic Details */}
                <Stack spacing={3}>
                  <Box display="flex" gap={2}>
                    <Box flex={1}>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <CakeIcon color="primary" />
                        <Typography variant="subtitle2">Age</Typography>
                      </Box>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          type="number"
                          inputProps={{ min: 18, max: 99 }}
                          value={profile.age}
                          onChange={(e) => setProfile(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                        />
                      ) : (
                        <Typography>{profile.age}</Typography>
                      )}
                    </Box>

                    <Box flex={1}>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <LocationOnIcon color="primary" />
                        <Typography variant="subtitle2">Location</Typography>
                      </Box>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          placeholder="Your city"
                          value={profile.location}
                          onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                        />
                      ) : (
                        <Typography>{profile.location || 'Not specified'}</Typography>
                      )}
                    </Box>
                  </Box>

                  <FormControl fullWidth>
                    <InputLabel>Gender Identity</InputLabel>
                    <Select
                      value={profile.genderIdentity || ''}
                      onChange={(e) => setProfile(prev => ({ ...prev, genderIdentity: e.target.value }))}
                      disabled={!isEditing}
                      label="Gender Identity"
                    >
                      {genderOptions.map(gender => (
                        <MenuItem key={gender} value={gender}>{gender}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>Looking For</InputLabel>
                    <Select
                      value={profile.lookingFor || ''}
                      onChange={(e) => setProfile(prev => ({ ...prev, lookingFor: e.target.value }))}
                      disabled={!isEditing}
                      label="Looking For"
                    >
                      {lookingForOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Box>
                    <Typography variant="subtitle2" gutterBottom>About Me</Typography>
                    {isEditing ? (
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Tell people about yourself..."
                        value={profile.bio}
                        onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                      />
                    ) : (
                      <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                        <Typography>
                          {profile.bio || 'No bio added yet.'}
                        </Typography>
                      </Paper>
                    )}
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Box>

          {/* Right Column - Interests & Preferences */}
          <Box flex={1}>
            <Stack spacing={3}>
              {/* Interests */}
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom color="secondary">
                    Interests
                  </Typography>
                  
                  {isEditing && (
                    <Box mb={3}>
                      <Autocomplete
                        freeSolo
                        options={interestSuggestions.filter(s => !profile.interests?.includes(s))}
                        value={newInterest}
                        onChange={(_, value) => {
                          if (value) addInterest(value);
                        }}
                        onInputChange={(_, value) => setNewInterest(value)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Add Interest"
                            placeholder="Type to search or add custom..."
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && newInterest) {
                                addInterest(newInterest);
                              }
                            }}
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <IconButton 
                                  onClick={() => addInterest(newInterest)}
                                  disabled={!newInterest || profile.interests!.length >= 10}
                                >
                                  <AddIcon />
                                </IconButton>
                              ),
                            }}
                          />
                        )}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Maximum 10 interests ({profile.interests?.length || 0}/10)
                      </Typography>
                    </Box>
                  )}

                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {profile.interests?.map(interest => (
                      <Chip
                        key={interest}
                        label={interest}
                        onDelete={isEditing ? () => removeInterest(interest) : undefined}
                        deleteIcon={<RemoveIcon />}
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>

              {/* Matching Preferences */}
              {isEditing && (
                <Card>
                  <CardContent>
                    <Typography variant="h5" gutterBottom color="primary">
                      Matching Preferences
                    </Typography>
                    
                    <Stack spacing={4}>
                      <Box>
                        <Typography gutterBottom>
                          Age Range: {preferences.ageRange.min} - {preferences.ageRange.max}
                        </Typography>
                        <Slider
                          value={[preferences.ageRange.min, preferences.ageRange.max]}
                          onChange={(_, newValue) => {
                            const [min, max] = newValue as number[];
                            setPreferences(prev => ({
                              ...prev,
                              ageRange: { min, max }
                            }));
                          }}
                          valueLabelDisplay="auto"
                          min={18}
                          max={99}
                          marks={[
                            { value: 18, label: '18' },
                            { value: 30, label: '30' },
                            { value: 50, label: '50' },
                            { value: 99, label: '99+' }
                          ]}
                        />
                      </Box>

                      <Box>
                        <Typography gutterBottom>
                          Maximum Distance: {preferences.maxDistance} km
                        </Typography>
                        <Slider
                          value={preferences.maxDistance}
                          onChange={(_, newValue) => {
                            setPreferences(prev => ({
                              ...prev,
                              maxDistance: newValue as number
                            }));
                          }}
                          valueLabelDisplay="auto"
                          min={5}
                          max={100}
                          marks={[
                            { value: 5, label: '5km' },
                            { value: 25, label: '25km' },
                            { value: 50, label: '50km' },
                            { value: 100, label: '100km' }
                          ]}
                        />
                      </Box>

                      <Box>
                        <Typography gutterBottom>Gender Preference</Typography>
                        <Box display="flex" flexWrap="wrap" gap={1}>
                          {genderOptions.map(gender => (
                            <ToggleButton
                              key={gender}
                              value={gender}
                              selected={preferences.genderPreference.includes(gender)}
                              onChange={() => toggleGenderPreference(gender)}
                              size="small"
                              sx={{
                                '&.Mui-selected': {
                                  bgcolor: 'primary.main',
                                  color: 'background.default',
                                  '&:hover': {
                                    bgcolor: 'primary.dark',
                                  },
                                },
                              }}
                            >
                              {gender}
                              {preferences.genderPreference.includes(gender) && (
                                <CheckIcon sx={{ ml: 0.5, fontSize: 16 }} />
                              )}
                            </ToggleButton>
                          ))}
                        </Box>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              )}

              {/* Profile Completion */}
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom color="secondary">
                    Profile Status
                  </Typography>
                  
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography>Profile Completion</Typography>
                    <Typography variant="h6" color="primary">
                      {calculateProfileCompletion()}%
                    </Typography>
                  </Box>
                  
                  <LinearProgress
                    variant="determinate"
                    value={calculateProfileCompletion()}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(45deg, #ff0080, #00ffff)',
                      },
                    }}
                  />
                  
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    Complete all sections to improve your match potential
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
