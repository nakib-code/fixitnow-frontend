import { axiosInstance } from "@/lib/axios";
import { ICategory } from "@/types/category";

export const getCategories = async (): Promise<ICategory[]> => {
  const { data } = await axiosInstance.get("/categories");

  return data.data;
};

export const createCategory = async (payload: {
  name: string;
  icon?: File;
  description?: string;
}) => {
  const formData = new FormData();

  formData.append("name", payload.name);

  if (payload.description) {
    formData.append("description", payload.description);
  }

  if (payload.icon) {
    formData.append("icon", payload.icon);
  }

  const { data } = await axiosInstance.post(
    "/categories",
    formData
  );

  return data.data;
};

export const updateCategory = async ({
  id,
  payload,
}: {
  id: string;
  payload: {
    name: string;
    icon?: File;
    description?: string;
  };
}) => {
  const formData = new FormData();

  formData.append("name", payload.name);

  if (payload.description) {
    formData.append("description", payload.description);
  }

  if (payload.icon) {
    formData.append("icon", payload.icon);
  }

  const { data } = await axiosInstance.patch(
    `/categories/${id}`,
    formData
  );

  return data.data;
};

export const deleteCategory = async (
  id: string
) => {
  const { data } = await axiosInstance.delete(
    `/categories/${id}`
  );

  return data.data;
};