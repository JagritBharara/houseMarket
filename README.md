# Property Management API

This is a property management API that allows users to register, log in, manage their properties (add, view, and delete), and handle images associated with each property.

## Features

- User registration and authentication (with JWT tokens)
- Property management (CRUD functionality):
  - Add properties with images
  - View all properties or properties added by a specific user
  - Delete a property
- Image handling: Upload and delete images associated with each property
- Token-based authentication with JWT
- Token blacklist for logout functionality

## Technologies Used

- **Node.js** for server-side JavaScript runtime
- **Express.js** for the web framework
- **Mongoose** for MongoDB ODM
- **JWT** (JSON Web Tokens) for authentication
- **Bcrypt** for password hashing
- **Multer** for handling file uploads (property images)
- **FS** for file handling
- **MongoDB** as the database




