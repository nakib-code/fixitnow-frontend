import { axiosInstance } from "@/lib/axios";

export interface IReview {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;

  customer: {
    id: string;
    name: string;
    profileImg: string | null;
  };
}

export type TCreateReview = {
  bookingId: string;
  rating: number;
  comment?: string;
};

export const createReview = async (payload: TCreateReview) => {
  const { data } = await axiosInstance.post("/reviews", payload);

  return data.data;
};

export const getReviews = async (): Promise<IReview[]> => {
  const { data } = await axiosInstance.get("/reviews");

  return data.data;
};