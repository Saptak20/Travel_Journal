#Travel Journal App
##A Node.js + Express application for authenticated travel journaling with MongoDB, Mongoose schemas, Passport authentication, and full CRUD operations for journals.

Features
User authentication using Passport and express-session
Registration, login, and logout
User profile fields stored in schema:
username
password (hashed by passport-local-mongoose)
nationality
travelStyle
favoriteContinent
Journal schema fields:
destination (immutable after creation)
arrivalDate
departureDate
experience
rating (1 to 5)
Bootstrap form validation on client side
Server-side validation for date range and rating limits
Journal access restricted to the logged-in owner
EJS templating with reusable partials
Travel style shown in top-right navbar after login

#Tech Stack
Node.js
Express
MongoDB
Mongoose
Passport
passport-local-mongoose
express-session
EJS
Bootstrap 5
