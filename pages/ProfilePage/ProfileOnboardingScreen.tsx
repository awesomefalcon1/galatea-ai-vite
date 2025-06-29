import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Stack,
  Autocomplete,
  Container,
  Paper,
  IconButton,
  Fab,
  LinearProgress,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Fade,
  Slide,
  SwipeableDrawer,
  useTheme,
  alpha
} from '@mui/material';
import {
  PhotoCamera as PhotoCameraIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  Favorite as FavoriteIcon,
  PersonAdd as PersonAddIcon,
  LocationOn as LocationOnIcon,
  Cake as CakeIcon,
  Done as DoneIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import {
  getUserProfile,
  saveUserProfile,
  DatingProfile,
  ProfilePreferences
} from '@/lib/datingProfile';

interface OnboardingStep {
  id: string;
  title: string;
  subtitle?: string;
  component: React.ReactNode;
}

const ProfileOnboardingScreen: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<Partial<DatingProfile>>({
    uid: currentUser?.uid || '',
    displayName: currentUser?.displayName || '',
    bio: '',
    age: 25,
    location: '',
    photos: currentUser?.photoURL ? [currentUser.photoURL] : [],
    interests: [],
    lookingFor: 'dating',
    genderIdentity: '',
    genderPreference: [],
    verified: false,
    lastActive: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  });
  
  const [preferences, setPreferences] = useState<Partial<ProfilePreferences>>({
    ageRange: { min: 22, max: 35 },
    maxDistance: 50,
    genderPreference: [],
    lookingFor: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');

  // Load existing profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (!currentUser) return;
      
      try {
        const existingProfile = await getUserProfile(currentUser.uid);
        if (existingProfile) {
          setProfile(prev => ({ ...prev, ...existingProfile }));
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    loadProfile();
  }, [currentUser]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setSlideDirection('left');
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setSlideDirection('right');
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleFinish = async () => {
    if (!currentUser) return;

    setIsLoading(true);
    setError(null);

    try {
      const profileWithUid = { ...profile, uid: currentUser.uid };
      await saveUserProfile(profileWithUid as DatingProfile);
      // Navigate to swipes page
      navigate('/swipes');
    } catch (error) {
      console.error('Error saving profile:', error);
      setError('Failed to save profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const interestOptions = [
    'Music', 'Movies', 'Travel', 'Food', 'Sports', 'Reading', 'Art', 'Gaming',
    'Photography', 'Dancing', 'Hiking', 'Yoga', 'Cooking', 'Technology',
    'Fashion', 'Fitness', 'Nature', 'Animals', 'Science', 'History'
  ];

  const relationshipGoalOptions = [
    'Long-term relationship',
    'Something casual',
    'New friends',
    'Not sure yet'
  ];

  // Basic Info Step
  const BasicInfoStep = () => (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Stack spacing={4} alignItems="center">
        <Box sx={{ position: 'relative' }}>
          <Avatar
            src={profile.photos?.[0]}
            sx={{ 
              width: 120, 
              height: 120,
              border: `4px solid ${theme.palette.primary.main}`,
              boxShadow: theme.shadows[8]
            }}
          >
            <PersonAddIcon sx={{ fontSize: 60 }} />
          </Avatar>
          <Fab
            size="small"
            color="primary"
            sx={{ position: 'absolute', bottom: 0, right: 0 }}
            onClick={() => {
              // TODO: Implement photo upload
              console.log('Upload photo');
            }}
          >
            <PhotoCameraIcon />
          </Fab>
        </Box>

        <TextField
          fullWidth
          label="Display Name"
          value={profile.displayName}
          onChange={(e) => setProfile(prev => ({ ...prev, displayName: e.target.value }))}
          variant="outlined"
          sx={{ maxWidth: 300 }}
        />

        <Stack direction="row" spacing={2} sx={{ width: '100%', maxWidth: 300 }}>
          <TextField
            label="Age"
            type="number"
            value={profile.age}
            onChange={(e) => setProfile(prev => ({ ...prev, age: parseInt(e.target.value) }))}
            inputProps={{ min: 18, max: 100 }}
            sx={{ flex: 1 }}
          />
          <TextField
            label="Location"
            value={profile.location}
            onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
            sx={{ flex: 2 }}
          />
        </Stack>
      </Stack>
    </Box>
  );

  // Bio Step
  const BioStep = () => (
    <Box sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Typography variant="body1" color="text.secondary" textAlign="center">
          Tell others about yourself! What makes you unique?
        </Typography>
        
        <TextField
          multiline
          rows={6}
          fullWidth
          label="About Me"
          placeholder="I love exploring new places, trying different cuisines, and having deep conversations about life..."
          value={profile.bio}
          onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
          variant="outlined"
          helperText={`${profile.bio?.length || 0}/500 characters`}
          inputProps={{ maxLength: 500 }}
        />

        <TextField
          fullWidth
          label="About your interests or hobbies"
          value={profile.bio}
          onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
          variant="outlined"
        />
      </Stack>
    </Box>
  );

  // Interests Step
  const InterestsStep = () => (
    <Box sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Typography variant="body1" color="text.secondary" textAlign="center">
          Select your interests (choose at least 3)
        </Typography>
        
        <Autocomplete
          multiple
          options={interestOptions}
          value={profile.interests || []}
          onChange={(_, newValue) => setProfile(prev => ({ ...prev, interests: newValue }))}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Interests"
              placeholder="Select your interests..."
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
                key={option}
                color="primary"
              />
            ))
          }
        />

        <FormControl fullWidth>
          <InputLabel>What are you looking for?</InputLabel>
          <Select
            value={profile.lookingFor}
            onChange={(e) => setProfile(prev => ({ ...prev, lookingFor: e.target.value as any }))}
            label="What are you looking for?"
          >
            {relationshipGoalOptions.map((goal) => (
              <MenuItem key={goal} value={goal}>
                {goal}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );

  // Preferences Step
  const PreferencesStep = () => (
    <Box sx={{ py: 4 }}>
      <Stack spacing={4}>
        <Typography variant="body1" color="text.secondary" textAlign="center">
          Set your preferences for finding matches
        </Typography>
        
        <Box>
          <Typography gutterBottom>Age Range</Typography>
          <Slider
            value={[preferences.ageRange?.min || 22, preferences.ageRange?.max || 35]}
            onChange={(_, newValue) => {
              const [min, max] = newValue as number[];
              setPreferences(prev => ({ ...prev, ageRange: { min, max } }));
            }}
            valueLabelDisplay="auto"
            min={18}
            max={65}
            marks={[
              { value: 18, label: '18' },
              { value: 30, label: '30' },
              { value: 50, label: '50' },
              { value: 65, label: '65+' }
            ]}
          />
        </Box>

        <Box>
          <Typography gutterBottom>Maximum Distance: {preferences.maxDistance} km</Typography>
          <Slider
            value={preferences.maxDistance || 50}
            onChange={(_, newValue) => setPreferences(prev => ({ ...prev, maxDistance: newValue as number }))}
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
      </Stack>
    </Box>
  );

  // Review Step
  const ReviewStep = () => (
    <Box sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Typography variant="body1" color="text.secondary" textAlign="center">
          Review your profile before we find your matches!
        </Typography>
        
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
          <Stack spacing={2} alignItems="center">
            <Avatar
              src={profile.photos?.[0]}
              sx={{ width: 80, height: 80 }}
            >
              <PersonAddIcon />
            </Avatar>
            
            <Typography variant="h6">{profile.displayName}, {profile.age}</Typography>
            <Typography variant="body2" color="text.secondary">{profile.location}</Typography>
            
            {profile.bio && (
              <Typography variant="body2" textAlign="center" sx={{ fontStyle: 'italic' }}>
                "{profile.bio}"
              </Typography>
            )}
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
              {profile.interests?.slice(0, 5).map((interest) => (
                <Chip key={interest} label={interest} size="small" color="primary" variant="outlined" />
              ))}
            </Box>
          </Stack>
        </Paper>

        <Alert severity="success" icon={<CheckIcon />}>
          Your profile looks great! Ready to start swiping?
        </Alert>
      </Stack>
    </Box>
  );

  const steps: OnboardingStep[] = [
    {
      id: 'basic',
      title: 'Let\'s set up your profile',
      subtitle: 'Add your photo and basic info',
      component: <BasicInfoStep />
    },
    {
      id: 'bio',
      title: 'Tell us about yourself',
      subtitle: 'Write something that represents you',
      component: <BioStep />
    },
    {
      id: 'interests',
      title: 'What are you into?',
      subtitle: 'Help us find compatible matches',
      component: <InterestsStep />
    },
    {
      id: 'preferences',
      title: 'Set your preferences',
      subtitle: 'Who are you looking to meet?',
      component: <PreferencesStep />
    },
    {
      id: 'review',
      title: 'You\'re all set!',
      subtitle: 'Ready to start your journey?',
      component: <ReviewStep />
    }
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return profile.displayName && profile.age && profile.location;
      case 1:
        return profile.bio && profile.bio.length >= 10;
      case 2:
        return profile.interests && profile.interests.length >= 3 && profile.lookingFor;
      case 3:
        return preferences.ageRange && preferences.maxDistance;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', py: 4 }}>
      <Box>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Welcome to Galatea.AI
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(currentStep / (steps.length - 1)) * 100}
            sx={{ 
              height: 8, 
              borderRadius: 4,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              '& .MuiLinearProgress-bar': {
                borderRadius: 4
              }
            }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
            Step {currentStep + 1} of {steps.length}
          </Typography>
        </Box>

        {/* Content Card */}
        <Card
          elevation={4}
          sx={{
            borderRadius: 4,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Step Title */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                {steps[currentStep].title}
              </Typography>
              {steps[currentStep].subtitle && (
                <Typography variant="body1" color="text.secondary">
                  {steps[currentStep].subtitle}
                </Typography>
              )}
            </Box>

            {/* Step Content */}
            <Slide direction={slideDirection === 'left' ? 'left' : 'right'} in mountOnEnter unmountOnExit>
              <Box>
                {steps[currentStep].component}
              </Box>
            </Slide>

            {/* Error Display */}
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={currentStep === 0}
            startIcon={<ArrowBackIcon />}
            sx={{ minWidth: 120 }}
          >
            Back
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleFinish}
              disabled={!canProceed() || isLoading}
              endIcon={isLoading ? undefined : <DoneIcon />}
              sx={{ 
                minWidth: 150,
                background: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FF5252 30%, #26C6DA 90%)',
                }
              }}
            >
              {isLoading ? 'Saving...' : 'Start Swiping!'}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!canProceed()}
              endIcon={<ArrowForwardIcon />}
              sx={{ minWidth: 120 }}
            >
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ProfileOnboardingScreen;
