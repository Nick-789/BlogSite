# Blog Site - ReadMe

## Overview

Welcome to my Blog Site! This project is a fully functional web application that allows users to create, view, edit, and delete blog posts. The site is designed to provide a seamless and engaging user experience, enabling authors to share their thoughts and stories with a wider audience. The application is built using the MERN stack, which stands for MongoDB, Express, React, and Node.js.

## Tech Stack

### MongoDB
MongoDB is a NoSQL database used to store the application's data. It offers flexibility and scalability, making it an excellent choice for handling the dynamic content of a blog site. All posts, user information, and other data are stored in MongoDB collections.

### Express
Express is a web application framework for Node.js, designed for building web applications and APIs. It simplifies the process of handling routes, middleware, and HTTP requests. In this project, Express is used to create a robust backend that manages API endpoints for user authentication, blog post management, and file uploads.

### React
React is a popular JavaScript library for building user interfaces. It allows for the creation of reusable UI components, making the development process more efficient and maintainable. In this project, React is used to build a responsive and interactive front end where users can easily navigate through the blog posts, create new posts, and edit existing ones.

### Node.js
Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows for server-side scripting and the creation of scalable backend services. Node.js is the backbone of the application, running the Express server and handling all server-side operations.

## Features

### User Authentication
- **Registration**: Users can register an account by providing a username and password.
- **Login**: Registered users can log in to access additional features like creating and editing posts.
- **Logout**: Users can log out of their accounts securely.

### Blog Management
- **Create Posts**: Authenticated users can create new blog posts by providing a title, summary, and content. They can also upload images to enhance their posts.
- **View Posts**: All users can view a list of all blog posts. Each post displays the title, summary, author, and publication date.
- **Edit Posts**: Authenticated users can edit their own posts. Clicking the edit icon opens a popup where they can update the title, summary, and content of the post.
- **Delete Posts**: Authenticated users can delete their own posts, ensuring they have control over their content.

### File Uploads
- **Image Uploads**: Users can upload images to accompany their blog posts. The images are stored on the server and displayed alongside the corresponding posts.

### Search Functionality
- **Search Posts**: Users can search for specific posts using keywords. The search functionality is powered by `fuse.js`, a lightweight fuzzy-search library.

### Responsive Design
- **Mobile-Friendly**: The application is designed to be responsive, ensuring a smooth user experience across different devices and screen sizes.
