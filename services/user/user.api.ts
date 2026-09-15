import { axiosInstance } from "@/lib/axios";

export interface UpdateUserProfilePayload {
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

export const updateUserProfile = async (
  payload: UpdateUserProfilePayload
) => {
  const { data } = await axiosInstance.patch(
    "/users/profile",
    payload
  );

  return data.data;
};

export const updateProfileImage = async (file: File) => {
  const formData = new FormData();

  formData.append("profileImg", file);

  const { data } = await axiosInstance.patch(
    "/users/profile/image",
    formData
  );

  return data.data;
};