import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Vendor, CarListing } from '../types';

interface VendorCardProps {
  vendor: Vendor;
  listing: CarListing;
  onBook: () => void;
}

export const VendorCard: React.FC<VendorCardProps> = ({ vendor, listing, onBook }) => {
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
                <Text style={styles.star}>★</Text>
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
        <TouchableOpacity style={styles.bookButton} onPress={onBook}>
          <Text style={styles.bookButtonText}>Book now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
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
    backgroundColor: '#5B67F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  vendorDetails: {
    flex: 1,
  },
  vendorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
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
  star: {
    color: '#5B67F1',
    fontSize: 14,
    marginRight: 2,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginRight: 4,
  },
  reviewCount: {
    fontSize: 13,
    color: '#aaa',
  },
  trips: {
    fontSize: 13,
    color: '#aaa',
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
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
    color: '#888',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
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
    color: '#fff',
  },
  priceLabel: {
    fontSize: 14,
    color: '#aaa',
    marginLeft: 4,
  },
  bookButton: {
    backgroundColor: '#5B67F1',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
