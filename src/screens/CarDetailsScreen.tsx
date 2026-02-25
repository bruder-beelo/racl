import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { VendorCard } from '../components/VendorCard';
import { RootStackParamList } from '../navigation/types';

type CarDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CarDetails'>;
type CarDetailsScreenRouteProp = RouteProp<RootStackParamList, 'CarDetails'>;

interface CarDetailsScreenProps {
  navigation: CarDetailsScreenNavigationProp;
  route: CarDetailsScreenRouteProp;
}

export const CarDetailsScreen: React.FC<CarDetailsScreenProps> = ({ navigation, route }) => {
  const { car } = route.params;

  const handleBook = (vendorName: string, price: number) => {
    Alert.alert(
      'Booking Confirmed',
      `You're booking the ${car.year} ${car.make} ${car.model} from ${vendorName} for $${price}/day`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: car.image }} style={styles.image} />

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={styles.header}>
            <View>
              <Text style={styles.carName}>{`${car.year} ${car.make} ${car.model}`}</Text>
              <Text style={styles.carType}>{car.type} • {car.category}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Specifications</Text>
            <View style={styles.specsGrid}>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Seats</Text>
                <Text style={styles.specValue}>{car.specs.seats}</Text>
              </View>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Transmission</Text>
                <Text style={styles.specValue}>{car.specs.transmission}</Text>
              </View>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Fuel Type</Text>
                <Text style={styles.specValue}>{car.specs.fuelType}</Text>
              </View>
              {car.specs.mpg && (
                <View style={styles.specItem}>
                  <Text style={styles.specLabel}>Efficiency</Text>
                  <Text style={styles.specValue}>{car.specs.mpg}</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={styles.featuresContainer}>
              {car.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Text style={styles.featureBullet}>•</Text>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Available from {car.listings.length} {car.listings.length === 1 ? 'vendor' : 'vendors'}
            </Text>
            <Text style={styles.sectionSubtitle}>Sorted by price (lowest first)</Text>
            {car.listings.map((listing) => (
              <VendorCard
                key={listing.id}
                vendor={listing.vendor}
                listing={listing}
                onBook={() => handleBook(listing.vendor.name, listing.pricePerDay)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#000',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    backgroundColor: 'rgba(26, 26, 26, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
    minHeight: 44,
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  carName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  carType: {
    fontSize: 16,
    color: '#aaa',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  specItem: {
    width: '50%',
    marginBottom: 16,
  },
  specLabel: {
    fontSize: 13,
    color: '#888',
    marginBottom: 4,
  },
  specValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  featuresContainer: {
    marginTop: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureBullet: {
    fontSize: 18,
    color: '#5B67F1',
    marginRight: 12,
    fontWeight: '600',
  },
  featureText: {
    fontSize: 15,
    color: '#fff',
  },
});
