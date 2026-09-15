export interface Service {
  id: string;
  title: string;
  description: string;
  price: number | string;
  duration: number;
  isAvailable: boolean;

  image?: string | null;
  imagePublicId?: string | null;

  technicianId: string;
  categoryId: string;

  category: {
    id: string;
    name: string;
    slug: string;
    icon?: string | null;
  };

  technician: {
    id: string;
    bio?: string | null;
    experience: number;
    location: string;
    averageRating: number;
    completedJobs: number;

    user: {
      id: string;
      name: string;
      email?: string;
      phone?: string | null;
      profileImg?: string | null;
    };
  };

  createdAt: string;
  updatedAt: string;
}
export interface TCreateService {
  title: string;
  description: string;
  price: number;
  duration: number;
  categoryId: string;
  isAvailable?: boolean;
  image?: File;
}