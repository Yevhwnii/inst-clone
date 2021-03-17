export interface IPhoto {
  caption: string;
  comments: [IComment];
  dateCreated: number;
  imageSrc: string;
  likes: [];
  photoId: number;
  userId: string;
  userLatitude: string;
  userLongtitude: string;
  docId: string;
}

export interface IUser {
  dateCreated: number;
  emailAddress: string;
  followers: [string];
  following: [string];
  fullName: string;
  userId: string;
  username: string;
  docId: string;
}

export interface IComment {
  comment: string;
  displayName: string;
}
