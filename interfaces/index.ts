export interface UserInterface {
  id: number;
  created_at: string;
  name: string;
  image_source: string;
  email: string;
  auth_id: string;
}

export interface FolderInterface {
  id: number;
  created_at: string;
  favorite: boolean;
  name: string;
  link_count: number;
}

export interface LinkInterface {
  id: number;
  favorite: boolean;
  created_at: string;
  url: string;
  title: string;
  image_source: string;
  description: string;
}
