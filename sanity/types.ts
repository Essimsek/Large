
export type startupCardType = {
  _createdAt: Date | string;
  _id: number;
  author: { _id: string, username: string, image?: string },
  views: number;
  likes: number;
  description: string;
  image: string;
  slug?: string;
  category: string;
  title: string;
}
