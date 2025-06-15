  export const posts = [
    {
      _createdAt: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'}),
      _id: 1,
      author: {name: 'Emre Şimşek', id: 1}, 
      views: 351,
      likes: 15,
      description: 'Next js published its new version Next15 amazing cheak out.',
      image: 'https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg',
      category: 'Software',
      title: 'Next js 15',
    },
    {
      _createdAt: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'}),
      _id: 2,
      author: {name: 'Mert Aydin', id: 1}, 
      views: 512,
      likes: 33,
      description: "Have you check Elon Musks latest robot show pretty amazing isn't it",
      image: 'https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg',
      category: 'Robots',
      title: 'We Robots',
    },
    {
      _createdAt: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'}),
      _id: 3,
      author: {name: 'Görkem Kuruköse', id: 1}, 
      views: 20,
      likes: 3,
      description: 'how am I so creative do you want to learn then check out!.',
      image: 'https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg',
      category: 'Creativity',
      title: 'Waking up at 4am',
    }
  ];