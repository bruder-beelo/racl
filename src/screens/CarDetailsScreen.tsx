import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { VendorCard } from '../components/VendorCard';
import { DateTimePickerModal } from '../components/DateTimePickerModal';
import { LocationPickerModal } from '../components/LocationPickerModal';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../theme/colors';

type CarDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CarDetails'>;
type CarDetailsScreenRouteProp = RouteProp<RootStackParamList, 'CarDetails'>;

interface CarDetailsScreenProps {
  navigation: CarDetailsScreenNavigationProp;
  route: CarDetailsScreenRouteProp;
}

export const CarDetailsScreen: React.FC<CarDetailsScreenProps> = ({ navigation, route }) => {
  const { car } = route.params;
  const listing = car.listings[0];
  const pricePerDay = listing?.pricePerDay || 0;
  const insets = useSafeAreaInsets();

  // State for trip dates and times
  const [pickupDate, setPickupDate] = useState(new Date('2026-03-24'));
  const [dropoffDate, setDropoffDate] = useState(new Date('2026-03-27'));
  const [pickupTime, setPickupTime] = useState('10:00 AM');
  const [dropoffTime, setDropoffTime] = useState('10:00 AM');
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  // State for location
  const [pickupLocation, setPickupLocation] = useState('Las Vegas, NV 89118');
  const [dropoffLocation, setDropoffLocation] = useState('Las Vegas, NV 89118');
  const [sameLocation, setSameLocation] = useState(true);
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  // Calculate trip duration
  const tripDays = Math.ceil((dropoffDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalPrice = pricePerDay * tripDays;

  const handleDateTimeConfirm = (
    pickup: Date,
    dropoff: Date,
    pickupT: string,
    dropoffT: string
  ) => {
    setPickupDate(pickup);
    setDropoffDate(dropoff);
    setPickupTime(pickupT);
    setDropoffTime(dropoffT);
  };

  const handleLocationConfirm = (
    pickup: string,
    dropoff: string,
    same: boolean
  ) => {
    setPickupLocation(pickup);
    setDropoffLocation(dropoff);
    setSameLocation(same);
  };

  const formatTripDate = (date: Date, time: string) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = date.getDate();

    // Convert 24h to 12h format for display
    const [hourMin, period] = time.split(' ');
    const [hours, minutes] = hourMin.split(':');
    const displayTime = `${hours}:${minutes}`;

    return `${dayName}, ${monthName} ${day} at ${displayTime}`;
  };

  const handleBook = () => {
    if (listing) {
      Alert.alert(
        'Booking Confirmed',
        `You're booking the ${car.year} ${car.make} ${car.model} from ${listing.vendor.name} for $${totalPrice} total (${tripDays} days)`,
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Image source={{ uri: car.image }} style={styles.image} />

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={styles.header}>
            <View>
              <Text style={styles.carName}>{`${car.year} ${car.make} ${car.model}`}</Text>
              <Text style={styles.carType}>{car.type} • {car.category}</Text>
            </View>
          </View>

          <View style={styles.tripSummary}>
            <Text style={styles.tripTitle}>Your trip</Text>

            <View style={styles.tripSection}>
              <View style={styles.tripIconContainer}>
                <Ionicons name="calendar-outline" size={22} color={theme.colors.textSecondary} />
              </View>
              <View style={styles.tripContent}>
                <Text style={styles.tripLabel}>Trip dates</Text>
                <Text style={styles.tripDate}>{formatTripDate(pickupDate, pickupTime)}</Text>
                <Text style={styles.tripDate}>{formatTripDate(dropoffDate, dropoffTime)}</Text>
              </View>
              <TouchableOpacity
                style={styles.sectionEditButton}
                activeOpacity={0.7}
                onPress={() => setShowDateTimePicker(true)}
              >
                <Ionicons name="create-outline" size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <View style={styles.tripSection}>
              <View style={styles.tripIconContainer}>
                <Ionicons name="car-outline" size={22} color={theme.colors.textSecondary} />
              </View>
              <View style={styles.tripContent}>
                <Text style={styles.tripLabel}>Pickup & return location</Text>
                <Text style={styles.tripDate}>{pickupLocation}</Text>
                {!sameLocation && <Text style={styles.tripDate}>{dropoffLocation}</Text>}
              </View>
              <TouchableOpacity
                style={styles.sectionEditButton}
                activeOpacity={0.7}
                onPress={() => setShowLocationPicker(true)}
              >
                <Ionicons name="create-outline" size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Car Specs</Text>
            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Seats</Text>
                <Text style={styles.detailValue}>{car.specs.seats}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Transmission</Text>
                <Text style={styles.detailValue}>{car.specs.transmission}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Fuel Type</Text>
                <Text style={styles.detailValue}>{car.specs.fuelType}</Text>
              </View>
              {car.specs.mpg && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Efficiency</Text>
                  <Text style={styles.detailValue}>{car.specs.mpg}</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={styles.featuresContainer}>
              {car.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Text style={styles.featureBullet}>•</Text>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>

          {listing && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Rental Agency Details</Text>
              <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Agency</Text>
                  <Text style={styles.detailValue}>{listing.vendor.name}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Rating</Text>
                  <Text style={styles.detailValue}>{listing.vendor.rating}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Trips</Text>
                  <Text style={styles.detailValue}>{listing.vendor.tripCount}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Host Status</Text>
                  <Text style={styles.detailValue}>All-Star Host</Text>
                </View>
              </View>
            </View>
          )}

          {/* Bottom spacing for floating bar */}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Date Time Picker Modal */}
      <DateTimePickerModal
        visible={showDateTimePicker}
        onClose={() => setShowDateTimePicker(false)}
        onConfirm={handleDateTimeConfirm}
      />

      {/* Location Picker Modal */}
      <LocationPickerModal
        visible={showLocationPicker}
        onClose={() => setShowLocationPicker(false)}
        onConfirm={handleLocationConfirm}
        initialPickup={pickupLocation}
        initialDropoff={dropoffLocation}
        initialSameLocation={sameLocation}
      />

      {/* Floating Bottom Bar */}
      <View style={[styles.floatingBar, { bottom: insets.bottom + 45 }]}>
        <View style={styles.priceSection}>
          <Text style={styles.priceLabel}>Total</Text>
          <Text style={styles.price}>${totalPrice}</Text>
        </View>
        <TouchableOpacity style={styles.bookNowButton} onPress={handleBook} activeOpacity={0.8}>
          <Text style={styles.bookNowButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: theme.colors.background,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    backgroundColor: theme.colors.overlay,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    minHeight: 44,
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  carName: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  carType: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  tripSummary: {
    marginBottom: 32,
  },
  tripTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 16,
  },
  tripSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  tripIconContainer: {
    width: 32,
    alignItems: 'flex-start',
    marginRight: 12,
    paddingTop: 2,
  },
  tripContent: {
    flex: 1,
  },
  tripLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  tripDate: {
    fontSize: 15,
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  sectionEditButton: {
    padding: 4,
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginBottom: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: theme.colors.textMuted,
    marginBottom: 16,
  },
  detailsContainer: {
    marginTop: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  detailLabel: {
    fontSize: 15,
    color: theme.colors.textSecondary,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  featuresContainer: {
    marginTop: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureBullet: {
    fontSize: 18,
    color: theme.colors.accent,
    marginRight: 12,
    fontWeight: '600',
  },
  featureText: {
    fontSize: 15,
    color: theme.colors.textPrimary,
  },
  floatingBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  priceSection: {
    marginRight: 32,
  },
  priceLabel: {
    fontSize: 13,
    color: theme.colors.textMuted,
    marginBottom: 2,
    fontWeight: '500',
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  bookNowButton: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookNowButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textOnAccent,
  },
});
