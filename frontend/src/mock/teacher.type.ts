
// Interface definitions
export interface Teacher {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  reviews: number;
  country: string;
  specialties: string[];
  experience: string;
  price: number;
  description: string;
  bio?: string;
  education?: string;
  languages?: string[];
}