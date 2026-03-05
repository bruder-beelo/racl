import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { CarWithListings } from '../types';
import { theme } from '../theme/colors';

interface CarCardProps {
  car: CarWithListings;
  onPress: () => void;
  onBook?: () => void;
}

export const CarCard: React.FC<CarCardProps> = ({ car, onPress, onBook }) => {
  const lowestPrice = car.listings.length > 0
    ? Math.min(...car.listings.map(l => l.pricePerDay))
    : 0;

  const closestListing = car.listings.length > 0
    ? car.listings.reduce((closest, current) => {
        const closestDist = parseFloat(closest.distance);
        const currentDist = parseFloat(current.distance);
        return currentDist < closestDist ? current : closest;
      })
    : null;

  const handleBookPress = (e: any) => {
    e.stopPropagation();
    onBook?.();
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: car.image }} style={styles.image} />
      </View>

      <View style={styles.content}>
        <Text style={styles.vendor} numberOfLines={1}>
          {closestListing?.vendor.name || 'Unknown Vendor'}
        </Text>
        <Text style={styles.carName}>{`${car.make} ${car.model} ${car.year}`}</Text>
        <Text style={styles.carSubtitle}>{car.type}</Text>

        <View style={styles.ratingRow}>
          <Text style={styles.rating}>
            <Text style={styles.ratingNumber}>{closestListing?.vendor.rating || '5.0'}</Text>
          </Text>
          <Text style={styles.trips}>
            ({closestListing?.vendor.tripCount || 0} trips)
          </Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>All-Star Host</Text>
          </View>
        </View>

        <View style={styles.priceRow}>
          <View style={styles.priceContainer}>
            <Text style={styles.strikethrough}>${Math.round(lowestPrice * 1.05)}</Text>
            <Text style={styles.price}>${lowestPrice} </Text>
            <Text style={styles.priceLabel}>total</Text>
          </View>
        </View>

        {onBook && (
          <TouchableOpacity style={styles.bookButton} onPress={handleBookPress} activeOpacity={0.8}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface4,
    borderRadius: 0,
    marginBottom: 0,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 420,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 16,
    paddingTop: 12,
  },
  vendor: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.textMuted,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  carName: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  carSubtitle: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingNumber: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.accent,
    marginRight: 6,
  },
  trips: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginRight: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 11,
    color: theme.colors.textMuted,
    fontWeight: '500',
  },
  priceRow: {
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  strikethrough: {
    fontSize: 16,
    color: theme.colors.textDisabled,
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  priceLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  beforeTaxes: {
    fontSize: 13,
    color: theme.colors.textMuted,
  },
  bookButton: {
    backgroundColor: theme.colors.accent,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.textOnAccent,
    letterSpacing: 0.3,
  },
});
