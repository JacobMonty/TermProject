UCF Capital Garage

This server is meant to make finding parking on campus easier for students. It includes real-time status updates and allows users to favorite garages.

What this project includes
- Login and registration for users
- 2 user roles: admin and driver
- Admin CRUD for garages
- Admin can change garage availability
- Drivers can read garage data
- Drivers can add and remove favorites
- Activity log collection
- Seed data with 4 garages and 3 users

The 5 MongoDB collections used
- users
- garages
- admins
- favorites
- activity logs

Many-to-many relationship
- users <-> garages through favorites
A user can favorite many garages, and one garage can be favorited by many users.

How to run the backend
PORT=5001
Mongo URI=mongodb+srv://cis4004User:FinalProject!@webit-final.phhx94t.mongodb.net/?appName=WebIT-final
1. Open a terminal in the project folder
2. Run: npm install (make sure the .env file is in the same folder as server.js)
3. Run: node server.js

Demo authentication for class demo
This project uses a simple x-user header for protected routes.
Examples:
- x-user: admin1
- x-user: student1
- x-user: student2

Seeded users
- admin1 / Knights2026!
- student1 / Knights2026!
- student2 / Knights2026!

Main endpoints
Users
- POST /api/users/register
- POST /api/users/login
- GET /api/users/me
- PUT /api/users/me
- DELETE /api/users/me
- GET /api/users                (admin)
- PUT /api/users/:id            (admin)
- DELETE /api/users/:id         (admin)

Garages
- GET /api/garages
- GET /api/garages/:id
- GET /api/garages/admin/summary         (admin)
- POST /api/garages                      (admin)
- PUT /api/garages/:id                   (admin)
- PATCH /api/garages/:id/availability    (admin)
- DELETE /api/garages/:id                (admin)

Favorites
- GET /api/favorites
- POST /api/favorites
- DELETE /api/favorites/:id

Comments
- GET /api/comments/garage/:garageId
- POST /api/comments
- DELETE /api/comments/:id

Activity logs
- GET /api/activity-logs/me
- GET /api/activity-logs      (admin)

How to Run frontend
1. Open a terminal in the project folder
2. Run: npm start
3. A link will open in the terminal and you can click it to open the website
4. You will have to create a new user for both admin and regular user
5. Hit Create User and create a new user for both admin and regular user
6. Login as a user and favorite a garage
7. Logout as a regular user and login as an admin
8. Create a new garage and set the filling requirements to auto
9. logout of admin and backin as a user and see the changes made.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
