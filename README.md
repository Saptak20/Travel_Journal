# Travel Journal App

A Node.js and Express travel journaling application with MongoDB, Mongoose schemas, Passport authentication, session management, and full CRUD functionality for travel journal entries.

## Features

- User registration, login, and logout
- Passport authentication with session support
- Password hashing using `passport-local-mongoose`
- Travel journal CRUD operations
- Bootstrap client-side validation
- Server-side validation for dates and ratings
- Immutable destination field after journal creation
- Logged-in user travel style shown in the top-right navbar
- EJS templates with shared partials

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- Passport
- passport-local-mongoose
- express-session
- EJS
- Bootstrap 5

## Folder Structure

```text
SchemaModel/
├── app.js
├── server.js
├── package.json
├── .env.example
├── .gitignore
├── config/
│   ├── choices.js
│   └── passport.js
├── models/
│   ├── user.js
│   └── journal.js
├── routes/
│   ├── auth.js
│   └── journals.js
├── views/
│   ├── auth/
│   │   ├── login.ejs
│   │   └── register.ejs
│   ├── journals/
│   │   ├── _form.ejs
│   │   ├── edit.ejs
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   └── show.ejs
│   ├── partials/
│   │   ├── footer.ejs
│   │   ├── head.ejs
│   │   └── nav.ejs
│   └── error.ejs
└── public/
    ├── css/
    │   └── styles.css
    └── js/
        └── formValidation.js
