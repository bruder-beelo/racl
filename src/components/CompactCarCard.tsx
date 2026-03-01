import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CarWithListings } from '../types';
import { theme } from '../theme/colors';

interface CompactCarCardProps {
  car: CarWithListings;
  onPress: () => void;
  onBook?: () => void;
}

export const CompactCarCard: React.FC<CompactCarCardProps> = ({ car, onPress, onBook }) => {
  const listing = car.listings?.[0];

  // Guard: Return null if no listing available
  if (!listing) {
    return null;
  }

  const handleBookPress = (e: any) => {
    e.stopPropagation();
    onBook?.();
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: car.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.vendor} numberOfLines={1}>
          {listing.vendor.name}
        </Text>
        <Text style={styles.name} numberOfLines={1}>
          {car.make} {car.model}
        </Text>
        <Text style={styles.type} numberOfLines={1}>
          {car.type}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${listing.pricePerDay}</Text>
          <Text style={styles.priceLabel}>/day</Text>
        </View>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color={theme.colors.accent} />
          <Text style={styles.rating}>{listing.vendor.rating}</Text>
          <Text style={styles.reviews}>({listing.vendor.reviewCount})</Text>
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
    width: 280,
    backgroundColor: theme.colors.surface1,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: theme.colors.surface3,
  },
  info: {
    padding: 16,
  },
  vendor: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.textMuted,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  type: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.accent,
  },
  priceLabel: {
    fontSize: 14,
    color: theme.colors.textMuted,
    marginLeft: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  reviews: {
    fontSize: 14,
    color: theme.colors.textMuted,
  },
  bookButton: {
    backgroundColor: theme.colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  bookButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.textOnAccent,
    letterSpacing: 0.3,
  },
});
