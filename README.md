# Vega6 Task Backend

This is the backend service for a full-stack blog platform, built using Node.js, Express.js, and MongoDB. It supports user authentication (JWT), blog creation, image uploads (Multer), and a comment-reply system.
## Environment Variables

Modify the .env file with your own configurations:

`PORT=8000`
`MONGODB_URL=your_mongodb_connection_string`
`CLOUDINARY_CLOUD_NAME=cloudinary_cloud_name`
`CLOUDINARY_API_KEY=cloudinary_api_key`
`CLOUDINARY_API_SECRET=cloudinary_api_secret`
`ACCESS_TOKEN_SECRET=access_token_secret_key`
`ACCESS_TOKEN_EXPIRY=1d`
`REFRESH_TOKEN_SECRET=refresh_token_secret_key`
`REFRESH_TOKEN_EXPIRY=10d`


## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```

 Clone the repository:
   ```bash
   https://github.com/vanshikaRaj11/Vega_Task.git
```

Install dependencies

```bash
 npm install 
```
### Commands

Running locally:

```bash
npm run dev
```

## Features

- **User Authentication**:Sign up new users with email, password, and profile image upload. Login with JWT-based authentication. Password hashing using bcrypt for security.
- **Blog Management (CRUD)**: Create a Blog with title, description, and image upload. Read Blogs (fetch all blogs or a specific blog). Update Blog (only the owner can edit). Delete Blog (only the owner can soft delete).
- **Comments & Replies**: Add Comments to a blog post. Reply to Comments (nested replies). Store comments & replies in MongoDB using references.
- **Image Uploads**: Multer integration for profile and blog image uploads. Store image file paths in MongoDB..
- **Blog Pagination & Filtering**:Paginated API to fetch blogs in batches. Filter Blogs based on conditions like isDeleted: false.
## Blog Backend API Endpoints



### Authentication

| Endpoint                  | Method | Description                           |
|---------------------------|--------|---------------------------------------|
| `/api/v1/users/`          | POST   | Register a new user                  |
| `/api/v1/users/users/login`             | POST   | Login user                           |
| `/api/v1/users/users/`            | GET   | Get user        |

### Blogs

| Endpoint                  | Method | Description                           |
|---------------------------|--------|---------------------------------------|
| `/api/v1/blogs/`          | POST   | Adds a new blog                  |
| `/api/v1/blogs/?limit=10&page=1`             | GET   | Fetch all blogs                          |
| `/api/v1/blogs/:id`            | GET   | Get single blog         |
| `/api/v1/blogs/:id`            | DELETE   | Delete  blog         |
| `/api/v1/blogs/:id`            | PATCH   | Update  blog         |

### Comments

| Endpoint                  | Method | Description                           |
|---------------------------|--------|---------------------------------------|
| `/api/v1/comments/:blogId`          | POST   | Adds a new comment                  |
| `/api/v1/comments/:blogId/reply/:commentId`             | POST   | Adds reply to a comment

