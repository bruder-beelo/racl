import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { CarCard } from '../components/CarCard';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { getCarsWithListings } from '../data/mockData';
import { CarWithListings } from '../types';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CATEGORIES = ['All', 'Economy', 'Luxury', 'SUV', 'Electric', 'Adventure', 'Sports'];

export const BrowseScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const allCars = getCarsWithListings();

  const filteredCars = selectedCategory === 'All'
    ? allCars
    : allCars.filter(car => car.category === selectedCategory || car.type === selectedCategory);

  const handleCarPress = (car: CarWithListings) => {
    navigation.navigate('CarDetails', { car });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <SearchBar />

      <CategoryFilter
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {filteredCars.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="car-sport-outline" size={64} color="#333" />
          <Text style={styles.emptyTitle}>No vehicles in this category</Text>
          <Text style={styles.emptySubtitle}>Try browsing other categories</Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => setSelectedCategory('All')}
          >
            <Text style={styles.emptyButtonText}>View All</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredCars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CarCard car={item} onPress={() => handleCarPress(item)} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#aaa',
  },
  listContent: {
    paddingBottom: 80,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: '#5B67F1',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
