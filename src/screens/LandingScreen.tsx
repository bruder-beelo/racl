import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Image,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAuth } from '../contexts/AuthContext';

const { width, height } = Dimensions.get('window');

type LandingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Landing'>;

interface LandingScreenProps {
  navigation: LandingScreenNavigationProp;
}

const SLIDES = [
  {
    image: require('../../assets/neon_carousel/carousel-image-1.png'),
    title: 'Welcome!',
    subtitle: 'Smart car rentals for the modern traveler.',
    description: 'Everything digital, from booking to pickup.',
  },
  {
    image: require('../../assets/neon_carousel/carousel-image-2.png'),
    title: 'One search. Multiple agencies. Best price.',
    subtitle: 'Compare offers instantly and book with confidence.',
    description: '',
  },
  {
    image: require('../../assets/neon_carousel/carousel-image-3.png'),
    title: 'Rent with peace of mind.',
    subtitle: 'Trusted providers, clear pricing, zero surprises.',
    description: '',
  },
];

export const LandingScreen: React.FC<LandingScreenProps> = ({ navigation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const { login } = useAuth();

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSignIn = async () => {
    // Mock sign in - just set authenticated state and navigate to MainTabs
    await login('guest@example.com', 'password');
    navigation.navigate('MainTabs');
  };

  const handleGuestEntry = () => {
    navigation.navigate('MainTabs');
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentSlide(slideIndex);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Animated.View
            style={[
              styles.carouselContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              decelerationRate="fast"
              snapToInterval={width}
              snapToAlignment="center"
            >
              {SLIDES.map((slide, index) => (
                <View key={index} style={styles.slide}>
                  <View style={styles.imageWrapper}>
                    <Image
                      source={slide.image}
                      style={styles.slideImage}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.slideTitle}>{slide.title}</Text>
                    <Text style={styles.slideSubtitle}>{slide.subtitle}</Text>
                    {slide.description ? (
                      <Text style={styles.slideDescription}>{slide.description}</Text>
                    ) : null}
                  </View>
                </View>
              ))}
            </ScrollView>
          </Animated.View>

          <View style={styles.bottomSection}>
            <View style={styles.pagination}>
              {SLIDES.map((_, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.paginationDot,
                    currentSlide === index && styles.paginationDotActive,
                  ]}
                />
              ))}
            </View>

            <Animated.View
              style={[
                styles.buttonContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <TouchableOpacity
                style={styles.primaryButton}
                activeOpacity={0.8}
                onPress={handleSignIn}
              >
                <Text style={styles.primaryButtonText}>Sign In</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                activeOpacity={0.8}
                onPress={handleSignIn}
              >
                <Text style={styles.secondaryButtonText}>Sign Up</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.guestButton}
                onPress={handleGuestEntry}
                activeOpacity={0.6}
              >
                <Text style={styles.guestButtonText}>Enter as Guest</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  slide: {
    width,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 30,
    backgroundColor: '#000',
  },
  imageWrapper: {
    width: width - 40,
    height: height * 0.35,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImage: {
    width: width,
    height: height * 0.35,
  },
  textContainer: {
    marginTop: 25,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  slideTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  slideSubtitle: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    lineHeight: 24,
  },
  slideDescription: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  bottomSection: {
    paddingBottom: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 30,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2a2a2a',
  },
  paginationDotActive: {
    backgroundColor: '#5B67F1',
    width: 28,
    shadowColor: '#5B67F1',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonContainer: {
    gap: 14,
    paddingHorizontal: 28,
  },
  primaryButton: {
    backgroundColor: '#5B67F1',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#5B67F1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  secondaryButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.3,
  },
  guestButton: {
    paddingVertical: 16,
    alignItems: 'center',
    minHeight: 44,
    justifyContent: 'center',
  },
  guestButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#888',
    letterSpacing: 0.2,
  },
});