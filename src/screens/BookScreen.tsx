import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { DateTimePickerModal } from '../components/DateTimePickerModal';
import { LocationPickerModal } from '../components/LocationPickerModal';
import { theme } from '../theme/colors';

type BookScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const BookScreen: React.FC = () => {
  const navigation = useNavigation<BookScreenNavigationProp>();
  const [sameLocation, setSameLocation] = useState(true);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');

  // Pickup date/time
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [pickupTime, setPickupTime] = useState('10:00 AM');

  // Dropoff date/time
  const [dropoffDate, setDropoffDate] = useState<Date | null>(null);
  const [dropoffTime, setDropoffTime] = useState('10:00 AM');

  const [driverAge, setDriverAge] = useState('');
  const [showAgeDropdown, setShowAgeDropdown] = useState(false);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  const ageOptions = ['18-19', '20-24', '25+'];

  const formatDate = (date: Date | null) => {
    if (!date) return 'Select Date';
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Book Your Rental</Text>
          <Text style={styles.subtitle}>Tell us when and where you need a car</Text>
        </View>

        <View style={styles.form}>
          {/* Location Inputs */}
          <View style={styles.inputGroup}>
            {/* Pickup Location Input */}
            <TouchableOpacity
              style={[styles.inputWrapper, !sameLocation && styles.inputWrapperTop]}
              onPress={() => setShowLocationPicker(true)}
              activeOpacity={1}
            >
              <Ionicons name="location-outline" size={20} color={theme.colors.textMuted} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder={sameLocation ? 'Pickup and Dropoff Location' : 'Pickup Location'}
                placeholderTextColor={theme.colors.textDisabled}
                value={pickupLocation}
                onChangeText={setPickupLocation}
                editable={false}
                onPressIn={() => setShowLocationPicker(true)}
              />
            </TouchableOpacity>

            {/* Dropoff Location Input (conditionally shown when toggle is OFF) */}
            {!sameLocation && (
              <TouchableOpacity
                style={styles.inputWrapperBottom}
                onPress={() => setShowLocationPicker(true)}
                activeOpacity={1}
              >
                <Ionicons name="location-outline" size={20} color={theme.colors.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter dropoff location"
                  placeholderTextColor={theme.colors.textDisabled}
                  value={dropoffLocation}
                  onChangeText={setDropoffLocation}
                  editable={false}
                  onPressIn={() => setShowLocationPicker(true)}
                />
              </TouchableOpacity>
            )}
          </View>

          {/* Same Location Toggle */}
          <View style={styles.toggleWrapper}>
            <Switch
              value={sameLocation}
              onValueChange={setSameLocation}
              trackColor={{ false: theme.colors.border, true: theme.colors.accent }}
              thumbColor={sameLocation ? theme.colors.textPrimary : theme.colors.textMuted}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
            <Text style={styles.toggleLabel}>Return to same location</Text>
          </View>

          {/* Location Picker Modal */}
          <LocationPickerModal
            visible={showLocationPicker}
            onClose={() => setShowLocationPicker(false)}
            onConfirm={handleLocationConfirm}
            initialPickup={pickupLocation}
            initialDropoff={dropoffLocation}
            initialSameLocation={sameLocation}
          />

          {/* Pickup & Dropoff Details */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pickup & Dropoff</Text>
            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={() => setShowDateTimePicker(true)}
            >
              <View style={styles.dateTimeButtonContent}>
                <Ionicons name="calendar-outline" size={20} color={theme.colors.textMuted} />
                <View style={styles.dateTimeTexts}>
                  <Text style={styles.dateTimeMainText}>
                    {pickupDate && dropoffDate
                      ? `${formatDate(pickupDate)} - ${formatDate(dropoffDate)}`
                      : 'Select Dates & Times'}
                  </Text>
                  {pickupDate && dropoffDate && (
                    <Text style={styles.dateTimeSubText}>
                      {pickupTime} → {dropoffTime}
                    </Text>
                  )}
                </View>
                <Ionicons name="chevron-forward" size={20} color={theme.colors.textMuted} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Date Time Picker Modal */}
          <DateTimePickerModal
            visible={showDateTimePicker}
            onClose={() => setShowDateTimePicker(false)}
            onConfirm={handleDateTimeConfirm}
          />

          {/* Driver Age */}
          <View style={styles.inputGroup}>
            <TouchableOpacity
              style={styles.ageButton}
              onPress={() => setShowAgeDropdown(!showAgeDropdown)}
            >
              <View style={styles.ageButtonContent}>
                <Ionicons name="person-outline" size={20} color={theme.colors.textMuted} />
                <View style={styles.ageTexts}>
                  <Text style={styles.ageMainText}>
                    {driverAge || 'Driver Age'}
                  </Text>
                </View>
                <Ionicons
                  name={showAgeDropdown ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={theme.colors.textMuted}
                />
              </View>
            </TouchableOpacity>

            {showAgeDropdown && (
              <View style={styles.ageDropdownMenu}>
                {ageOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.ageDropdownItem}
                    onPress={() => {
                      setDriverAge(option);
                      setShowAgeDropdown(false);
                    }}
                  >
                    <Text style={styles.ageDropdownItemText}>{option}</Text>
                    {driverAge === option && (
                      <Ionicons name="checkmark" size={20} color={theme.colors.accent} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Search Button */}
          <TouchableOpacity
            style={[
              styles.searchButton,
              (!pickupLocation || !pickupDate || !dropoffDate || !driverAge) && styles.searchButtonDisabled
            ]}
            disabled={!pickupLocation || !pickupDate || !dropoffDate || !driverAge}
            onPress={() => {
              if (pickupLocation && pickupDate && dropoffDate) {
                navigation.navigate('Vehicles', {
                  location: pickupLocation,
                  pickupDate,
                  dropoffDate,
                  pickupTime,
                  dropoffTime,
                });
              }
            }}
          >
            <Text style={styles.searchButtonText}>Find Your Car</Text>
            <Ionicons name="arrow-forward" size={20} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textMuted,
    lineHeight: 24,
  },
  form: {
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 16,
    height: 56,
  },
  inputWrapperTop: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
  },
  inputWrapperBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface1,
    borderRadius: 12,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 16,
    height: 56,
    borderTopWidth: 0.5,
    borderTopColor: '#444',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  toggleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  toggleLabel: {
    fontSize: 14,
    color: theme.colors.textMuted,
    fontWeight: '500',
    marginLeft: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  detailsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    flex: 1,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 10,
    height: 44,
  },
  miniIcon: {
    marginRight: 4,
  },
  miniInput: {
    flex: 1,
    fontSize: 13,
    color: theme.colors.textPrimary,
    paddingVertical: 0,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: '#444',
    marginHorizontal: 6,
  },
  ageButton: {
    backgroundColor: theme.colors.surface1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  ageButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ageTexts: {
    flex: 1,
    marginLeft: 12,
  },
  ageMainText: {
    fontSize: 16,
    color: theme.colors.textPrimary,
    fontWeight: '500',
  },
  ageDropdownMenu: {
    backgroundColor: theme.colors.surface1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginTop: 8,
    overflow: 'hidden',
  },
  ageDropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface2,
  },
  ageDropdownItemText: {
    fontSize: 15,
    color: theme.colors.textPrimary,
  },
  dateTimeButton: {
    backgroundColor: theme.colors.surface1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  dateTimeButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateTimeTexts: {
    flex: 1,
    marginLeft: 12,
  },
  dateTimeMainText: {
    fontSize: 16,
    color: theme.colors.textPrimary,
    fontWeight: '500',
  },
  dateTimeSubText: {
    fontSize: 13,
    color: theme.colors.textMuted,
    marginTop: 4,
  },
  searchButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.accent,
    borderRadius: 14,
    paddingVertical: 18,
    marginTop: 16,
    gap: 8,
    shadowColor: theme.colors.accent,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  searchButtonDisabled: {
    backgroundColor: theme.colors.border,
    shadowOpacity: 0,
  },
  searchButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    letterSpacing: 0.5,
  },
});
