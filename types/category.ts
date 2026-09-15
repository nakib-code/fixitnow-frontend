export interface ICategory {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
  iconPublicId?: string | null;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
}