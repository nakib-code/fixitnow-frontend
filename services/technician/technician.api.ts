import { axiosInstance } from "@/lib/axios";

import {
  Technician,
  TechnicianProfile,
  UpdateTechnicianProfile,
  TechnicianBooking,
} from "@/types/technician";

// Get all technicians
export const getTechnicians = async (): Promise<Technician[]> => {
  const { data } = await axiosInstance.get("/technician/");

  return data.data;
};

// Get logged in technician profile
export const getMyTechnicianProfile =
  async (): Promise<TechnicianProfile> => {
    const { data } = await axiosInstance.get(
      "/technician/profile"
    );

    return data.data;
  };

// Update technician profile
export const updateTechnicianProfile = async (
  payload: UpdateTechnicianProfile
): Promise<TechnicianProfile> => {
  const { data } = await axiosInstance.patch(
    "/technician/profile",
    payload
  );

  return data.data;
};

// Get technician bookings
export const getTechnicianBookings = async (): Promise<
  TechnicianBooking[]
> => {
  const { data } = await axiosInstance.get(
    "/technician/bookings"
  );

  return data.data;
};

// Update booking status
export const updateBookingStatus = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}) => {
  const { data } = await axiosInstance.patch(
    `/technician/bookings/${id}`,
    {
      status,
    }
  );

  return data.data;
};