import { CarWithListings } from '../types';

export type RootStackParamList = {
  Landing: undefined;
  MainTabs: undefined;
  CarDetails: {
    car: CarWithListings;
  };
};

export type MainTabParamList = {
  Book: undefined;
  Reservations: undefined;
  Account: undefined;
};
