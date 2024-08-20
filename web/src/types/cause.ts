export interface Cause {
  id: string;
  email: string;
  contact: string;
  title: string;
  description: string;
  createAt: string;
  location: string;
  expirationAt: Date;
  isPublic: boolean;
  imagesUrl: string[];
}