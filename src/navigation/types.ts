import { CarWithListings } from '../types';

export type RootStackParamList = {
  Landing: undefined;
  MainTabs: undefined;
  Vehicles: {
    location: string;
    pickupDate: Date;
    dropoffDate: Date;
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
