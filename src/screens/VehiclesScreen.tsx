import React, { useState, useMemo } from 'react';
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
import { theme } from '../theme/colors';

type VehiclesScreenRouteProp = RouteProp<RootStackParamList, 'Vehicles'>;
type VehiclesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Vehicles'>;

export const VehiclesScreen: React.FC = () => {
  const navigation = useNavigation<VehiclesScreenNavigationProp>();
  const route = useRoute<VehiclesScreenRouteProp>();
  const { location, pickupDate, dropoffDate } = route.params;

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 500],
    transmission: [],
    passengers: 'Any',
    vehicleTypes: [],
  });

  const carsWithListings = useMemo(() => getCarsWithListings(), []);

  // Convert ISO string dates to Date objects
  const pickupDateObj = new Date(pickupDate);
  const dropoffDateObj = new Date(dropoffDate);

  // Calculate number of days
  const daysDiff = Math.max(1, Math.ceil((dropoffDateObj.getTime() - pickupDateObj.getTime()) / (1000 * 60 * 60 * 24)));
  const days = daysDiff === 1 ? '1 day' : `${daysDiff} days`;

  // Apply filters
  const filteredCars = useMemo(() => {
    return carsWithListings.filter(car => {
      // Price filter
      const minPrice = car.listings.length > 0 ? car.listings[0].pricePerDay : 0;
      if (minPrice < filters.priceRange[0] || minPrice > filters.priceRange[1]) {
        return false;
      }

      // Transmission filter
      if (filters.transmission.length > 0 && !filters.transmission.includes(car.specs.transmission)) {
        return false;
      }

      // Passengers filter
      if (filters.passengers !== 'Any') {
        const requiredSeats = parseInt(filters.passengers.replace('+', ''));
        if (car.specs.seats < requiredSeats) {
          return false;
        }
      }

      // Vehicle type filter
      if (filters.vehicleTypes.length > 0 && !filters.vehicleTypes.includes(car.category)) {
        return false;
      }

      return true;
    });
  }, [carsWithListings, filters]);

  const renderVehicleCard = ({ item }: { item: typeof carsWithListings[0] }) => {
    const minPrice = item.listings.length > 0 ? item.listings[0].pricePerDay : 0;
    const totalPrice = minPrice * daysDiff;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('CarDetails', { car: item })}
      >
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
              <Ionicons name="people-outline" size={16} color={theme.colors.textMuted} />
              <Text style={styles.specText}>{item.specs.seats} seats</Text>
            </View>
            <View style={styles.specItem}>
              <Ionicons name="speedometer-outline" size={16} color={theme.colors.textMuted} />
              <Text style={styles.specText}>{item.specs.transmission}</Text>
            </View>
            <View style={styles.specItem}>
              <Ionicons name="flash-outline" size={16} color={theme.colors.textMuted} />
              <Text style={styles.specText}>{item.specs.fuelType}</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <View>
              <Text style={styles.totalPrice}>${totalPrice}</Text>
              <Text style={styles.totalLabel}>total</Text>
            </View>
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
          <Ionicons name="arrow-back" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Choose Your Car</Text>
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilters(true)}>
          <Ionicons name="options-outline" size={24} color={theme.colors.textPrimary} />
          <Text style={styles.filterText}>Filters</Text>
        </TouchableOpacity>
      </View>

      {/* Summary */}
      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Ionicons name="location-outline" size={16} color={theme.colors.textMuted} />
          <Text style={styles.summaryText}>{location}</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Ionicons name="calendar-outline" size={16} color={theme.colors.textMuted} />
          <Text style={styles.summaryText}>{days}</Text>
        </View>
      </View>

      {/* Vehicle List */}
      {filteredCars.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="car-outline" size={64} color={theme.colors.border} />
          <Text style={styles.emptyTitle}>No vehicles match your filters</Text>
          <Text style={styles.emptySubtitle}>Try adjusting your search criteria</Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => setShowFilters(true)}
          >
            <Text style={styles.emptyButtonText}>Adjust Filters</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredCars}
          renderItem={renderVehicleCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

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
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
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
    color: theme.colors.textPrimary,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.surface3,
    gap: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  summaryText: {
    fontSize: 14,
    color: theme.colors.textPrimary,
    fontWeight: '500',
  },
  summaryDivider: {
    width: 1,
    height: 16,
    backgroundColor: theme.colors.border,
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: theme.colors.surface1,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  carImage: {
    width: '100%',
    height: 200,
    backgroundColor: theme.colors.surface3,
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
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  carCategory: {
    fontSize: 14,
    color: theme.colors.textMuted,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.accent,
  },
  priceLabel: {
    fontSize: 12,
    color: theme.colors.textMuted,
  },
  specs: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.surface2,
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  specText: {
    fontSize: 13,
    color: theme.colors.textMuted,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.surface2,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  totalLabel: {
    fontSize: 12,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  vendors: {
    fontSize: 13,
    color: theme.colors.textMuted,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 15,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
});
