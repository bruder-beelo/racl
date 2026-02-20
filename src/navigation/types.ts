import { CarWithListings } from '../types';

export type RootStackParamList = {
  Landing: undefined;
  Browse: undefined;
  CarDetails: {
    car: CarWithListings;
  };
};
