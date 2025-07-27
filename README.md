# Mini Social Media

A modern, lightweight social media platform built with Node.js, Express, MongoDB, and EJS templates. This application features user authentication, post creation, likes functionality, and a responsive animated UI.

## Features

- **User Authentication**
  - Secure registration and login using JWT tokens
  - Password encryption with bcrypt
  - Protected routes with authentication middleware

- **Post Management**
  - Create, read, update, and delete posts
  - Like/unlike functionality for posts
  - View posts from all users in the feed

- **User Experience**
  - Responsive design works on all device sizes
  - Modern UI with animations and transitions
  - Real-time feedback for user interactions

- **Profile Management**
  - Personalized user profiles
  - View and manage your own posts
  - See your post engagement statistics

## Technology Stack

- **Backend**
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - JSON Web Tokens (JWT)
  - bcrypt for password hashing

- **Frontend**
  - EJS templates
  - Tailwind CSS
  - Animate.css for animations
  - Responsive design
## Installation

1. Clone the repository:
git clone https://github.com/v-i-n-a-y-29/Mini-Social-Media.git cd Mini-Social-Media

2. Install dependencies:
npm install

3. Create a `.env` file in the root directory with the following variables:
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key




4. Start the application:
npm start
http://localhost:3000

## Project Structure
Mini-Social-Media/ ├── models/ │ ├── post.js │ └── user.js ├── views/ │ ├── edit.ejs │ ├── home.ejs │ ├── index.ejs │ ├── login.ejs │ └── profile.ejs ├── app.js ├── package.json ├── .env └── README.md


## API Routes

- **Authentication**
  - `POST /register` - Register a new user
  - `POST /login` - Login user and generate JWT
  - `GET /logout` - Logout user

- **Posts**
  - `GET /home` - View all posts
  - `POST /post` - Create a new post
  - `GET /like/:id` - Like/unlike a post
  - `GET /edit/:id` - Edit post form
  - `POST /update/:id` - Update a post

- **Profile**
  - `GET /profile` - View user profile and posts

## Future Enhancements

- Comment functionality
- User following system
- Image upload for posts
- Real-time notifications
- Dark/light theme toggle

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Animate.css](https://animate.style/)
- [Font Awesome](https://fontawesome.com/)
