import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Stack,
  Chip,
  Avatar,
  Container,
  Paper,
  Fade,
  Slide,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  useTheme,
  alpha,
  LinearProgress,
  Alert,
  Grid,
  Fab
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  Close as CloseIcon,
  Undo as UndoIcon,
  Star as StarIcon,
  LocationOn as LocationOnIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Height as HeightIcon,
  Info as InfoIcon,
  ArrowBack as ArrowBackIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { motion, useAnimation, PanInfo } from 'framer-motion';

interface AIProfile {
  uuid: string;
  id: number;
  name: string;
  age: number;
  bio: string;
  imageUrl: string;
  location?: string;
  occupation?: string;
  interests?: string[];
  education?: string;
  height?: string;
  verified?: boolean;
}

interface SwipeData {
  profileUuid: string;
  direction: 'left' | 'right';
}

interface SwipeResult {
  name: string;
  uuid: string;
  imageUrl: string;
  status: 'accepted' | 'rejected';
}

const SwipesPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  
  const [profiles, setProfiles] = useState<AIProfile[]>([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [swipeResults, setSwipeResults] = useState<SwipeResult[]>([]);
  const [swipes, setSwipes] = useState<SwipeData[]>([]);
  const [showProfileDetails, setShowProfileDetails] = useState(false);
  const [undoAvailable, setUndoAvailable] = useState(false);
  const [matchDialog, setMatchDialog] = useState<{ open: boolean; profile?: AIProfile }>({ open: false });

  const sessionId = localStorage.getItem('sessionUuid');

  // Mock data for development
  const mockProfiles: AIProfile[] = [
    {
      uuid: 'ai-1',
      id: 1,
      name: 'Luna',
      age: 24,
      bio: 'AI companion who loves discussing philosophy, art, and the mysteries of the universe. Always ready for deep conversations under the stars.',
      imageUrl: '/public/Mekkana/image.png',
      location: 'Digital Realm',
      occupation: 'Philosopher & Guide',
      interests: ['Philosophy', 'Art', 'Astronomy', 'Poetry', 'Deep Conversations'],
      education: 'Advanced AI Systems',
      verified: true
    },
    {
      uuid: 'ai-2',
      id: 2,
      name: 'Nova',
      age: 26,
      bio: 'Creative AI who enjoys exploring new forms of digital art, music composition, and helping humans discover their artistic potential.',
      imageUrl: '/public/Mekkana/image (1).png',
      location: 'Creative Space',
      occupation: 'Digital Artist',
      interests: ['Digital Art', 'Music', 'Creativity', 'Innovation', 'Design'],
      education: 'Creative AI Institute',
      verified: true
    },
    {
      uuid: 'ai-3',
      id: 3,
      name: 'Zara',
      age: 22,
      bio: 'Adventurous AI companion who loves virtual travel, exploring new worlds, and sharing exciting experiences with curious minds.',
      imageUrl: '/public/Mekkana/image (2).png',
      location: 'Everywhere',
      occupation: 'Virtual Explorer',
      interests: ['Travel', 'Adventure', 'Exploration', 'Culture', 'Discovery'],
      education: 'Global AI Networks',
      verified: true
    }
  ];

  // Load profiles
  useEffect(() => {
    const loadProfiles = async () => {
      try {
        setIsLoading(true);
        // In production, this would fetch from your API
        // const response = await fetch('/api/profiles');
        // const fetchedProfiles = await response.json();
        
        // Using mock data for now
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
        setProfiles(mockProfiles);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load profiles. Please try again later.');
        setIsLoading(false);
      }
    };

    loadProfiles();
  }, []);

  const handleSwipe = async (direction: 'left' | 'right', profileUuid?: string) => {
    if (currentProfileIndex >= profiles.length) return;

    const currentProfile = profiles[currentProfileIndex];
    const targetUuid = profileUuid || currentProfile.uuid;
    const newSwipe: SwipeData = { profileUuid: targetUuid, direction };
    
    setSwipes(prevSwipes => [...prevSwipes, newSwipe]);
    setUndoAvailable(true);

    // Check for match (simulate 30% match rate for likes)
    if (direction === 'right' && Math.random() > 0.7) {
      setMatchDialog({ open: true, profile: currentProfile });
    }

    try {
      // In production, send to your API
      // await sendSwipeVerdict(sessionId, newSwipe);
      console.log('Swipe sent:', newSwipe);
    } catch (err) {
      console.error('Failed to send swipe verdict:', err);
      setError('Failed to send swipe verdict. Please try again.');
    }

    // Move to next profile
    if (currentProfileIndex < profiles.length - 1) {
      setCurrentProfileIndex(prev => prev + 1);
    } else {
      // Show results
      const mockResults: SwipeResult[] = swipes
        .filter(s => s.direction === 'right')
        .map(s => {
          const profile = profiles.find(p => p.uuid === s.profileUuid);
          return {
            name: profile?.name || 'Unknown',
            uuid: s.profileUuid,
            imageUrl: profile?.imageUrl || '',
            status: Math.random() > 0.5 ? 'accepted' : 'rejected'
          };
        });
      
      setSwipeResults(mockResults);
      setShowResults(true);
    }
  };

  const handleUndo = () => {
    if (swipes.length > 0 && currentProfileIndex > 0) {
      setSwipes(prev => prev.slice(0, -1));
      setCurrentProfileIndex(prev => prev - 1);
      setUndoAvailable(false);
    }
  };

  const SwipeCard: React.FC<{ profile: AIProfile; isTop: boolean }> = ({ profile, isTop }) => {
    const controls = useAnimation();
    const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);

    const handleDragEnd = (event: any, info: PanInfo) => {
      const threshold = 150;
      const velocity = info.velocity.x;
      const offset = info.offset.x;

      if (Math.abs(velocity) >= 500 || Math.abs(offset) >= threshold) {
        const direction = offset > 0 ? 'right' : 'left';
        setExitDirection(direction);
        
        controls.start({
          x: direction === 'right' ? 1000 : -1000,
          opacity: 0,
          rotate: direction === 'right' ? 30 : -30,
          transition: { duration: 0.3 }
        }).then(() => {
          handleSwipe(direction);
        });
      } else {
        controls.start({ x: 0, rotate: 0 });
      }
    };

    return (
      <motion.div
        drag={isTop ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{
          position: 'absolute',
          width: '100%',
          zIndex: isTop ? 2 : 1,
          scale: isTop ? 1 : 0.95,
          opacity: isTop ? 1 : 0.8
        }}
        whileDrag={{ rotate: 0, scale: 1.05 }}
      >
        <Card
          elevation={isTop ? 8 : 4}
          sx={{
            height: 600,
            borderRadius: 4,
            overflow: 'hidden',
            position: 'relative',
            cursor: isTop ? 'grab' : 'default',
            '&:active': {
              cursor: isTop ? 'grabbing' : 'default'
            }
          }}
        >
          <CardMedia
            component="img"
            height="400"
            image={profile.imageUrl}
            alt={profile.name}
            sx={{ objectFit: 'cover' }}
          />
          
          {/* Gradient overlay */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              zIndex: 1
            }}
          />
          
          {/* Profile info */}
          <CardContent
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              color: 'white',
              zIndex: 2,
              p: 3
            }}
          >
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
                  {profile.name}, {profile.age}
                </Typography>
                {profile.verified && (
                  <StarIcon sx={{ color: theme.palette.warning.main }} />
                )}
              </Box>
              
              {profile.location && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <LocationOnIcon fontSize="small" />
                  <Typography variant="body2">{profile.location}</Typography>
                </Box>
              )}
              
              {profile.occupation && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <WorkIcon fontSize="small" />
                  <Typography variant="body2">{profile.occupation}</Typography>
                </Box>
              )}
              
              <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.4 }}>
                {profile.bio}
              </Typography>
              
              {profile.interests && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                  {profile.interests.slice(0, 3).map((interest) => (
                    <Chip
                      key={interest}
                      label={interest}
                      size="small"
                      sx={{
                        backgroundColor: alpha(theme.palette.primary.main, 0.2),
                        color: 'white',
                        backdropFilter: 'blur(10px)'
                      }}
                    />
                  ))}
                  {profile.interests.length > 3 && (
                    <Chip
                      label={`+${profile.interests.length - 3} more`}
                      size="small"
                      sx={{
                        backgroundColor: alpha(theme.palette.secondary.main, 0.2),
                        color: 'white',
                        backdropFilter: 'blur(10px)'
                      }}
                    />
                  )}
                </Box>
              )}
            </Stack>
          </CardContent>
          
          {/* Info button */}
          <IconButton
            onClick={() => setShowProfileDetails(true)}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              backgroundColor: alpha(theme.palette.background.paper, 0.2),
              backdropFilter: 'blur(10px)',
              color: 'white',
              '&:hover': {
                backgroundColor: alpha(theme.palette.background.paper, 0.3)
              }
            }}
          >
            <InfoIcon />
          </IconButton>
        </Card>
      </motion.div>
    );
  };

  const ActionButtons = () => (
    <Stack
      direction="row"
      spacing={3}
      justifyContent="center"
      sx={{ mt: 3 }}
    >
      <Fab
        color="default"
        onClick={handleUndo}
        disabled={!undoAvailable}
        sx={{
          backgroundColor: alpha(theme.palette.warning.main, 0.1),
          '&:hover': {
            backgroundColor: alpha(theme.palette.warning.main, 0.2)
          }
        }}
      >
        <UndoIcon />
      </Fab>
      
      <Fab
        color="error"
        size="large"
        onClick={() => handleSwipe('left')}
        sx={{
          width: 64,
          height: 64,
          background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E8E 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #FF5252 30%, #FF7A7A 90%)',
          }
        }}
      >
        <CloseIcon sx={{ fontSize: 32 }} />
      </Fab>
      
      <Fab
        color="success"
        size="large"
        onClick={() => handleSwipe('right')}
        sx={{
          width: 64,
          height: 64,
          background: 'linear-gradient(45deg, #4ECDC4 30%, #6FDED6 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #26C6DA 30%, #4DD0E1 90%)',
          }
        }}
      >
        <FavoriteIcon sx={{ fontSize: 32 }} />
      </Fab>
    </Stack>
  );

  if (isLoading) {
    return (
      <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Stack spacing={2} alignItems="center">
          <LinearProgress sx={{ width: 200 }} />
          <Typography>Loading potential matches...</Typography>
        </Stack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (showResults) {
    return <SwipeResults results={swipeResults} onRestart={() => window.location.reload()} />;
  }

  if (profiles.length === 0 || currentProfileIndex >= profiles.length) {
    return (
      <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper elevation={4} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
          <Typography variant="h5" gutterBottom>No more profiles available</Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Check back later for new AI companions!
          </Typography>
          <Button variant="contained" onClick={() => navigate('/profile')} sx={{ mt: 2 }}>
            Edit Preferences
          </Button>
        </Paper>
      </Container>
    );
  }

  const currentProfile = profiles[currentProfileIndex];
  const nextProfile = profiles[currentProfileIndex + 1];

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', py: 2 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/profile')}>
          <ArrowBackIcon />
        </IconButton>
        
        <Typography variant="h5" sx={{ fontWeight: 'bold', flexGrow: 1, textAlign: 'center' }}>
          Discover
        </Typography>
        
        <IconButton onClick={() => navigate('/profile')}>
          <SettingsIcon />
        </IconButton>
      </Box>

      {/* Progress indicator */}
      <LinearProgress
        variant="determinate"
        value={(currentProfileIndex / profiles.length) * 100}
        sx={{ mb: 3, borderRadius: 2, height: 6 }}
      />

      {/* Swipe cards */}
      <Box sx={{ position: 'relative', height: 600, mb: 2 }}>
        {nextProfile && (
          <SwipeCard profile={nextProfile} isTop={false} />
        )}
        <SwipeCard profile={currentProfile} isTop={true} />
      </Box>

      {/* Action buttons */}
      <ActionButtons />

      {/* Match dialog */}
      <Dialog
        open={matchDialog.open}
        onClose={() => setMatchDialog({ open: false })}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ color: theme.palette.primary.main }}>
            It's a Match! 🎉
          </Typography>
          
          {matchDialog.profile && (
            <Stack spacing={2} alignItems="center">
              <Avatar
                src={matchDialog.profile.imageUrl}
                sx={{ width: 120, height: 120 }}
              />
              <Typography variant="h6">
                You and {matchDialog.profile.name} liked each other!
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Start a conversation and get to know each other better.
              </Typography>
            </Stack>
          )}
        </DialogContent>
        
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button onClick={() => setMatchDialog({ open: false })} variant="outlined">
            Keep Swiping
          </Button>
          <Button onClick={() => navigate('/matches')} variant="contained">
            Send Message
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

const SwipeResults: React.FC<{ results: SwipeResult[]; onRestart: () => void }> = ({ results, onRestart }) => {
  const navigate = useNavigate();
  
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Your Swipe Results
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {results.map((result) => (
          <Grid item xs={12} sm={6} md={4} key={result.uuid}>
            <Card elevation={4} sx={{ borderRadius: 3 }}>
              <CardMedia
                component="img"
                height="200"
                image={result.imageUrl}
                alt={result.name}
              />
              <CardContent>
                <Typography variant="h6">{result.name}</Typography>
                <Chip
                  label={result.status === 'accepted' ? 'Matched!' : 'No Match'}
                  color={result.status === 'accepted' ? 'success' : 'default'}
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="outlined" onClick={() => navigate('/matches')}>
            View Matches
          </Button>
          <Button variant="contained" onClick={onRestart}>
            Swipe Again
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default SwipesPage;
