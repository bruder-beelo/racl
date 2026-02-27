import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RangeSlider } from '@react-native-assets/slider';
import { theme } from '../theme/colors';

interface FiltersModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

export interface FilterState {
  priceRange: [number, number];
  transmission: string[];
  passengers: string;
  vehicleTypes: string[];
}

export const FiltersModal: React.FC<FiltersModalProps> = ({
  visible,
  onClose,
  onApply,
  initialFilters,
}) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [transmission, setTransmission] = useState<string[]>([]);
  const [passengers, setPassengers] = useState<string>('Any');
  const [vehicleTypes, setVehicleTypes] = useState<string[]>([]);

  // Reset filters when modal opens
  useEffect(() => {
    if (visible && initialFilters) {
      setPriceRange(initialFilters.priceRange);
      setTransmission(initialFilters.transmission);
      setPassengers(initialFilters.passengers);
      setVehicleTypes(initialFilters.vehicleTypes);
    }
  }, [visible, initialFilters]);

  const transmissionOptions = ['Automatic', 'Manual'];
  const passengerOptions = ['Any', '2+', '4+', '6+'];
  const vehicleTypeOptions = ['Budget', 'Standard', 'Luxury', 'SUV', 'Sporty'];

  const toggleTransmission = (option: string) => {
    if (transmission.includes(option)) {
      setTransmission(transmission.filter(t => t !== option));
    } else {
      setTransmission([...transmission, option]);
    }
  };

  const toggleVehicleType = (option: string) => {
    if (vehicleTypes.includes(option)) {
      setVehicleTypes(vehicleTypes.filter(v => v !== option));
    } else {
      setVehicleTypes([...vehicleTypes, option]);
    }
  };

  const handleApply = () => {
    onApply({
      priceRange,
      transmission,
      passengers,
      vehicleTypes,
    });
    onClose();
  };

  const handleReset = () => {
    setPriceRange([0, 500]);
    setTransmission([]);
    setPassengers('Any');
    setVehicleTypes([]);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={theme.colors.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Filters</Text>
            <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Price Range */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Price per Day</Text>

              {/* Range Slider */}
              <View style={styles.rangeSliderContainer}>
                <RangeSlider
                  range={priceRange}
                  minimumValue={0}
                  maximumValue={500}
                  step={10}
                  onValueChange={(value) => setPriceRange(value)}
                  outboundColor={theme.colors.border}
                  inboundColor={theme.colors.accent}
                  thumbTintColor={theme.colors.accent}
                  thumbStyle={styles.thumb}
                  trackStyle={styles.track}
                />
              </View>

              {/* Price Labels */}
              <View style={styles.priceLabels}>
                <View style={styles.priceValueContainer}>
                  <Text style={styles.priceLabel}>Minimum</Text>
                  <Text style={styles.priceValue}>${priceRange[0]}</Text>
                </View>
                <View style={styles.priceValueContainer}>
                  <Text style={styles.priceLabel}>Maximum</Text>
                  <Text style={styles.priceValue}>${priceRange[1]}</Text>
                </View>
              </View>
            </View>

            {/* Transmission */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Transmission</Text>
              <View style={styles.optionsGrid}>
                {transmissionOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionChip,
                      transmission.includes(option) && styles.optionChipSelected,
                    ]}
                    onPress={() => toggleTransmission(option)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        transmission.includes(option) && styles.optionTextSelected,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Passengers */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Passengers</Text>
              <View style={styles.optionsGrid}>
                {passengerOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionChip,
                      passengers === option && styles.optionChipSelected,
                    ]}
                    onPress={() => setPassengers(option)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        passengers === option && styles.optionTextSelected,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Vehicle Type */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Vehicle Type</Text>
              <View style={styles.optionsGrid}>
                {vehicleTypeOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionChip,
                      vehicleTypes.includes(option) && styles.optionChipSelected,
                    ]}
                    onPress={() => toggleVehicleType(option)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        vehicleTypes.includes(option) && styles.optionTextSelected,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Apply Button */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.scrim,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: theme.colors.surface1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  resetButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  resetText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.accent,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 12,
  },
  priceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  priceValueContainer: {
    alignItems: 'center',
    gap: 2,
  },
  priceLabel: {
    fontSize: 11,
    color: theme.colors.textMuted,
    fontWeight: '500',
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.accent,
  },
  rangeSliderContainer: {
    paddingHorizontal: 12,
    paddingVertical: 30,
  },
  track: {
    height: 4,
    borderRadius: 2,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.accent,
    borderWidth: 0,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionChip: {
    backgroundColor: theme.colors.surface3,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  optionChipSelected: {
    backgroundColor: theme.colors.accent,
    borderColor: theme.colors.accent,
  },
  optionText: {
    fontSize: 14,
    color: theme.colors.textMuted,
    fontWeight: '500',
  },
  optionTextSelected: {
    color: theme.colors.textPrimary,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  applyButton: {
    backgroundColor: theme.colors.accent,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: theme.colors.accent,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  applyButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    letterSpacing: 0.5,
  },
});
