Travel Journal App
A Node.js + Express application for authenticated travel journaling with MongoDB, Mongoose schemas, Passport authentication, and full CRUD operations for journals.

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
Tech Stack
Node.js
Express
MongoDB
Mongoose
Passport
passport-local-mongoose
express-session
EJS
Bootstrap 5
Project Structure
SchemaModel/
app.js
server.js
package.json
.env.example
.gitignore
config/
choices.js
passport.js
models/
user.js
journal.js
routes/
auth.js
journals.js
views/
auth/
login.ejs
register.ejs
journals/
_form.ejs
edit.ejs
index.ejs
new.ejs
show.ejs
partials/
footer.ejs
head.ejs
nav.ejs
error.ejs
public/
css/
styles.css
js/
formValidation.js

Prerequisites
Node.js 18+ recommended
MongoDB running locally or a MongoDB connection URI
Environment Variables
Create a .env file in the project root:

PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/schema-model
SESSION_SECRET=any-long-random-string

You can copy from the template:

cp .env.example .env

For PowerShell:

Copy-Item .env.example .env

Installation
npm install

Run the App
Development mode with auto-reload:

npm run dev

Production mode:

npm start

Open in browser:

http://localhost:3000

Application Routes
Auth Routes
GET /register
POST /register
GET /login
POST /login
GET /logout
Journal Routes
GET /journals
GET /journal/new
POST /journal
GET /journals/:id
GET /journals/:id/edit
PUT /journals/:id
DELETE /journals/:id
Validation Rules
User
username: required
password: required
nationality: required, from allowed dropdown list
travelStyle: required, from allowed dropdown list
favoriteContinent: required, from allowed dropdown list
Journal
destination: required, immutable once created
arrivalDate: required
departureDate: required, must be same day or after arrivalDate
experience: required
rating: required, must be between 1 and 5
Notes
Do not commit your .env file.
node_modules and package-lock.json are excluded in .gitignore as requested.
No dummy data is used; all entries are created through app forms and stored in MongoDB.
Suggested Workflow
Register a new user.
Log in.
Create journal entries from /journal/new.
View, edit, and delete your own journals from /journals.
Verify destination remains read-only on edit form.
License
For academic/project submission use.

If you want, I can also give you a shorter GitHub-ready version with a cleaner project description and badges removed.
