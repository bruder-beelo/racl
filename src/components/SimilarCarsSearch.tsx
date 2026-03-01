import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/colors';
import { Car } from '../types';

interface SimilarCarsSearchProps {
  car: Car;
  onSearch: () => void;
}

export const SimilarCarsSearch: React.FC<SimilarCarsSearchProps> = ({ car, onSearch }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="search-outline" size={24} color={theme.colors.textSecondary} />
        <View style={styles.headerText}>
          <Text style={styles.title}>Looking for better options?</Text>
          <Text style={styles.subtitle}>
            Search for similar {car.make} {car.model} from other vendors
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.searchButton} onPress={onSearch} activeOpacity={0.8}>
        <Ionicons name="compass-outline" size={20} color={theme.colors.textOnAccent} />
        <Text style={styles.searchButtonText}>Find Similar Cars</Text>
        <Ionicons name="arrow-forward" size={18} color={theme.colors.textOnAccent} />
      </TouchableOpacity>

      <View style={styles.features}>
        <View style={styles.feature}>
          <Ionicons name="checkmark-circle" size={16} color={theme.colors.accent} />
          <Text style={styles.featureText}>Compare prices</Text>
        </View>
        <View style={styles.feature}>
          <Ionicons name="checkmark-circle" size={16} color={theme.colors.accent} />
          <Text style={styles.featureText}>Multiple vendors</Text>
        </View>
        <View style={styles.feature}>
          <Ionicons name="checkmark-circle" size={16} color={theme.colors.accent} />
          <Text style={styles.featureText}>Best deals</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface1,
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  searchButton: {
    backgroundColor: theme.colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 16,
  },
  searchButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.textOnAccent,
    letterSpacing: 0.3,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 8,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featureText: {
    fontSize: 13,
    color: theme.colors.textMuted,
    fontWeight: '500',
  },
});
