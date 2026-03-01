import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../theme/colors';
import { CarWithListings } from '../types';
import { CompactCarCard } from '../components/CompactCarCard';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

// Mock recommendation data
const BEST_PRICED_CARS: CarWithListings[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
    category: 'Sedan',
    type: 'Sedan',
    features: ['Bluetooth', 'Backup Camera', 'Apple CarPlay'],
    specs: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Hybrid',
      mpg: '52 MPG',
    },
    listings: [{
      id: 'l1',
      carId: '1',
      vendorId: 'v1',
      pricePerDay: 45,
      available: true,
      distance: '2.5 mi',
      vendor: {
        id: 'v1',
        name: 'Abou Ali Rental',
        rating: 4.9,
        reviewCount: 234,
        tripCount: 500,
        responseTime: '< 1 hour',
        location: 'San Francisco, CA',
      },
    }],
  },
  {
    id: '2',
    make: 'Honda',
    model: 'Civic',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800',
    category: 'Sedan',
    type: 'Sedan',
    features: ['Bluetooth', 'Lane Assist', 'Adaptive Cruise'],
    specs: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Gas',
      mpg: '36 MPG',
    },
    listings: [{
      id: 'l2',
      carId: '2',
      vendorId: 'v2',
      pricePerDay: 42,
      available: true,
      distance: '1.8 mi',
      vendor: {
        id: 'v2',
        name: 'Alo Rental',
        rating: 4.8,
        reviewCount: 189,
        tripCount: 420,
        responseTime: '< 2 hours',
        location: 'San Francisco, CA',
      },
    }],
  },
];

const WEEKLY_DEALS: CarWithListings[] = [
  {
    id: '3',
    make: 'Jeep',
    model: 'Wrangler',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
    category: 'SUV',
    type: 'SUV',
    features: ['4WD', 'Off-Road Package', 'Removable Top'],
    specs: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Gas',
      mpg: '22 MPG',
    },
    listings: [{
      id: 'l3',
      carId: '3',
      vendorId: 'v3',
      pricePerDay: 89,
      available: true,
      distance: '3.2 mi',
      vendor: {
        id: 'v3',
        name: 'Abu Hadi Rental',
        rating: 4.9,
        reviewCount: 312,
        tripCount: 650,
        responseTime: '< 1 hour',
        location: 'San Francisco, CA',
      },
    }],
  },
];

const LUXURY_PICKS: CarWithListings[] = [
  {
    id: '4',
    make: 'BMW',
    model: '5 Series',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    category: 'Luxury',
    type: 'Luxury Sedan',
    features: ['Premium Sound', 'Heated Seats', 'Panoramic Roof', 'Massage Seats'],
    specs: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Gas',
      mpg: '28 MPG',
    },
    listings: [{
      id: 'l4',
      carId: '4',
      vendorId: 'v4',
      pricePerDay: 145,
      available: true,
      distance: '4.1 mi',
      vendor: {
        id: 'v4',
        name: 'Abou Ali Rental',
        rating: 5.0,
        reviewCount: 156,
        tripCount: 280,
        responseTime: '< 30 min',
        location: 'San Francisco, CA',
      },
    }],
  },
  {
    id: '5',
    make: 'Mercedes-Benz',
    model: 'E-Class',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800',
    category: 'Luxury',
    type: 'Luxury Sedan',
    features: ['Premium Sound', 'Adaptive Suspension', 'Night Vision', 'Premium Interior'],
    specs: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Gas',
      mpg: '26 MPG',
    },
    listings: [{
      id: 'l5',
      carId: '5',
      vendorId: 'v5',
      pricePerDay: 165,
      available: true,
      distance: '3.8 mi',
      vendor: {
        id: 'v5',
        name: 'Alo Rental',
        rating: 4.9,
        reviewCount: 203,
        tripCount: 380,
        responseTime: '< 1 hour',
        location: 'San Francisco, CA',
      },
    }],
  },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back!</Text>
            <Text style={styles.subtitle}>Find your perfect ride</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Best Priced Cars */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Best Priced Cars</Text>
              <Text style={styles.sectionSubtitle}>Great value for your money</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsRow}
          >
            {BEST_PRICED_CARS.map((car) => (
              <CompactCarCard
                key={car.id}
                car={car}
                onPress={() => navigation.navigate('CarDetails', { car })}
              />
            ))}
          </ScrollView>
        </View>

        {/* Weekly Deals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Weekly Deals</Text>
              <Text style={styles.sectionSubtitle}>Save more on 7+ day rentals</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsRow}
          >
            {WEEKLY_DEALS.map((car) => (
              <CompactCarCard
                key={car.id}
                car={car}
                onPress={() => navigation.navigate('CarDetails', { car })}
              />
            ))}
          </ScrollView>
        </View>

        {/* Luxury Picks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Luxury Picks</Text>
              <Text style={styles.sectionSubtitle}>Premium experience guaranteed</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsRow}
          >
            {LUXURY_PICKS.map((car) => (
              <CompactCarCard
                key={car.id}
                car={car}
                onPress={() => navigation.navigate('CarDetails', { car })}
              />
            ))}
          </ScrollView>
        </View>

        {/* Bottom Padding for Tab Bar */}
        <View style={{ height: tabBarHeight }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: theme.colors.textSecondary,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.surface1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  seeAll: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.accent,
  },
  cardsRow: {
    paddingHorizontal: 20,
    gap: 16,
  },
});
