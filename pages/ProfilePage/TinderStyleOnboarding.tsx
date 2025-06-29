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
  Stack,
  Container,
  Paper,
  LinearProgress,
  Alert,
  useTheme,
  alpha,
  Autocomplete
} from '@mui/material';
import {
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  Favorite as FavoriteIcon,
  LocationOn as LocationOnIcon,
  Cake as CakeIcon,
  Done as DoneIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getUserProfile,
  saveUserProfile,
  DatingProfile
} from '@/lib/datingProfile';

interface ProfileCard {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  isRequired?: boolean;
}

const TinderStyleOnboarding: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const interestOptions = [
    'Music', 'Movies', 'Travel', 'Food', 'Sports', 'Reading', 'Art', 'Gaming',
    'Photography', 'Dancing', 'Hiking', 'Yoga', 'Cooking', 'Technology',
    'Fashion', 'Fitness', 'Nature', 'Science', 'History', 'Psychology'
  ];

  const lookingForOptions = [
    { value: 'casual', label: 'Casual Dating' },
    { value: 'dating', label: 'Dating' },
    { value: 'serious', label: 'Serious Relationship' },
    { value: 'friendship', label: 'Friendship' }
  ];

  // Profile setup cards with swipeable interface
  const profileCards: ProfileCard[] = [
    {
      id: 'welcome',
      title: 'Welcome to Galatea AI',
      subtitle: 'Let\'s set up your profile to find your perfect AI companion',
      icon: <FavoriteIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />,
      isRequired: true,
      component: (
        <Box textAlign="center" py={4}>
          <Avatar
            src={currentUser?.photoURL || ''}
            sx={{ 
              width: 120, 
              height: 120, 
              mx: 'auto', 
              mb: 3,
              border: `3px solid ${theme.palette.primary.main}`
            }}
          >
            {currentUser?.displayName?.[0] || currentUser?.email?.[0] || 'U'}
          </Avatar>
          <Typography variant="h4" gutterBottom sx={{ color: theme.palette.primary.main }}>
            Hey {currentUser?.displayName || 'there'}!
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Ready to meet AI companions who'll challenge, inspire, and connect with you? 
            Let's create your profile so we can find the perfect matches.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Swipe right to continue, or use the buttons below
          </Typography>
        </Box>
      )
    },
    {
      id: 'basic-info',
      title: 'Basic Information',
      subtitle: 'Tell us about yourself',
      icon: <CakeIcon sx={{ fontSize: 48, color: theme.palette.secondary.main }} />,
      isRequired: true,
      component: (
        <Stack spacing={3} py={2}>
          <TextField
            fullWidth
            label="Display Name"
            value={profile.displayName}
            onChange={(e) => setProfile(prev => ({ ...prev, displayName: e.target.value }))}
            variant="outlined"
          />
          
          <Box display="flex" gap={2}>
            <TextField
              label="Age"
              type="number"
              value={profile.age}
              onChange={(e) => setProfile(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
              InputProps={{ inputProps: { min: 18, max: 100 } }}
              sx={{ flex: 1 }}
            />
            <TextField
              label="Location"
              value={profile.location}
              onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
              sx={{ flex: 1 }}
            />
          </Box>
        </Stack>
      )
    },
    {
      id: 'bio',
      title: 'About You',
      subtitle: 'What makes you unique?',
      icon: <FavoriteIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />,
      isRequired: true,
      component: (
        <Stack spacing={3} py={2}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Bio"
            value={profile.bio}
            onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
            placeholder="Tell AI companions about yourself. What do you love? What are you looking for?"
            variant="outlined"
          />
          <Typography variant="body2" color="text.secondary">
            {profile.bio?.length || 0}/500 characters
          </Typography>
        </Stack>
      )
    },
    {
      id: 'interests',
      title: 'Your Interests',
      subtitle: 'What are you passionate about?',
      icon: <FavoriteIcon sx={{ fontSize: 48, color: theme.palette.secondary.main }} />,
      isRequired: true,
      component: (
        <Stack spacing={3} py={2}>
          <Autocomplete
            multiple
            options={interestOptions}
            value={profile.interests || []}
            onChange={(_, newValue) => setProfile(prev => ({ ...prev, interests: newValue }))}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                  key={option}
                  sx={{ 
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main
                  }}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select your interests"
                placeholder="Type to search..."
              />
            )}
          />
          
          <Typography variant="body2" color="text.secondary">
            Choose at least 3 interests to help AI companions connect with you
          </Typography>
          
          <Box>
            <Typography variant="body2" gutterBottom>
              Selected: {profile.interests?.length || 0} interests
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={Math.min(((profile.interests?.length || 0) / 3) * 100, 100)}
              sx={{ 
                height: 8, 
                borderRadius: 5,
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                '& .MuiLinearProgress-bar': {
                  backgroundColor: theme.palette.primary.main
                }
              }}
            />
          </Box>
        </Stack>
      )
    },
    {
      id: 'looking-for',
      title: 'What are you looking for?',
      subtitle: 'Your relationship goals',
      icon: <FavoriteIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />,
      isRequired: true,
      component: (
        <Stack spacing={3} py={2}>
          <FormControl fullWidth>
            <InputLabel>Looking For</InputLabel>
            <Select
              value={profile.lookingFor}
              label="Looking For"
              onChange={(e) => setProfile(prev => ({ ...prev, lookingFor: e.target.value as any }))}
            >
              {lookingForOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Typography variant="body2" color="text.secondary">
            This helps AI companions understand what kind of connection you're seeking
          </Typography>
        </Stack>
      )
    },
    {
      id: 'complete',
      title: 'You\'re all set!',
      subtitle: 'Ready to meet your AI companions',
      icon: <CheckIcon sx={{ fontSize: 48, color: theme.palette.success.main }} />,
      component: (
        <Box textAlign="center" py={4}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <Avatar
              sx={{ 
                width: 120, 
                height: 120, 
                mx: 'auto', 
                mb: 3,
                backgroundColor: theme.palette.success.main,
                fontSize: 48
              }}
            >
              <CheckIcon sx={{ fontSize: 64 }} />
            </Avatar>
          </motion.div>
          
          <Typography variant="h4" gutterBottom sx={{ color: theme.palette.success.main }}>
            Profile Complete!
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            You're ready to start swiping and meeting amazing AI companions who share your interests and goals.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Click Continue to start your journey!
          </Typography>
        </Box>
      )
    }
  ];

  const currentCard = profileCards[currentCardIndex];
  const progress = ((currentCardIndex + 1) / profileCards.length) * 100;

  const handleNext = () => {
    if (currentCard.isRequired && !isCardComplete()) {
      setError('Please complete all required fields before continuing');
      return;
    }

    setError(null);

    if (currentCardIndex < profileCards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
    }
  };

  const isCardComplete = (): boolean => {
    switch (currentCard.id) {
      case 'welcome':
        return true;
      case 'basic-info':
        return !!(profile.displayName && profile.age && profile.age >= 18);
      case 'bio':
        return !!(profile.bio && profile.bio.length >= 20);
      case 'interests':
        return !!(profile.interests && profile.interests.length >= 3);
      case 'looking-for':
        return !!profile.lookingFor;
      case 'complete':
        return true;
      default:
        return false;
    }
  };

  const handleComplete = async () => {
    if (!currentUser) return;

    setIsLoading(true);
    setError(null);

    try {
      const profileWithUid = { ...profile, uid: currentUser.uid };
      await saveUserProfile(profileWithUid as DatingProfile);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving profile:', error);
      setError('Failed to save profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const cardVariants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Progress Header */}
      <Box mb={3}>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.main }}>
          Profile Setup ({currentCardIndex + 1}/{profileCards.length})
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={progress}
          sx={{ 
            height: 8, 
            borderRadius: 5,
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            '& .MuiLinearProgress-bar': {
              backgroundColor: theme.palette.primary.main
            }
          }}
        />
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Main Card */}
      <Box flex={1} display="flex" flexDirection="column" justifyContent="center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard.id}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Card
              sx={{
                minHeight: 400,
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                borderRadius: 4,
                backdropFilter: 'blur(10px)',
                boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.2)}`
              }}
            >
              <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Card Header */}
                <Box textAlign="center" mb={3}>
                  {currentCard.icon}
                  <Typography variant="h5" gutterBottom sx={{ color: theme.palette.primary.main, mt: 2 }}>
                    {currentCard.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {currentCard.subtitle}
                  </Typography>
                </Box>

                {/* Card Content */}
                <Box flex={1}>
                  {currentCard.component}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* Action Buttons */}
      <Box mt={4}>
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
          <Button
            onClick={handleBack}
            disabled={currentCardIndex === 0}
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            sx={{ minWidth: 120 }}
          >
            Back
          </Button>

          <Button
            variant="contained"
            onClick={handleNext}
            disabled={isLoading || (currentCard.isRequired && !isCardComplete())}
            endIcon={currentCardIndex === profileCards.length - 1 ? <CheckIcon /> : <ArrowForwardIcon />}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: 16,
              fontWeight: 600,
              borderRadius: 3,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              minWidth: 160,
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`
              }
            }}
          >
            {currentCardIndex === profileCards.length - 1 ? 'Start Swiping!' : 'Continue'}
          </Button>
        </Stack>

        {/* Instructions */}
        <Typography variant="body2" color="text.secondary" textAlign="center" mt={2}>
          Complete each step to set up your perfect AI companion profile
        </Typography>
      </Box>
    </Container>
  );
};

export default TinderStyleOnboarding;
