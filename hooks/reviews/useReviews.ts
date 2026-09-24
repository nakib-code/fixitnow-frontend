import { useQuery } from "@tanstack/react-query";

import { getReviews } from "@/services/review/review.api";

export const useReviews = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
  });
};