
export type authorType = {
  _id: string;
  username: string;
  id?: string;
  name: string;
  image?: string;
  _createdAt: Date | string;
  email: string;
  bio?: string;
}

export type startupCardType = {
  _createdAt: Date | string;
  _id: number;
  author: authorType;
  views: number;
  likes: number;
  description: string;
  image?: string;
  slug?: string;
  category: string;
  title: string;
}
