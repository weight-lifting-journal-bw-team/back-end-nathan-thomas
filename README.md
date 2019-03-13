# WEIGHT LIFTING JOURNAL BACK-END SERVER

## Introduction

This repository contains the back-end and all associated server files for the Weight Lifting Journal application.

## Project Management

Check out the [Trello](https://trello.com/b/iULA29CO/weight-lifting-journal-back-end) board for information about the status of this repository and remaining tasks to be completed.

## Table of Contents

- [Test User Accounts](#test-user-accounts)
- [Summary Table of API Endpoints](#summary-table-of-api-endpoints)
- [Auth Routes](#auth-routes)
  - [Register](#register)
  - [Login](#login)
- [Users Routes](#users-routes)
  - [Get Users](#get-users)
  - [Get User](#get-user)
  - [Update User](#update-user)
  - [Delete User](#delete-user)
- [Journals Routes](#journals-routes)
  - [Get Journals](#get-journals)
  - [Get Journal by ID](#get-journal-by-id)
  - [Create Journal](#create-journal)
  - [Update Journal](#update-journal)
  - [Delete Journal](#delete-journal)

# DATA SCHEMA (DATA STRUCTURES)

`Users`

```
{
  "id": 1,                                  // Integer (primary key provided by server and autoincrements)
  "username": "admin",                      // String, required
  "password": "password",                   // String, required
  "firstName": "admin",                     // String, required
  "lastName": "istrator",                   // String, required
  "email": "email@gmail.com"                // String, required
}
```

`Journals`

```
{
  "id": 1,                                  // Integer (primary key provided by server and autoincrements)
  "date": "Jan 20, 2019,                    // String, required
  "region": "Legs",                         // String
  "userId": 1                               // Integer, required (foreign key reference to "users" table)
}
```

`Exercises`

```
{
  "id": 1,                                  // Integer (primary key provided by server and autoincrements)
  "journalId": 1,                           // Integer, required (foreign key reference to "users" table)
  "userId": 1,                              // Integer, required
  "name": "Squats",                         // String
  "reps": 10,                               // Integer
  "sets": 5,                                // Integer
  "weight": 200                             // Integer
}
```

_All workouts measurements are stored using the following measurements:_

```
  weight = pounds

```

# TEST USER ACCOUNTS

`Users`

```
  username: admin
  password: password

  username: mcfly
  password: password

  username: bigdoc
  password: password

```

# SUMMARY TABLE OF API ENDPOINTS

| Table     | Method | Endpoint                              | Description                                                                                                                                                                                    |
| --------- | ------ | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| auth      | POST   | /api/auth/register                    | Creates a new `user` profile using the information sent inside the `body` of the request and returns a message along with the new `user` and a JSON Web Token in the `body` of the response.   |
| auth      | POST   | /api/auth/login                       | Uses the credentials sent inside the `body` to authenticate the user. On successful login, returns a message with the `user` profile and a JSON Web Token token in the `body` of the response. |
| users     | GET    | /api/restricted/users                 | Retrieves an array of `user` objects and returns a message with the array in the `body` of the response.                                                                                       |
| users     | GET    | /api/restricted/users/:id             | Retrieves a single `user` object and returns a message with the object inside the `body` of the response.                                                                                      |
| users     | PUT    | /api/restricted/users/:id             | Updates a `user` in the database using the information sent inside the `body` of the request and returns a message with the updated `user` profile.                                            |
| users     | DELETE | /api/restricted/users/:id             | Removes a `user` from the database using the id sent in the URL parameters of the response.                                                                                                    |
| journals  | GET    | /api/restricted/journals              | Retrieves an array of `journal` objects and returns a message with the array in the `body` of the response.                                                                                    |
| journals  | GET    | /api/restricted/journals/:id          | Retrieves a single `journal` object using the id sent in the URL parameters of the request and returns a message with the object inside the `body` of the response.                            |
| journals  | POST   | /api/restricted/journals              | Uses the information sent inside the `body` to create a new `journal` for a specified user by included `userId` and returns a message along with the new `journal`.                            |
| journals  | PUT    | /api/restricted/journals/:id          | Uses the information sent inside the `body` to update a single `journal` using the id sent in the URL parameters of the request and returns a message along with the updated `journal`.        |
| journals  | DELETE | /api/restricted/journals/:id          | Removes a `journal` in the database using the id sent in the URL parameters of the request.                                                                                                    |
| exercises | GET    | /api/restricted/exercises             | Retrieves an array of `exercise` objects and returns a message with the array in the `body` of the response.                                                                                   |
| exercises | GET    | /api/restricted/exercises/journal/:id | Retrieves a single `journal` object's `exercises` using the id sent in the URL parameters of the request and returns a message with the `exercises` inside the `body` of the response.         |
| exercises | GET    | /api/restricted/exercises/:id         | Retrieves a single `exercise` object and returns a message with the object in the `body` of the response.                                                                                      |
| exercises | POST   | /api/restricted/exercises             | Uses the information sent inside the `body` to create a new `exercise` for a specified user by included `userId` and returns a message along with the new `exercise`.                          |
| exercises | PUT    | /api/restricted/exercises/:id         | Uses the information sent inside the `body` to update a single `exercise` using the id sent in the URL parameters of the request and returns a message along with the updated `exercise`.      |
| exercises | DELETE | /api/restricted/exercises/:id         | Removes an `exercise` in the database using the id sent in the URL parameters of the request.                                                                                                  |

# AUTH ROUTES

## **REGISTER**

### **Registers a user**

_Method Url:_ `/api/auth/register`

_HTTP method:_ **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name        | type   | required | description    |
| ----------- | ------ | -------- | -------------- |
| `username`  | String | Yes      | Must be unique |
| `password`  | String | Yes      |                |
| `firstName` | String | Yes      |                |
| `lastName`  | String | Yes      |                |
| `email`     | String | Yes      | Must be unique |

_example:_

```
{
  "username": "lauren",
  "password": "password123",
  "firstName": "admin",
  "lastName": "istrator",
  "email": "email@gmail.com"
}
```

#### Response

##### 200 (OK)

> If you successfully register a user the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "error": false,
  "message": "Your account was created successfully."
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI3IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MzM1NjUxLCJleHAiOjE1NzU4OTMyNTF9.uqd2OHBYkGQpwjLTPPiPWYkYOKlG7whQDFkk46xFXoX",
  "user": {
    "id": 1,
    "username": "admin",
    "firstName": "admin",
    "lastName": "istrator",
    "email": "email@gmail.com",
    "created_at": "2019-03-09 08:26:34",
    "updated_at": "2019-03-09 08:26:34"
  }
}
```

##### 406 (Not Acceptable)

> If you are missing a username, password, first name, last name, or email for registration, the endpoint will return an HTTP response with a status code `406` and a body as below.

```
{
  "error": true,
  "user": {},
  "message": "Please include required credentials and try again.."
}
```

##### 409 (Conflict)

> If the submitted username or email is a duplicate of what is already in the database, the endpoint will return an HTTP response with a status code `409` and a body as below.

```
{
  "error": true,
  "usernameError": <true/false depending on if username is duplicate>,
  "emailError": <true/false depending on if email is duplicate>,
  "message": "Sorry, that <username and/or email> already exists."
}
```

##### 404 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "user": {},
  "message": "Your account could not be created in the database."
}
```

##### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "user": {},
  "message": "There was a problem with your request."
}
```

---

## **LOGIN**

### **Logs a user in**

_Method Url:_ `/api/auth/login`

_HTTP method:_ **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name       | type   | required | description                                                           |
| ---------- | ------ | -------- | --------------------------------------------------------------------- |
| `username` | String | Yes      | Must match a username in the database                                 |
| `password` | String | Yes      | Must match a password in the database corresponding to above username |

_example:_

```
{
  "username": "mcfly",
  "password": "password"
}
```

#### Response

##### 200 (OK)

> If you successfully login, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "error": false,
  "message": "You were logged in successfully."
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MDwiaWF0IjoxNTQ0MzM1NjUxLCJleHAuOjE1NzU4OTMyNTF9.uqd2OHBYkGQpwjLTPPiPWYkYOKlG7whQDFkk46xGXnE",
  "user": {
    "user_id": 1,
    "username": "nwthomas",
    "first_name": "nathan",
    "last_name": "thomas",
    "email": "nwthomas@me.com",
    "created_at": "2019-03-09 08:26:34",
    "updated_at": "2019-03-09 08:26:34"
  }
}
```

##### 406 (Not Acceptable)

> If you are missing a username or password for login, the endpoint will return an HTTP response with a status code `406` and a body as below.

```
{
  "error": true,
  "user": {},
  "message": "Please include a username and password and try again."
}
```

##### 404 (Not Found)

> If you send in an email address that does not match one in the database or the passwords do not match, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "user": {},
  "message": "Sorry, you could not be logged in."
}
```

##### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "user": {},
  "message": "There was a problem with your request."
}
```

---

# USERS ROUTES

## **GET USERS**

### **Get all users**

_Method Url:_ `/api/restricted/users`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Response

##### 200 (OK)

> If users are found in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "error": false,
  "message": "The users were found in the database.",
  "users": [
    {
      "id": 1,
      "username": "admin",
      "firstName": "admin",
      "lastName": "istrator",
      "email": "email@gmail.com",
      "created_at": "2019-03-11T04:18:42.916Z",
      "updated_at": "2019-03-11T04:18:42.916Z"
    },
    {
      "id": 2,
      "username": "mcfly",
      "firstName": "Marty",
      "lastName": "McFly",
      "email": "thelibyans@gmail.com",
      "created_at": "2019-03-11T04:18:42.916Z",
      "updated_at": "2019-03-11T04:18:42.916Z"
    }
}
```

##### 404 (Not Found)

> If there are no users in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "user": [],
  "message": "The users could not be found in the database."
}
```

##### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "user": [],
  "message": "There was a problem with your request."
}
```

---

## **GET USER**

### **Get user by user ID**

_Method Url:_ `/api/auth/register/:id`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name      | type    | required | description           |
| --------- | ------- | -------- | --------------------- |
| `user_id` | Integer | Yes      | ID of a specific user |

#### Response

##### 200 (OK)

> If a user with the specified ID in the URL parameters is found in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "error": false,
  "message": "Your profile was retrieved successfully."
  "user": {
    "id": 1,
    "username": "admin",
    "firstName": "admin",
    "lastName": "istrator",
    "email": "email@gmail.com",
    "created_at": "2019-03-09 08:26:34",
    "updated_at": "2019-03-09 08:26:34"
  }
}
```

##### 404 (Bad Request)

> If the requested profile does not exist, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "user": {},
  "message": "Your profile could not be found in the database."
}
```

##### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "user": {},
  "message": "There was an error processing your request."
}
```

---

## **UPDATE USER**

### **Update user by user ID**

_Method Url:_ `/api/auth/register/:id`

_HTTP method:_ **[PUT]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name | type    | required | description           |
| ---- | ------- | -------- | --------------------- |
| `id` | Integer | Yes      | ID of a specific user |

#### Body

| name         | type   | required | description    |
| ------------ | ------ | -------- | -------------- |
| `username`   | String | Yes      | Must be unique |
| `password`   | String | Yes      |                |
| `first_name` | String | Yes      |                |
| `last_name`  | String | Yes      |                |
| `email`      | String | Yes      | Must be unique |

#### Response

##### 200 (OK)

> If a user with the specified ID in the URL parameters is updated successfully in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "error": false,
  "message": "Your profile was updated successfully.",
  "numUpdated": 1,
  "user": {
    "id": 1,
    "username": "admin",
    "firstName": "admin",
    "lastName": "istrator",
    "email": "email@gmail.com",
    "created_at": "2019-03-09 08:26:34",
    "updated_at": "2019-03-09 08:26:34"
  }
}
```

##### 406 (Not Acceptable)

> If the required data to update the user are not sent in the body, the endpoint will return an HTTP response with a status code `406` and a body as below.

```
{
  "error": true,
  "user": {},
  "message": "Please include all required fields and try again.",
  "numUpdated": 0
}
```

##### 404 (Bad Request)

> If the profile cannot be found in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "user": {},
  "message": "Your profile could not be updated.",
  "numUpdated": 0
}
```

##### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "user": {},
  "message": "There was an error processing your request.",
  "numUpdated": 0
}
```

---

## **DELETE USER**

### **Delete user by user ID**

_Method Url:_ `/api/auth/register/:id`

_HTTP method:_ **[DELETE]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name | type    | required | description           |
| ---- | ------- | -------- | --------------------- |
| `id` | Integer | Yes      | ID of a specific user |

#### Response

##### 200 (OK)

> If the user with the specified ID in the URL parameters is deleted successfully in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "error": false,
  "message": "Your profile was deleted successfully.",
  "numDeleted": 1,
}
```

##### 404 (Bad Request)

> If the profile cannot be found in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "message": "Your profile could not be deleted.",
  "numDeleted": 0
}
```

##### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "message": "There was an error processing your request.",
  numDeleted: 0
}
```

---

# JOURNAL ROUTES

## **GET JOURNALS**

### **Get all journals**

_Method Url:_ `/api/restricted/journals`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Response

##### 200 (OK)

> If journals are found in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "error": false,
  "message": "The journals were retrieved successfully.",
  "workouts": [
      {
          "id": 1,
          "date": "Jan 20, 2019",
          "region": "Legs"
          "userId": 2,
          "created_at": "2019-03-11T06:43:05.407Z",
          "updated_at": "2019-03-11T06:43:05.407Z"
      },
      {
          "id": 2,
          "date": "Dec 19, 2017",
          "region": "Full Body",
          "userId": 3,
          "created_at": "2019-03-11T06:43:05.407Z",
          "updated_at": "2019-03-11T06:43:05.407Z"
      }
  ]
}
```

##### 404 (Not Found)

> If there are no journals in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "journals": [],
  "message": "The journals could not be found."
}
```

##### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "journals": [],
  "message": "There was a problem with your request."
}
```

---

## **GET JOURNAL**

### **Get workout by workout ID**

_Method Url:_ `/api/restricted/journals/:id`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name | type    | required | description              |
| ---- | ------- | -------- | ------------------------ |
| `id` | Integer | Yes      | ID of a specific journal |

#### Response

##### 200 (OK)

> If the journal is found in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "error": false,
  "message": "Your journal was retrieved successfully.",
  "journal": {
      "id": 1,
      "date": "Jan 20, 2019",
      "region": "Legs",
      "userId": 2,
      "created_at": "2019-03-11T06:43:05.407Z",
      "updated_at": "2019-03-11T06:43:05.407Z"
  }
}
```

##### 404 (Not Found)

> If the journal cannot be found in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "journal": {},
  "message": "Your workout could not be found."
}
```

##### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "journal": {},
  "message": "There was a problem with your request."
}
```

---

## **CREATE JOURNAL**

### **Create new journal for user**

_Method Url:_ `/api/restricted/journals/`

_HTTP method:_ **[POST]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Body

| name     | type    | required | description                         |
| -------- | ------- | -------- | ----------------------------------- |
| `date`   | String  | Yes      | i.e. "Jan 20, 2019"                 |
| `region` | String  | No       |                                     |
| `userId` | Integer | Yes      | Foreign key reference to user table |

_example_

```
{
  "date": "Jan 20, 2019",
  "region": "Legs",
  "userId": 2,
}
```

#### Response

##### 200 (OK)

> If the journal is successfully created, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "error": false,
  "message": "Your journal was created successfully.",
  "journal": {
    "id": 1,
    "date": "Jan 20, 2019",
    "region": "Legs",
    "userId": 2,
    "created_at": "2019-03-11T06:43:05.407Z",
    "updated_at": "2019-03-11T06:43:05.407Z"
  }
}
```

##### 406 (Not Acceptable)

> If the required data to create the journal is not sent in the body, the endpoint will return an HTTP response with a status code `406` and a body as below.

```
{
  "error": true,
  "journal": [],
  "message": "Please include required journal information and try again."
}
```

##### 404 (Not Found)

> If the journal cannot be created, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "journal": [],
  "message": "The journal could not be created."
}
```

##### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "journal": [],
  "message": "There was a problem with your request."
}
```

---

## **UPDATE WORKOUT**

### **Update workout by workout ID**

_Method Url:_ `/api/restricted/workouts/:id`

_HTTP method:_ **[PUT]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name | type    | required | description              |
| ---- | ------- | -------- | ------------------------ |
| `id` | Integer | Yes      | ID of a specific journal |

#### Body

| name     | type    | required | description                         |
| -------- | ------- | -------- | ----------------------------------- |
| `date`   | String  | Yes      | i.e. "Jan 20, 2019"                 |
| `region` | String  | No       |                                     |
| `userId` | Integer | Yes      | Foreign key reference to user table |

_example_

```
{
  "date": "Jan 20, 2019",
  "region": "Legs",
  "userId": 2,
}
```

#### Response

##### 200 (OK)

> If the journal is successfully updated the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "error": false,
  "message": "Your journal was updated successfully.",
  "journal": {
      "id": 17,
      "date": "Jan 2000, 2019",
      "region": "Legs Update",
      "userId": 1,
      "created_at": "2019-03-13T22:55:10.082Z",
      "updated_at": "2019-03-13T22:55:10.082Z"
  }
}
```

##### 406 (Not Acceptable)

> If the required data to update the journal is not sent in the body, the endpoint will return an HTTP response with a status code `406` and a body as below.

```
{
  "error": true,
  "journal": [],
  "message": "Please include required journal information and try again."
}
```

##### 404 (Not Found)

> If no journalfor the specified user can be found in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "journal": [],
  "message": "Your journal could not be found to be updated."
}
```

##### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "journal": [],
  "message": "There was a problem with your request."
}
```

---

## **DELETE WORKOUT**

### **Delete workout by workout ID**

_Method Url:_ `/api/restricted/workouts/:id`

_HTTP method:_ **[DELETE]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name         | type    | required | description              |
| ------------ | ------- | -------- | ------------------------ |
| `workout_id` | Integer | Yes      | ID of a specific workout |

#### Response

##### 200 (OK)

> If the workout is found in the database and deleted, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "error": false,
  "message": "Your workout was deleted successfully.",
  "numDeleted": 1
}
```

##### 404 (Not Found)

> If no workouts for the specified user can be found in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "message": "Your workout could not be found to be deleted.",
  "numDeleted": 0
}
```

##### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "message": "There was a problem with your request.",
  "numDeleted": 0
}
```

---

If you made it all the way down here, you're a champ. Thanks for using my API.

- Nathan Thomas
