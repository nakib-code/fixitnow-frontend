import { axiosInstance } from "@/lib/axios";

// ==============================
// Users
// ==============================

export const getAllUsers = async () => {
  const { data } = await axiosInstance.get("/users");

  return data.data;
};

export const blockUser = async (id: string) => {
  const { data } = await axiosInstance.patch(
    `/users/${id}/block`
  );

  return data.data;
};

export const unblockUser = async (id: string) => {
  const { data } = await axiosInstance.patch(
    `/users/${id}/unblock`
  );

  return data.data;
};

export const deleteUser = async (id: string) => {
  const { data } = await axiosInstance.delete(
    `/users/${id}`
  );

  return data.data;
};

// ==============================
// Bookings
// ==============================

export const getAllBookings = async () => {
  const { data } = await axiosInstance.get(
    "/bookings"
  );

  return data.data;
};