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
  Container,
  Stack,
  Fab,
  useTheme,
  alpha,
  Paper,
  IconButton,
  Chip,
  Slide
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  SwipeRight as SwipeRightIcon,
  Person as PersonIcon,
  AutoAwesome as AutoAwesomeIcon,
  Chat as ChatIcon,
  Settings as SettingsIcon,
  Explore as ExploreIcon,
  Psychology as PsychologyIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { getUserProfile, DatingProfile } from '@/lib/datingProfile';

interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  route: string;
  gradient: string;
}

const WelcomeDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  
  const [profile, setProfile] = useState<DatingProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      if (!currentUser) return;
      
      try {
        const userProfile = await getUserProfile(currentUser.uid);
        setProfile(userProfile);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [currentUser]);

  const quickActions: QuickAction[] = [
    {
      id: 'swipe',
      title: 'Start Swiping',
      subtitle: 'Meet new AI companions',
      icon: <SwipeRightIcon sx={{ fontSize: 32 }} />,
      color: theme.palette.primary.main,
      route: '/swipes',
      gradient: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
    },
    {
      id: 'matches',
      title: 'My Matches',
      subtitle: 'Chat with your connections',
      icon: <FavoriteIcon sx={{ fontSize: 32 }} />,
      color: theme.palette.secondary.main,
      route: '/matches',
      gradient: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`
    },
    {
      id: 'companions',
      title: 'Browse Companions',
      subtitle: 'Explore AI personalities',
      icon: <ExploreIcon sx={{ fontSize: 32 }} />,
      color: theme.palette.info.main,
      route: '/companions',
      gradient: `linear-gradient(135deg, ${theme.palette.info.main}, ${theme.palette.info.dark})`
    },
    {
      id: 'profile',
      title: 'My Profile',
      subtitle: 'Update your information',
      icon: <PersonIcon sx={{ fontSize: 32 }} />,
      color: theme.palette.warning.main,
      route: '/profile',
      gradient: `linear-gradient(135deg, ${theme.palette.warning.main}, ${theme.palette.warning.dark})`
    }
  ];

  const features = [
    {
      icon: <PsychologyIcon sx={{ color: theme.palette.primary.main }} />,
      title: 'Authentic AI Personalities',
      description: 'Each companion has unique traits, preferences, and communication styles'
    },
    {
      icon: <ChatIcon sx={{ color: theme.palette.secondary.main }} />,
      title: 'Real Social Dynamics',
      description: 'Experience genuine interactions including acceptance and rejection'
    },
    {
      icon: <AutoAwesomeIcon sx={{ color: theme.palette.info.main }} />,
      title: 'Confidence Building',
      description: 'Practice social skills in a safe, judgment-free environment'
    }
  ];

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <Typography>Loading your dashboard...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          sx={{
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            borderRadius: 4,
            p: 4,
            mb: 4,
            textAlign: 'center',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Avatar
            src={currentUser?.photoURL || (profile?.photos?.[0]) || ''}
            sx={{ 
              width: 80, 
              height: 80, 
              mx: 'auto', 
              mb: 2,
              border: `3px solid ${theme.palette.primary.main}`
            }}
          >
            {(currentUser?.displayName || profile?.displayName)?.[0] || 'U'}
          </Avatar>
          
          <Typography variant="h4" gutterBottom sx={{ color: theme.palette.primary.main }}>
            Welcome back, {currentUser?.displayName || profile?.displayName || 'Friend'}!
          </Typography>
          
          <Typography variant="h6" color="text.secondary" paragraph>
            Ready to continue your AI companion journey?
          </Typography>

          {profile?.interests && profile.interests.length > 0 && (
            <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" mt={2}>
              {profile.interests.slice(0, 5).map((interest: string) => (
                <Chip
                  key={interest}
                  label={interest}
                  size="small"
                  sx={{
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`
                  }}
                />
              ))}
              {profile.interests.length > 5 && (
                <Chip
                  label={`+${profile.interests.length - 5} more`}
                  size="small"
                  sx={{
                    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                    color: theme.palette.secondary.main
                  }}
                />
              )}
            </Stack>
          )}
        </Paper>
      </motion.div>

      {/* Quick Actions Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: theme.palette.primary.main, mb: 3 }}>
          Quick Actions
        </Typography>
        
        <Box 
          display="grid" 
          gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }} 
          gap={3} 
          mb={4}
        >
          {quickActions.map((action, index) => (
            <Box key={action.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  onClick={() => navigate(action.route)}
                  sx={{
                    background: action.gradient,
                    color: 'white',
                    cursor: 'pointer',
                    height: '100%',
                    minHeight: 140,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    border: `1px solid ${alpha(action.color, 0.3)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: `0 8px 24px ${alpha(action.color, 0.3)}`,
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box mb={2}>
                      {action.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {action.title}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {action.subtitle}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Box>
          ))}
        </Box>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: theme.palette.primary.main, mb: 3 }}>
          Why You'll Love Galatea AI
        </Typography>
        
        <Box 
          display="grid" 
          gridTemplateColumns={{ xs: '1fr', md: 'repeat(3, 1fr)' }} 
          gap={3}
        >
          {features.map((feature, index) => (
            <Box key={feature.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <Paper
                  sx={{
                    p: 3,
                    height: '100%',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    backgroundColor: alpha(theme.palette.background.paper, 0.7),
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Box display="flex" alignItems="flex-start" gap={2}>
                    <Box mt={0.5}>
                      {feature.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Box>
          ))}
        </Box>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Box textAlign="center" mt={6}>
          <Typography variant="h6" gutterBottom color="text.secondary">
            Ready to meet your perfect AI companion?
          </Typography>
          
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/swipes')}
            startIcon={<SwipeRightIcon />}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: 18,
              fontWeight: 600,
              borderRadius: 3,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`
              }
            }}
          >
            Start Swiping Now
          </Button>
        </Box>
      </motion.div>

      {/* Floating Action Button */}
      <Fab
        onClick={() => navigate('/swipes')}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.4)}`
          }
        }}
      >
        <FavoriteIcon />
      </Fab>
    </Container>
  );
};

export default WelcomeDashboard;
