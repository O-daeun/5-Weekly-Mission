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
  name: string;
  userId: number;
  favorite: boolean;
  link: {
    count: number;
  };
}

export interface LinkInterface {
  id: number;
  created_at: string;
  updated_at: string | null;
  url: string;
  title: string;
  description: string;
  image_source: string;
  folder_id: number;
}
