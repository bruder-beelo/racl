import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/colors';

interface LocationPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (pickup: string, dropoff: string, sameLocation: boolean) => void;
  initialPickup?: string;
  initialDropoff?: string;
  initialSameLocation?: boolean;
}

export const LocationPickerModal: React.FC<LocationPickerModalProps> = ({
  visible,
  onClose,
  onConfirm,
  initialPickup = '',
  initialDropoff = '',
  initialSameLocation = true,
}) => {
  const [pickupLocation, setPickupLocation] = useState(initialPickup);
  const [dropoffLocation, setDropoffLocation] = useState(initialDropoff);
  const [sameLocation, setSameLocation] = useState(initialSameLocation);

  // Sync state with props when modal becomes visible
  useEffect(() => {
    if (visible) {
      setPickupLocation(initialPickup);
      setDropoffLocation(initialDropoff);
      setSameLocation(initialSameLocation);
    }
  }, [visible, initialPickup, initialDropoff, initialSameLocation]);

  const handleConfirm = () => {
    if (pickupLocation.trim()) {
      onConfirm(
        pickupLocation,
        sameLocation ? pickupLocation : dropoffLocation,
        sameLocation
      );
      onClose();
    }
  };

  const handleClose = () => {
    setPickupLocation(initialPickup);
    setDropoffLocation(initialDropoff);
    setSameLocation(initialSameLocation);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={theme.colors.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Select Location</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Search Bar */}
            <View style={styles.searchWrapper}>
              <Ionicons name="search-outline" size={20} color={theme.colors.textMuted} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search location..."
                placeholderTextColor={theme.colors.textDisabled}
                value={pickupLocation}
                onChangeText={setPickupLocation}
                autoFocus
              />
            </View>

            {/* Use Current Location Button */}
            <TouchableOpacity
              style={styles.currentLocationButton}
              onPress={() => {
                setPickupLocation('Boston, MA');
                onConfirm('Boston, MA', sameLocation ? 'Boston, MA' : dropoffLocation, sameLocation);
                onClose();
              }}
            >
              <Ionicons name="navigate" size={20} color={theme.colors.accent} />
              <Text style={styles.currentLocationText}>Use My Current Location</Text>
            </TouchableOpacity>

            {/* Empty space for search results */}
            <View style={{ height: 400 }} />
          </ScrollView>
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
  placeholder: {
    width: 40,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginHorizontal: 20,
    marginTop: 0,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.textPrimary,
    padding: 0,
  },
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  currentLocationText: {
    fontSize: 15,
    color: theme.colors.textPrimary,
    fontWeight: '500',
  },
});
