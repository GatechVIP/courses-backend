# courses-backend

Welcome to courses-backend, an express server setup to deliver information on Georgia Tech courses.

To run the server, navigate to the root directory of the application in the cli and run the command `node app.js`. It is configured to run locally on port number 8080.

## Using the routes

### Static Course Info

For a list of all courses:

`/api/course`

For accessing a list of courses from one subject:

`/api/course/:subject`

For example, `/api/course/ACCT`

For accessing a specific course:

`/api/course/:subject/:number`

For example, `/api/course/ACCT/2101`

### Database Query

This app uses `mongodb` as its database type. The app assumes that the database has a collection called `courses` which contains documents of the following structure:
```json
{
  "subject": "ACCT",
  "number": "2101",
  "description": "Short description.",
  "name": "Accounting I"
}
```


To access this data from the database, use the same queries used for the static info, with the following change to the route:

<pre>
/api/<b>db</b>/course/...
</pre>


For example, `api/db/course/ACCT/2101`


### Course Critique Query

There is also a route that queries the [coursecritique](https://critique.gatech.edu/) website:

`/api/coursecritique/:id`

For example `/api/coursecritique/ACCT2101`.
