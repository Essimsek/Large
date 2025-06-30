
export type authorType = {
  _id: string;
  username: string;
  image?: string;
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
