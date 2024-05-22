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
