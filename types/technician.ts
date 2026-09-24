export interface TechnicianLocation {
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
  address?: string | null;
  city?: string | null;
  postalCode?: string | null;
}

/* =========================================
   Technician
========================================= */

export interface Technician {
  id: string;
  name: string;
  email: string;

  phone?: string | null;
  profileImg?: string | null;

  role: "TECHNICIAN";
  status: "ACTIVE" | "BLOCKED";

  bio?: string | null;
  experience?: number;
  averageRating?: number;
  completedJobs?: number;

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

  address?: string | null;
  city?: string | null;
  postalCode?: string | null;
}

/* =========================================
   Technician Profile
========================================= */

export interface TechnicianProfile {
  id: string;
  userId: string;

  bio?: string | null;
  experience: number;
  averageRating: number;
  completedJobs: number;

  createdAt: string;
  updatedAt: string;

  user: Technician;
}

/* =========================================
   Update Technician Profile
========================================= */

export interface UpdateTechnicianProfile {
  bio?: string;
  experience?: number;

  divisionId?: string;
  districtId?: string;
  upazilaId?: string;

  villageOrArea?: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

/* =========================================
   Technician Booking
========================================= */

export interface TechnicianBooking {
  id: string;

  status:
    | "REQUESTED"
    | "ACCEPTED"
    | "PAID"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "DECLINED"
    | "CANCELLED";

  bookingDate: string;
  startTime: string;
  endTime: string;

  address: string;
  totalAmount: number;

  customer: {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
  };

  service: {
    id: string;
    title: string;
    price: number;
  };

  payment?: {
    id: string;
    amount: number;
    provider: string;
    status: string;
    paidAt?: string | null;
  };

  review?: {
    id: string;
    rating: number;
    comment?: string | null;
  } | null;
}