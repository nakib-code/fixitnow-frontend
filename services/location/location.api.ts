import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Division {
  id: string;
  name: string;
  slug: string;
}

export interface District {
  id: string;
  name: string;
  slug: string;
  divisionId: string;
}

export interface Upazila {
  id: string;
  name: string;
  slug: string;
  districtId: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api/v1";

const getDivisions = async (): Promise<Division[]> => {
  const response = await axios.get(
    `${API_URL}/locations/divisions`,
    {
      withCredentials: true,
    },
  );

  return response.data.data;
};

const getDistricts = async (
  divisionId: string,
): Promise<District[]> => {
  const response = await axios.get(
    `${API_URL}/locations/divisions/${divisionId}/districts`,
    {
      withCredentials: true,
    },
  );

  return response.data.data;
};

const getUpazilas = async (
  districtId: string,
): Promise<Upazila[]> => {
  const response = await axios.get(
    `${API_URL}/locations/districts/${districtId}/upazilas`,
    {
      withCredentials: true,
    },
  );

  return response.data.data;
};

export const useDivisions = () => {
  return useQuery({
    queryKey: ["locations", "divisions"],
    queryFn: getDivisions,
    staleTime: 1000 * 60 * 60,
  });
};

export const useDistricts = (divisionId?: string) => {
  return useQuery({
    queryKey: ["locations", "districts", divisionId],
    queryFn: () => getDistricts(divisionId!),
    enabled: !!divisionId,
    staleTime: 1000 * 60 * 60,
  });
};

export const useUpazilas = (districtId?: string) => {
  return useQuery({
    queryKey: ["locations", "upazilas", districtId],
    queryFn: () => getUpazilas(districtId!),
    enabled: !!districtId,
    staleTime: 1000 * 60 * 60,
  });
};