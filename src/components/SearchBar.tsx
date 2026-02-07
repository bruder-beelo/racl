import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

interface SearchBarProps {
  onLocationPress?: () => void;
  onDatePress?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onLocationPress, onDatePress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.inputContainer} onPress={onLocationPress}>
        <Text style={styles.label}>Location</Text>
        <Text style={styles.value}>San Francisco, CA</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity style={styles.inputContainer} onPress={onDatePress}>
        <Text style={styles.label}>Dates</Text>
        <Text style={styles.value}>Select dates</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.searchButton}>
        <Text style={styles.searchIcon}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  inputContainer: {
    flex: 1,
    paddingVertical: 4,
  },
  label: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
    fontWeight: '500',
  },
  value: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '500',
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: '#333',
    marginHorizontal: 12,
  },
  searchButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#5B67F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  searchIcon: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
});
