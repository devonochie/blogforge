# Blogging Platform API

A simple RESTful API for a personal blogging platform. Users can create, update, delete, and retrieve blog posts. The API also supports searching and pagination.

## Features

- **Create Posts**: Users can create new blog posts.
- **Update Posts**: Users can update existing blog posts.
- **Delete Posts**: Users can delete blog posts by their ID.
- **Get All Posts**: Users can retrieve all blog posts.
- **Get Single Post**: Users can fetch a specific blog post by its ID.
- **Search Posts**: Users can search for blog posts by a term in the title or content.
- **Pagination**: Users can view paginated blog posts by specifying page and limit.

## Requirements

- Node.js installed on your machine.
- MongoDB setup for data storage.

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/devonochie/blogforge.git

cd blogforge

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Run migrations/seed (if applicable)
npm run db:init

# Start the server
npm run dev

🧩 Contributing
Feel free to fork this project and submit PRs.
Please follow the existing coding style and open issues for major changes.

📄 License
This project is licensed under the MIT License.

👤 Author
Devon Onochie
GitHub: @devonochie