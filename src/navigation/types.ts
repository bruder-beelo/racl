import { CarWithListings } from '../types';

export type RootStackParamList = {
  Landing: undefined;
  SignIn: undefined;
  SignUp: undefined;
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
  Home: undefined;
  Book: undefined;
  Reservations: undefined;
  Account: undefined;
};
