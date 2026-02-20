import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { getCarsWithListings } from '../data/mockData';
import { FiltersModal, FilterState } from '../components/FiltersModal';

type VehiclesScreenRouteProp = RouteProp<RootStackParamList, 'Vehicles'>;
type VehiclesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Vehicles'>;

export const VehiclesScreen: React.FC = () => {
  const navigation = useNavigation<VehiclesScreenNavigationProp>();
  const route = useRoute<VehiclesScreenRouteProp>();
  const { location, pickupDate, dropoffDate, pickupTime, dropoffTime } = route.params;

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 500],
    transmission: [],
    passengers: 'Any',
    vehicleTypes: [],
  });

  const carsWithListings = getCarsWithListings();

  // Calculate number of days
  const daysDiff = Math.ceil((dropoffDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24));
  const days = daysDiff === 1 ? '1 day' : `${daysDiff} days`;

  const renderVehicleCard = ({ item }: { item: typeof carsWithListings[0] }) => {
    const minPrice = item.listings.length > 0 ? item.listings[0].pricePerDay : 0;
    const totalPrice = minPrice * daysDiff;

    return (
      <TouchableOpacity style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.carImage} />
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.carName}>{item.make} {item.model}</Text>
              <Text style={styles.carCategory}>{item.category} • {item.type}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${minPrice}</Text>
              <Text style={styles.priceLabel}>/day</Text>
            </View>
          </View>

          <View style={styles.specs}>
            <View style={styles.specItem}>
              <Ionicons name="people-outline" size={16} color="#888" />
              <Text style={styles.specText}>{item.specs.seats} seats</Text>
            </View>
            <View style={styles.specItem}>
              <Ionicons name="speedometer-outline" size={16} color="#888" />
              <Text style={styles.specText}>{item.specs.transmission}</Text>
            </View>
            <View style={styles.specItem}>
              <Ionicons name="flash-outline" size={16} color="#888" />
              <Text style={styles.specText}>{item.specs.fuelType}</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.totalPrice}>Total: ${totalPrice}</Text>
            <Text style={styles.vendors}>{item.listings.length} vendors</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Available Vehicles</Text>
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilters(true)}>
          <Ionicons name="options-outline" size={24} color="#fff" />
          <Text style={styles.filterText}>Filters</Text>
        </TouchableOpacity>
      </View>

      {/* Summary */}
      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Ionicons name="location-outline" size={16} color="#888" />
          <Text style={styles.summaryText}>{location}</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Ionicons name="calendar-outline" size={16} color="#888" />
          <Text style={styles.summaryText}>{days}</Text>
        </View>
      </View>

      {/* Vehicle List */}
      <FlatList
        data={carsWithListings}
        renderItem={renderVehicleCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Filters Modal */}
      <FiltersModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        onApply={(newFilters) => setFilters(newFilters)}
        initialFilters={filters}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#0d0d0d',
    gap: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  summaryText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  summaryDivider: {
    width: 1,
    height: 16,
    backgroundColor: '#333',
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
  },
  carImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#0d0d0d',
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  carName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  carCategory: {
    fontSize: 14,
    color: '#888',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#5B67F1',
  },
  priceLabel: {
    fontSize: 12,
    color: '#888',
  },
  specs: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  specText: {
    fontSize: 13,
    color: '#888',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  vendors: {
    fontSize: 13,
    color: '#888',
  },
});
