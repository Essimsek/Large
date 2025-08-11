# Large

Create and publish your own startups.

---

## ✅ Completed

- **Sign Out Redirect:**  
  Redirects to `/` only on dynamic URLs.
- **Sanity Author & Post Types:**  
  Implemented author and post schemas in Sanity.
- **Dynamic Routing:**  
  - User profile pages: `[username].tsx`
    - user can change the username
    - user's latest posts
  - Individual post pages: `[username]/[postId].tsx`
  - fetch the post informations in `[username]/[postId].tsx`
- **New Post Page UI:**  
  `/new-post` page with authentication check and basic layout.
- **Search**
  - search posts by Title, Author, Name, Username and Category
- **Author Creation After Login:**  
  After user logs in, create a new author in Sanity ( auth.ts  callbacks) if one doesn't exist (override GitHub profile username if needed).
- **Authorization & Permissions:** 
  Ensure only authenticated users can create/edit posts.
---

## 🛠️ In Progress / Next Steps
- /[username]
  - change profile photo
- **New Post Functionality:**  
  Implement the form UI and logic to create and publish new posts from the `/new-post` page.
- **Testing:**  
  Add unit and integration tests for critical flows.
  add small hash to the username if already exists. Not Sure ?
- **Post page:**
  update view count when visit a page.
  add like button and update like count
- **Improve UI/UX:**  
  - Enhance styling and responsiveness.
  - Add feedback for actions (e.g., post creation, errors).
---
