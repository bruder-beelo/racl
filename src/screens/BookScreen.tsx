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

export const BookScreen: React.FC = () => {
  const [sameLocation, setSameLocation] = useState(true);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [dropoffTime, setDropoffTime] = useState('');
  const [driverAge, setDriverAge] = useState('');
  const [showAgeDropdown, setShowAgeDropdown] = useState(false);

  const ageOptions = ['18-19', '20-24', '25+'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Book Your Ride</Text>
          <Text style={styles.subtitle}>Get started by filling in the details below</Text>
        </View>

        <View style={styles.form}>
          {/* Location Inputs */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {sameLocation ? 'Pickup and Dropoff Location' : 'Pickup Location'}
            </Text>

            {/* Pickup Location Input */}
            <View style={[styles.inputWrapper, !sameLocation && styles.inputWrapperTop]}>
              <Ionicons name="location-outline" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter pickup location"
                placeholderTextColor="#666"
                value={pickupLocation}
                onChangeText={setPickupLocation}
              />
            </View>

            {/* Dropoff Location Input (conditionally shown when toggle is OFF) */}
            {!sameLocation && (
              <View style={styles.inputWrapperBottom}>
                <Ionicons name="location-outline" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter dropoff location"
                  placeholderTextColor="#666"
                  value={dropoffLocation}
                  onChangeText={setDropoffLocation}
                />
              </View>
            )}
          </View>

          {/* Same Location Toggle */}
          <View style={styles.toggleWrapper}>
            <Switch
              value={sameLocation}
              onValueChange={setSameLocation}
              trackColor={{ false: '#333', true: '#5B67F1' }}
              thumbColor={sameLocation ? '#fff' : '#888'}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
            <Text style={styles.toggleLabel}>Return to same location</Text>
          </View>

          {/* Pickup Details */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pickup Details</Text>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Date</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="calendar-outline" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="MM/DD/YYYY"
                  placeholderTextColor="#666"
                  value={pickupDate}
                  onChangeText={setPickupDate}
                />
              </View>
            </View>

            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Time</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="time-outline" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="HH:MM"
                  placeholderTextColor="#666"
                  value={pickupTime}
                  onChangeText={setPickupTime}
                />
              </View>
            </View>
          </View>

          {/* Dropoff Details */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Dropoff Details</Text>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Date</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="calendar-outline" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="MM/DD/YYYY"
                  placeholderTextColor="#666"
                  value={dropoffDate}
                  onChangeText={setDropoffDate}
                />
              </View>
            </View>

            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Time</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="time-outline" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="HH:MM"
                  placeholderTextColor="#666"
                  value={dropoffTime}
                  onChangeText={setDropoffTime}
                />
              </View>
            </View>
          </View>

          {/* Driver Age Dropdown */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Driver Age</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowAgeDropdown(!showAgeDropdown)}
            >
              <Text style={driverAge ? styles.dropdownTextSelected : styles.dropdownText}>
                {driverAge || 'Select age range'}
              </Text>
              <Ionicons
                name={showAgeDropdown ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#888"
              />
            </TouchableOpacity>

            {showAgeDropdown && (
              <View style={styles.dropdownMenu}>
                {ageOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setDriverAge(option);
                      setShowAgeDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{option}</Text>
                    {driverAge === option && (
                      <Ionicons name="checkmark" size={20} color="#5B67F1" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Search Button */}
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search Available Cars</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    lineHeight: 24,
  },
  form: {
    paddingHorizontal: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#aaa',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
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
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderWidth: 1,
    borderColor: '#333',
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
    color: '#fff',
  },
  toggleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  toggleLabel: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
    marginLeft: 8,
  },
  sectionHeader: {
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    paddingHorizontal: 16,
    height: 56,
  },
  dropdownText: {
    fontSize: 16,
    color: '#666',
  },
  dropdownTextSelected: {
    fontSize: 16,
    color: '#fff',
  },
  dropdownMenu: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    marginTop: 8,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#fff',
  },
  searchButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5B67F1',
    borderRadius: 14,
    paddingVertical: 18,
    marginTop: 16,
    gap: 8,
    shadowColor: '#5B67F1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  searchButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
});
