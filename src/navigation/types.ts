import { CarWithListings } from '../types';

export type RootStackParamList = {
  Landing: undefined;
  MainTabs: undefined;
  Vehicles: {
    location: string;
    pickupDate: string;
    dropoffDate: string;
    pickupTime: string;
    dropoffTime: string;
  };
  CarDetails: {
    car: CarWithListings;
  };
};

export type MainTabParamList = {
  Book: undefined;
  Reservations: undefined;
  Account: undefined;
};
