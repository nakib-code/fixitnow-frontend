import { axiosInstance } from "@/lib/axios";

export interface UpdateUserProfilePayload {
  name?: string;
  phone?: string;

  divisionId?: string;
  districtId?: string;
  upazilaId?: string;
  villageOrArea?: string;

  address?: string;
  city?: string;
  postalCode?: string;
}

// Update user profile
export const updateUserProfile = async (
  payload: UpdateUserProfilePayload,
) => {
  const { data } = await axiosInstance.patch(
    "/users/profile",
    payload,
  );

  return data.data;
};

// Update profile image
export const updateProfileImage = async (
  file: File,
) => {
  const formData = new FormData();

  formData.append("profileImg", file);

  const { data } = await axiosInstance.patch(
    "/users/profile/image",
    formData,
  );

  return data.data;
};