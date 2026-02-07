import { CarWithListings } from '../types';

export type RootStackParamList = {
  Browse: undefined;
  CarDetails: {
    car: CarWithListings;
  };
};
