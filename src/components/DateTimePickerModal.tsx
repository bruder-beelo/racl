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
import { theme } from '../theme/colors';

interface DateTimePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (pickupDate: Date, dropoffDate: Date, pickupTime: string, dropoffTime: string) => void;
}

export const DateTimePickerModal: React.FC<DateTimePickerModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  const [selectedPickupDate, setSelectedPickupDate] = useState<Date | null>(null);
  const [selectedDropoffDate, setSelectedDropoffDate] = useState<Date | null>(null);
  const [pickupTime, setPickupTime] = useState('10:00 AM');
  const [dropoffTime, setDropoffTime] = useState('10:00 AM');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Reset state when modal becomes visible
  useEffect(() => {
    if (visible) {
      setSelectedPickupDate(null);
      setSelectedDropoffDate(null);
      setPickupTime('10:00 AM');
      setDropoffTime('10:00 AM');
      setCurrentMonth(new Date());
    }
  }, [visible]);

  const timeOptions = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
    '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM',
  ];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    // Add empty slots for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const handleDatePress = (date: Date) => {
    if (!selectedPickupDate) {
      setSelectedPickupDate(date);
    } else if (!selectedDropoffDate) {
      if (date >= selectedPickupDate) {
        setSelectedDropoffDate(date);
      } else {
        setSelectedPickupDate(date);
        setSelectedDropoffDate(null);
      }
    } else {
      setSelectedPickupDate(date);
      setSelectedDropoffDate(null);
    }
  };

  const handleConfirm = () => {
    if (selectedPickupDate && selectedDropoffDate) {
      // Check if same day booking
      const isSameDay = selectedPickupDate.toDateString() === selectedDropoffDate.toDateString();

      // Validate dropoff time is after pickup time on same day
      if (isSameDay) {
        const pickupIndex = timeOptions.indexOf(pickupTime);
        const dropoffIndex = timeOptions.indexOf(dropoffTime);

        if (dropoffIndex <= pickupIndex) {
          // Don't confirm - validation will prevent this
          return;
        }
      }

      onConfirm(selectedPickupDate, selectedDropoffDate, pickupTime, dropoffTime);
      onClose();
    }
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    const today = new Date();
    const isAtCurrentMonth = currentMonth.getFullYear() === today.getFullYear() &&
                             currentMonth.getMonth() === today.getMonth();

    // Don't allow navigating to past months
    if (isAtCurrentMonth) {
      return;
    }

    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const isDateInRange = (date: Date) => {
    if (!selectedPickupDate || !selectedDropoffDate) return false;
    return date >= selectedPickupDate && date <= selectedDropoffDate;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Select';
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const today = new Date();
  const isAtCurrentMonth = currentMonth.getFullYear() === today.getFullYear() &&
                           currentMonth.getMonth() === today.getMonth();

  const days = getDaysInMonth(currentMonth);

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
            <Text style={styles.headerTitle}>Select Dates & Times</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Month Navigation */}
            <View style={styles.monthNav}>
              <TouchableOpacity
                onPress={prevMonth}
                style={styles.navButton}
                disabled={isAtCurrentMonth}
              >
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color={isAtCurrentMonth ? theme.colors.textDark : theme.colors.textPrimary}
                />
              </TouchableOpacity>
              <Text style={styles.monthText}>
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </Text>
              <TouchableOpacity onPress={nextMonth} style={styles.navButton}>
                <Ionicons name="chevron-forward" size={24} color={theme.colors.textPrimary} />
              </TouchableOpacity>
            </View>

            {/* Day Headers */}
            <View style={styles.dayHeaders}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <Text key={index} style={styles.dayHeader}>
                  {day}
                </Text>
              ))}
            </View>

            {/* Calendar Grid */}
            <View style={styles.calendar}>
              {days.map((date, index) => {
                const isPickup = date && selectedPickupDate && date.toDateString() === selectedPickupDate.toDateString();
                const isDropoff = date && selectedDropoffDate && date.toDateString() === selectedDropoffDate.toDateString();
                const inRange = date && isDateInRange(date);
                const isPast = date && date < new Date(new Date().setHours(0, 0, 0, 0));

                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dayCell,
                      !date && styles.emptyCell,
                      (isPickup || isDropoff) && styles.selectedDay,
                      inRange && !isPickup && !isDropoff && styles.rangeDay,
                      isPast && styles.pastDay,
                    ]}
                    onPress={() => date && !isPast && handleDatePress(date)}
                    disabled={!date || isPast}
                  >
                    {date && (
                      <Text
                        style={[
                          styles.dayText,
                          (isPickup || isDropoff) && styles.selectedDayText,
                          isPast && styles.pastDayText,
                        ]}
                      >
                        {date.getDate()}
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Selected Dates Display */}
            <View style={styles.selectedDatesRow}>
              <View style={styles.selectedDateBox}>
                <Text style={styles.selectedDateLabel}>Pickup</Text>
                <Text style={styles.selectedDateText}>{formatDate(selectedPickupDate)}</Text>
              </View>
              <Ionicons name="arrow-forward" size={20} color={theme.colors.textMuted} />
              <View style={styles.selectedDateBox}>
                <Text style={styles.selectedDateLabel}>Dropoff</Text>
                <Text style={styles.selectedDateText}>{formatDate(selectedDropoffDate)}</Text>
              </View>
            </View>

            {/* Time Selection */}
            <View style={styles.timeSection}>
              <View style={styles.timeRow}>
                <Text style={styles.timeLabel}>Pickup Time</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.timeScroll}
                  contentContainerStyle={styles.timeScrollContent}
                >
                  {timeOptions.map((time) => (
                    <TouchableOpacity
                      key={time}
                      style={[
                        styles.timeChip,
                        pickupTime === time && styles.timeChipSelected,
                      ]}
                      onPress={() => setPickupTime(time)}
                    >
                      <Text
                        style={[
                          styles.timeChipText,
                          pickupTime === time && styles.timeChipTextSelected,
                        ]}
                      >
                        {time}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.timeRow}>
                <Text style={styles.timeLabel}>Dropoff Time</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.timeScroll}
                  contentContainerStyle={styles.timeScrollContent}
                >
                  {timeOptions.map((time) => {
                    // Check if same day booking
                    const isSameDay = selectedPickupDate && selectedDropoffDate &&
                      selectedPickupDate.toDateString() === selectedDropoffDate.toDateString();

                    // Disable times that are before or equal to pickup time on same day
                    const pickupIndex = timeOptions.indexOf(pickupTime);
                    const currentIndex = timeOptions.indexOf(time);
                    const isDisabled = isSameDay && currentIndex <= pickupIndex;

                    return (
                      <TouchableOpacity
                        key={time}
                        style={[
                          styles.timeChip,
                          dropoffTime === time && styles.timeChipSelected,
                          isDisabled && styles.timeChipDisabled,
                        ]}
                        onPress={() => !isDisabled && setDropoffTime(time)}
                        disabled={isDisabled}
                      >
                        <Text
                          style={[
                            styles.timeChipText,
                            dropoffTime === time && styles.timeChipTextSelected,
                            isDisabled && styles.timeChipTextDisabled,
                          ]}
                        >
                          {time}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </ScrollView>

          {/* Confirm Button */}
          <TouchableOpacity
            style={[
              styles.confirmButton,
              (!selectedPickupDate || !selectedDropoffDate) && styles.confirmButtonDisabled,
            ]}
            onPress={handleConfirm}
            disabled={!selectedPickupDate || !selectedDropoffDate}
          >
            <Text style={styles.confirmButtonText}>Confirm Dates & Times</Text>
          </TouchableOpacity>
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
  monthNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  navButton: {
    padding: 8,
  },
  monthText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  dayHeaders: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  dayHeader: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textMuted,
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  emptyCell: {
    backgroundColor: 'transparent',
  },
  selectedDay: {
    backgroundColor: theme.colors.accent,
    borderRadius: 8,
  },
  rangeDay: {
    backgroundColor: theme.colors.accentLight,
  },
  pastDay: {
    opacity: 0.3,
  },
  dayText: {
    fontSize: 14,
    color: theme.colors.textPrimary,
  },
  selectedDayText: {
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  pastDayText: {
    color: theme.colors.textDark,
  },
  selectedDatesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
  },
  selectedDateBox: {
    alignItems: 'center',
  },
  selectedDateLabel: {
    fontSize: 12,
    color: theme.colors.textMuted,
    marginBottom: 4,
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  timeSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  timeRow: {
    marginBottom: 20,
  },
  timeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    marginBottom: 10,
  },
  timeScroll: {
    flexGrow: 0,
  },
  timeScrollContent: {
    gap: 8,
  },
  timeChip: {
    backgroundColor: theme.colors.surface2,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  timeChipSelected: {
    backgroundColor: theme.colors.accent,
    borderColor: theme.colors.accent,
  },
  timeChipDisabled: {
    backgroundColor: theme.colors.surface1,
    borderColor: theme.colors.borderLight,
    opacity: 0.4,
  },
  timeChipText: {
    fontSize: 14,
    color: theme.colors.textMuted,
  },
  timeChipTextSelected: {
    color: theme.colors.textPrimary,
    fontWeight: '600',
  },
  timeChipTextDisabled: {
    color: theme.colors.textDark,
  },
  confirmButton: {
    backgroundColor: theme.colors.accent,
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 18,
    borderRadius: 14,
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
  confirmButtonDisabled: {
    backgroundColor: theme.colors.border,
    shadowOpacity: 0,
  },
  confirmButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    letterSpacing: 0.5,
  },
});
