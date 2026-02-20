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
import Slider from '@react-native-community/slider';

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
              <Ionicons name="close" size={24} color="#fff" />
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

              {/* Dual Range Slider */}
              <View style={styles.rangeSliderContainer}>
                {/* Background Track */}
                <View style={styles.sliderTrack} pointerEvents="none">
                  <View
                    style={[
                      styles.sliderTrackFilled,
                      {
                        left: `${(priceRange[0] / 500) * 100}%`,
                        right: `${100 - (priceRange[1] / 500) * 100}%`
                      }
                    ]}
                  />
                </View>
                {/* Max Slider - rendered first so min slider is on top */}
                <Slider
                  style={[styles.rangeSlider, { zIndex: 1 }]}
                  minimumValue={priceRange[0] + 10}
                  maximumValue={500}
                  step={10}
                  value={priceRange[1]}
                  onValueChange={(value) => setPriceRange([priceRange[0], value])}
                  minimumTrackTintColor="transparent"
                  maximumTrackTintColor="transparent"
                  thumbTintColor="#5B67F1"
                />
                {/* Min Slider - rendered last to be on top */}
                <Slider
                  style={[styles.rangeSlider, { zIndex: 2 }]}
                  minimumValue={0}
                  maximumValue={priceRange[1] - 10}
                  step={10}
                  value={priceRange[0]}
                  onValueChange={(value) => setPriceRange([value, priceRange[1]])}
                  minimumTrackTintColor="transparent"
                  maximumTrackTintColor="transparent"
                  thumbTintColor="#5B67F1"
                />
              </View>

              {/* Price Labels Below */}
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#1a1a1a',
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
    color: '#fff',
  },
  resetButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  resetText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5B67F1',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
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
    color: '#888',
    fontWeight: '500',
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5B67F1',
  },
  rangeSliderContainer: {
    height: 40,
    position: 'relative',
    paddingHorizontal: 0,
  },
  sliderTrack: {
    position: 'absolute',
    top: '50%',
    left: 8,
    right: 8,
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    marginTop: -2,
  },
  sliderTrackFilled: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: '#5B67F1',
    borderRadius: 2,
  },
  rangeSlider: {
    position: 'absolute',
    width: '100%',
    height: 40,
    left: 0,
    right: 0,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionChip: {
    backgroundColor: '#0d0d0d',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  optionChipSelected: {
    backgroundColor: '#5B67F1',
    borderColor: '#5B67F1',
  },
  optionText: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  applyButton: {
    backgroundColor: '#5B67F1',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#5B67F1',
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
    color: '#fff',
    letterSpacing: 0.5,
  },
});
