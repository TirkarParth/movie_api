# myMovie API

myMovie is a RESTful API for a movie database application, built using Node.js, Express, MongoDB, and Mongoose. It allows users to access movie information, manage user profiles, authenticate securely, and interact with data through CRUD operations.

## Features
- Return a list of all movies
- Retrieve movie details by title
- Retrieve genre information by name
- Retrieve director information by name
- User registration and authentication with JWT
- Add/remove movies from favorites
- Update user profile information
- Delete user accounts

## Technologies Used
- Node.js
- Express
- MongoDB & Mongoose
- Passport (Local and JWT strategies)
- CORS
- Bcrypt for password hashing
- Postman for API testing
- Heroku for deployment

## Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB (local or MongoDB Atlas)

## Setup Instructions
1. Clone the repository:
```bash
git clone https://github.com/your-username/myflix-api.git
cd myflix-api
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
- Create a `.env` file in the root directory with:
```
DB_URI=YOUR_MONGODB_URI
SECRET_KEY=YOUR_SECRET_KEY
```

4. Start the server:
```bash
npm start
```

## Endpoints
### Movies
- `GET /movies` - Returns all movies
- `GET /movies/:title` - Returns movie details by title
- `GET /genres/:name` - Returns genre details
- `GET /directors/:name` - Returns director details

### Users
- `POST /users` - Register a new user
- `POST /login` - User login (JWT token)
- `PUT /users/:username` - Update user details
- `DELETE /users/:username` - Delete user
- `POST /users/:username/movies/:movieId` - Add movie to favorites
- `DELETE /users/:username/movies/:movieId` - Remove movie from favorites

## Authentication & Authorization
- JWT authentication with Passport
- Secure routes using JWT strategy, except user registration

## Data Validation & Security
- Input validation using Mongoose schemas
- Password hashing with Bcrypt

## Deployment
- Hosted on Heroku, database on MongoDB Atlas

## Testing
Test API endpoints using Postman or similar tools.

