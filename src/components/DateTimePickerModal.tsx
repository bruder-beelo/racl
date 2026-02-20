import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
      onConfirm(selectedPickupDate, selectedDropoffDate, pickupTime, dropoffTime);
      onClose();
    }
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
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
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Select Dates & Times</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Month Navigation */}
            <View style={styles.monthNav}>
              <TouchableOpacity onPress={prevMonth} style={styles.navButton}>
                <Ionicons name="chevron-back" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.monthText}>
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </Text>
              <TouchableOpacity onPress={nextMonth} style={styles.navButton}>
                <Ionicons name="chevron-forward" size={24} color="#fff" />
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
              <Ionicons name="arrow-forward" size={20} color="#888" />
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
                  {timeOptions.map((time) => (
                    <TouchableOpacity
                      key={time}
                      style={[
                        styles.timeChip,
                        dropoffTime === time && styles.timeChipSelected,
                      ]}
                      onPress={() => setDropoffTime(time)}
                    >
                      <Text
                        style={[
                          styles.timeChipText,
                          dropoffTime === time && styles.timeChipTextSelected,
                        ]}
                      >
                        {time}
                      </Text>
                    </TouchableOpacity>
                  ))}
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
    color: '#fff',
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
    color: '#888',
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
    backgroundColor: '#5B67F1',
    borderRadius: 8,
  },
  rangeDay: {
    backgroundColor: 'rgba(91, 103, 241, 0.2)',
  },
  pastDay: {
    opacity: 0.3,
  },
  dayText: {
    fontSize: 14,
    color: '#fff',
  },
  selectedDayText: {
    fontWeight: '700',
    color: '#fff',
  },
  pastDayText: {
    color: '#555',
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
    color: '#888',
    marginBottom: 4,
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
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
    color: '#aaa',
    marginBottom: 10,
  },
  timeScroll: {
    flexGrow: 0,
  },
  timeScrollContent: {
    gap: 8,
  },
  timeChip: {
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  timeChipSelected: {
    backgroundColor: '#5B67F1',
    borderColor: '#5B67F1',
  },
  timeChipText: {
    fontSize: 14,
    color: '#888',
  },
  timeChipTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#5B67F1',
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 18,
    borderRadius: 14,
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
  confirmButtonDisabled: {
    backgroundColor: '#333',
    shadowOpacity: 0,
  },
  confirmButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
});
