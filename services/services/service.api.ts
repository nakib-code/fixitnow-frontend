import { axiosInstance } from "@/lib/axios";

import {
  Service,
  TCreateService,
} from "@/types/service";

export const getServices = async (
  search?: string,
  category?: string,
): Promise<Service[]> => {
  const params = new URLSearchParams();

  if (search) {
    params.append("searchTerm", search);
  }

  if (category) {
    params.append("category", category);
  }

  const { data } = await axiosInstance.get(
    `/services?${params.toString()}`,
  );

  return data.data;
};

export const getSingleService = async (
  id: string,
) => {
  const { data } = await axiosInstance.get(
    `/services/${id}`,
  );

  return data.data;
};

export const createService = async (
  payload: TCreateService,
) => {
  const formData = new FormData();

  formData.append("title", payload.title);
  formData.append("description", payload.description);
  formData.append("price", String(payload.price));
  formData.append("duration", String(payload.duration));
  formData.append("categoryId", payload.categoryId);

  if (payload.isAvailable !== undefined) {
    formData.append(
      "isAvailable",
      String(payload.isAvailable),
    );
  }

  if (payload.image) {
    formData.append("image", payload.image);
  }

  const { data } = await axiosInstance.post(
    "/services",
    formData,
  );

  return data.data;
};

export const getMyServices = async () => {
  const { data } = await axiosInstance.get(
    "/services/my-services",
  );

  return data.data;
};

export const updateService = async ({
  id,
  payload,
}: {
  id: string;
  payload: Partial<TCreateService>;
}) => {
  const formData = new FormData();

  if (payload.title !== undefined) {
    formData.append("title", payload.title);
  }

  if (payload.description !== undefined) {
    formData.append(
      "description",
      payload.description,
    );
  }

  if (payload.price !== undefined) {
    formData.append(
      "price",
      String(payload.price),
    );
  }

  if (payload.duration !== undefined) {
    formData.append(
      "duration",
      String(payload.duration),
    );
  }

  if (payload.categoryId !== undefined) {
    formData.append(
      "categoryId",
      payload.categoryId,
    );
  }

  if (payload.isAvailable !== undefined) {
    formData.append(
      "isAvailable",
      String(payload.isAvailable),
    );
  }

  if (payload.image) {
    formData.append("image", payload.image);
  }

  const { data } = await axiosInstance.patch(
    `/services/${id}`,
    formData,
  );

  return data.data;
};

export const deleteService = async (
  id: string,
) => {
  await axiosInstance.delete(`/services/${id}`);
};

export const getTechnicianBookings = async () => {
  const { data } = await axiosInstance.get(
    "/technician/bookings",
  );

  return data.data;
};