# Large

Create and publish your own posts.

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
- **Post Page:**
  - Individual post pages: `[username]/[postId].tsx`
  - fetch the post informations in `[username]/[postId].tsx`
  - update view count when visit a page.
  - delete post and the post assets
- **New Post Page UI:**  
  - `/new-post` page with authentication check and basic layout.
  - Implement the form UI and logic to create and publish new posts from the `/new-post` page.
  - Implement the edit page for the posts
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
  - show an allert or success when user publish the post or edit the post with using toast
- **Testing:**  
  Add unit and integration tests for critical flows.
  add small hash to the username if already exists. Not Sure ?
- **Post page:**
  - add like button and update like count
  - post images look awful fix it
  - UI update for post settings
- **Improve UI/UX:**  
  - Enhance styling and responsiveness.
  - Add feedback for actions (e.g., post creation, errors).
- **Use sanity image type**
  - upload images to sanity for posts
---
