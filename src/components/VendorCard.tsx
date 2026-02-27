import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Vendor, CarListing } from '../types';
import { theme } from '../theme/colors';

interface VendorCardProps {
  vendor: Vendor;
  listing: CarListing;
  onBook: () => void;
}

export const VendorCard: React.FC<VendorCardProps> = ({ vendor, listing, onBook }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleBook = async () => {
    setIsLoading(true);
    await onBook();
    setIsLoading(false);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.vendorInfo}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{vendor.name.charAt(0)}</Text>
          </View>
          <View style={styles.vendorDetails}>
            <Text style={styles.vendorName}>{vendor.name}</Text>
            <View style={styles.statsRow}>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>{vendor.rating}</Text>
                <Text style={styles.reviewCount}>({vendor.reviewCount} reviews)</Text>
              </View>
            </View>
            <Text style={styles.trips}>{vendor.tripCount} trips</Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Location</Text>
          <Text style={styles.detailValue}>{vendor.location}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Distance</Text>
          <Text style={styles.detailValue}>{listing.distance} away</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Response time</Text>
          <Text style={styles.detailValue}>{vendor.responseTime}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${listing.pricePerDay}</Text>
          <Text style={styles.priceLabel}>/day</Text>
        </View>
        <TouchableOpacity
          style={[styles.bookButton, isLoading && styles.bookButtonDisabled]}
          onPress={handleBook}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <ActivityIndicator color={theme.colors.textPrimary} size="small" />
          ) : (
            <Text style={styles.bookButtonText}>Book now</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  header: {
    marginBottom: 16,
  },
  vendorInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: theme.colors.textPrimary,
    fontSize: 20,
    fontWeight: '600',
  },
  vendorDetails: {
    flex: 1,
  },
  vendorName: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.accent,
    marginRight: 4,
  },
  reviewCount: {
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
  trips: {
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginBottom: 16,
  },
  details: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: theme.colors.textMuted,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.textPrimary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  priceLabel: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
  bookButton: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 8,
    minHeight: 48,
    minWidth: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookButtonDisabled: {
    backgroundColor: theme.colors.accentHover,
    opacity: 0.7,
  },
  bookButtonText: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});
