export interface AddLink {
  url: string;
  folderId: number | null;
}

export interface EditFolderName {
  folderId: number;
  newFolderName: string;
}
