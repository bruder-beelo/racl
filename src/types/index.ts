export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  image: string;
  category: string;
  type: string; // SUV, Sedan, Luxury, etc.
  features: string[];
  specs: {
    seats: number;
    transmission: string;
    fuelType: string;
    mpg?: string;
  };
}

export interface Vendor {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  tripCount: number;
  responseTime: string;
  location: string;
}

export interface CarListing {
  id: string;
  carId: string;
  vendorId: string;
  pricePerDay: number;
  available: boolean;
  distance: string;
}

export interface CarWithListings extends Car {
  listings: Array<CarListing & { vendor: Vendor }>;
}
