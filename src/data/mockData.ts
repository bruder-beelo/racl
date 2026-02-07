import { Car, Vendor, CarListing } from '../types';

export const cars: Car[] = [
  {
    id: '1',
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80',
    category: 'Electric',
    type: 'Sedan',
    features: ['Autopilot', 'All-wheel drive', 'Premium sound', 'Navigation'],
    specs: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Electric',
      mpg: '130 MPGe',
    },
  },
  {
    id: '2',
    make: 'BMW',
    model: 'X5',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    category: 'Luxury',
    type: 'SUV',
    features: ['Leather seats', 'Panoramic roof', 'Apple CarPlay', 'Heated seats'],
    specs: {
      seats: 7,
      transmission: 'Automatic',
      fuelType: 'Gas',
      mpg: '21 MPG',
    },
  },
  {
    id: '3',
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80',
    category: 'Economy',
    type: 'Sedan',
    features: ['Backup camera', 'Bluetooth', 'USB ports', 'Cruise control'],
    specs: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Gas',
      mpg: '32 MPG',
    },
  },
  {
    id: '4',
    make: 'Jeep',
    model: 'Wrangler',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
    category: 'Adventure',
    type: 'SUV',
    features: ['4x4', 'Removable top', 'Off-road capable', 'Trail rated'],
    specs: {
      seats: 4,
      transmission: 'Manual',
      fuelType: 'Gas',
      mpg: '22 MPG',
    },
  },
  {
    id: '5',
    make: 'Mercedes-Benz',
    model: 'S-Class',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    category: 'Luxury',
    type: 'Sedan',
    features: ['Massage seats', 'Premium audio', 'Night vision', 'Ambient lighting'],
    specs: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Gas',
      mpg: '24 MPG',
    },
  },
  {
    id: '6',
    make: 'Honda',
    model: 'CR-V',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80',
    category: 'Economy',
    type: 'SUV',
    features: ['Apple CarPlay', 'Android Auto', 'Lane assist', 'Adaptive cruise'],
    specs: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Gas',
      mpg: '30 MPG',
    },
  },
  {
    id: '7',
    make: 'Porsche',
    model: '911',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    category: 'Luxury',
    type: 'Sports',
    features: ['Sport exhaust', 'Carbon brakes', 'Track mode', 'Premium leather'],
    specs: {
      seats: 2,
      transmission: 'Manual',
      fuelType: 'Gas',
      mpg: '18 MPG',
    },
  },
  {
    id: '8',
    make: 'Ford',
    model: 'F-150',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
    category: 'Truck',
    type: 'Pickup',
    features: ['Towing package', 'Bed liner', '4x4', 'Crew cab'],
    specs: {
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Gas',
      mpg: '20 MPG',
    },
  },
];

export const vendors: Vendor[] = [
  {
    id: 'v1',
    name: 'Enterprise Rent-A-Car',
    rating: 4.9,
    reviewCount: 87,
    tripCount: 120,
    responseTime: '~1 hour',
    location: 'San Francisco, CA',
  },
  {
    id: 'v2',
    name: 'Hertz',
    rating: 4.8,
    reviewCount: 65,
    tripCount: 89,
    responseTime: '~30 min',
    location: 'San Francisco, CA',
  },
  {
    id: 'v3',
    name: 'Avis Budget Group',
    rating: 5.0,
    reviewCount: 120,
    tripCount: 200,
    responseTime: '~15 min',
    location: 'Oakland, CA',
  },
  {
    id: 'v4',
    name: 'Sixt Rent a Car',
    rating: 4.7,
    reviewCount: 43,
    tripCount: 67,
    responseTime: '~2 hours',
    location: 'San Jose, CA',
  },
  {
    id: 'v5',
    name: 'National Car Rental',
    rating: 4.9,
    reviewCount: 92,
    tripCount: 150,
    responseTime: '~45 min',
    location: 'Berkeley, CA',
  },
];

export const carListings: CarListing[] = [
  // Tesla Model 3 - Multiple vendors
  { id: 'l1', carId: '1', vendorId: 'v1', pricePerDay: 89, available: true, distance: '2.3 mi' },
  { id: 'l2', carId: '1', vendorId: 'v2', pricePerDay: 85, available: true, distance: '3.1 mi' },
  { id: 'l3', carId: '1', vendorId: 'v3', pricePerDay: 92, available: true, distance: '5.4 mi' },

  // BMW X5 - Multiple vendors
  { id: 'l4', carId: '2', vendorId: 'v2', pricePerDay: 145, available: true, distance: '3.1 mi' },
  { id: 'l5', carId: '2', vendorId: 'v4', pricePerDay: 139, available: true, distance: '8.2 mi' },

  // Toyota Camry
  { id: 'l6', carId: '3', vendorId: 'v1', pricePerDay: 55, available: true, distance: '2.3 mi' },
  { id: 'l7', carId: '3', vendorId: 'v5', pricePerDay: 52, available: true, distance: '4.7 mi' },

  // Jeep Wrangler
  { id: 'l8', carId: '4', vendorId: 'v3', pricePerDay: 98, available: true, distance: '5.4 mi' },
  { id: 'l9', carId: '4', vendorId: 'v1', pricePerDay: 102, available: true, distance: '2.3 mi' },

  // Mercedes S-Class
  { id: 'l10', carId: '5', vendorId: 'v4', pricePerDay: 199, available: true, distance: '8.2 mi' },

  // Honda CR-V
  { id: 'l11', carId: '6', vendorId: 'v2', pricePerDay: 65, available: true, distance: '3.1 mi' },
  { id: 'l12', carId: '6', vendorId: 'v5', pricePerDay: 62, available: true, distance: '4.7 mi' },
  { id: 'l13', carId: '6', vendorId: 'v3', pricePerDay: 68, available: true, distance: '5.4 mi' },

  // Porsche 911
  { id: 'l14', carId: '7', vendorId: 'v3', pricePerDay: 299, available: true, distance: '5.4 mi' },

  // Ford F-150
  { id: 'l15', carId: '8', vendorId: 'v5', pricePerDay: 78, available: true, distance: '4.7 mi' },
  { id: 'l16', carId: '8', vendorId: 'v1', pricePerDay: 82, available: true, distance: '2.3 mi' },
];

// Helper function to get cars with their listings
export const getCarsWithListings = () => {
  return cars.map(car => {
    const listings = carListings
      .filter(listing => listing.carId === car.id)
      .map(listing => ({
        ...listing,
        vendor: vendors.find(v => v.id === listing.vendorId)!,
      }))
      .sort((a, b) => a.pricePerDay - b.pricePerDay); // Sort by price

    return {
      ...car,
      listings,
    };
  });
};
