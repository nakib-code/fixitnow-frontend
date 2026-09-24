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

    averageRating: number;
    completedJobs: number;

    user: {
      id: string;

      name: string;
      email?: string;
      phone?: string | null;
      profileImg?: string | null;

      // Location
      divisionId?: string | null;
      districtId?: string | null;
      upazilaId?: string | null;

      division?: {
        id: string;
        name: string;
        slug: string;
      } | null;

      district?: {
        id: string;
        name: string;
        slug: string;
      } | null;

      upazila?: {
        id: string;
        name: string;
        slug: string;
      } | null;

      villageOrArea?: string | null;

      // Detailed address
      address?: string | null;
      city?: string | null;
      postalCode?: string | null;
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