import React from 'react';

export type startupCardType = {
  _createdAt: string;
  _id: number;
  author: { name: string, id: number },
  views: number;
  likes: number;
  description: string;
  image: string;
  category: string;
  title: string;
}

const StartupCard = ({post}: {post: startupCardType}) => {
    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p>By {post.author.name}</p>
            <p>Views: {post.views} Likes: {post.likes}</p>
        </div>
    );
}

export default StartupCard;
