# Weight Lifting Journal Back-End

## Table of Contents

- [Data Schema](#data-schema-data-structures)
- [Test User Accounts](#test-user-accounts)
- [Summary Table of API Endpoints](#summary-table-of-api-endpoints)
- [Auth Routes](#auth-routes)
- [User Routes](#user-routes)

# DATA SCHEMA (DATA STRUCTURES)

Complete data modeling and schema mockup can be found [here](https://www.dbdesigner.net/designer/schema/233119).

`Users`

```
  {
    "user_id": 1,                             // Integer, provided by server and autoincrements
    "username": "admin",                      // String, required
    "password": "password",                   // String, required
    "first_name": "admin",                    // String, required
    "last_name": "istrator",                  // String, required
    "email": "email@gmail.com"                // String, required
  }
```

`Workouts`

```
  {
    "workout_id": 1,                          // Integer, provided by server and autoincrements
    "workout_name": "Killing it",             // String, required
    "workout_date": 1552119140250,            // Integer, required
    "workout_type": "Weight Lifting",         // String
    "workout_subtype": "Squats",              // String
    "workout_sets": 5,                        // Integer
    "workout_reps": 8,                        // Integer
    "workout_time": 60,                       // Integer
    "workout_distance": 50,                   // Integer
    "workout_notes": "Awesome time.",         // String
    "body_region": "Legs",                    // String
    "max_weight": 200                         // Integer
  }
```

# TEST USER ACCOUNTS

`Users`

```
  username: admin
  password: password

  username: wehavetogoback
  password: password

  username: big_doc
  password: password

```

# SUMMARY TABLE OF API ENDPOINTS

| Method | Endpoint                  | Description                                                                                                                                                |
| ------ | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | /api/auth/register        | Creates a new `user` using the information sent inside the `body` of the request.                                                                          |
| POST   | /api/auth/login           | Uses the credentials sent inside the `body` to authenticate the user. On successful login, returns a message with the username and a JSON Wev Token token. |
| GET    | /api/restricted/users     | Retrieves an array of `user` objects and returns a message with the array in the `body` of the request.                                                    |
| GET    | /api/restricted/users/:id | Retrieves a single `user` object and returns a message with the object inside the `body` of the request.                                                   |
| PUT    | /api/restricted/users/:id | Updates a `user` in the database using the information sent inside the `body` of the request.                                                              |
| DELETE | /api/restricted/users/:id | Removes a `user` from the database using the id sent in the URL parameters of the request.                                                                 |

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

| name         | type   | required | description    |
| ------------ | ------ | -------- | -------------- |
| `username`   | String | Yes      | Must be unique |
| `password`   | String | Yes      |                |
| `first_name` | String | Yes      |                |
| `last_name`  | String | Yes      |                |
| `email`      | String | Yes      |                |

_example:_

```
{
  username: "lauren",
  password: "password123",

}
```

#### Response

##### 200 (OK)

> If you successfully register a user the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "message": "The account was created successfully."
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MzM1NjUxLCJleHAiOjE1NzU4OTMyNTF9.uqd2OHBYkGQpwjLTPPiPWYkYOKlG7whQDFkk46xGXoE",
  "user": {
    "id": 1,
    "username": "lauren"
  }
}
```

##### 406 (Not Acceptable)

> If you are missing a username or password for registration, the endpoitn will return an HTTP response with a status code `406` and a body as below.

```
{
  "error": true,
  "message": "Please include a username and password and try again."
}
```

##### 404 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.

```
{
  "error": true,
  "message": "The account could not be created in the database."
}
```

##### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
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
  username: "admin",
  password: "password123"
}
```

#### Response

##### 200 (OK)

> If you successfully login, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MzM1NjUxLCJleHAiOjE1NzU4OTMyNTF9.uqd2OHBYkGQpwjLTPPiPWYkYOKlG7whQDFkk46xGXoE",
  "message": "The user was logged in successfully",
  "user": {
    "id": 1,
    "username": "lauren"
  }
}
```

##### 406 (Not Acceptable)

> If you are missing a username or password for registration, the endpoitn will return an HTTP response with a status code `406` and a body as below.

```
{
  "error": true,
  "message": "Please include a username and password and try again."
}
```

##### 404 (Not Found)

> If you send in an email address that does not match one in the database or the passwords do not match, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
  "error": true,
  "message": "The requested content does not exist."
}
```

##### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
  "error": true,
  "message": "There was a problem with your request."
}
```

---

## **UPDATE USER**

### Updates the username or password of a user

_Method Url:_ `/api/auth/update`
_HTTP method:_ **[PATCH]**

#### Headers

| name            | type   | required | description                    |
| --------------- | ------ | -------- | ------------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json       |
| `Authorization` | String | No       | Bearer JWT authorization token |

#### Body

| name              | type   | required | description                                                       |
| ----------------- | ------ | -------- | ----------------------------------------------------------------- |
| `newUsername`     | String | No       | Only include if you would like to change the username of the user |
| `currentPassword` | String | Yes      | Must match a password in the logged in user                       |
| `newPassword`     | String | No       | Only include if you would like to change the password of the user |

_example:_

```
{
  newUsername: "dinolaur",
  currentPassword: "password123",
  newPassword: "password1234"
}
```

#### Response

##### 200 (OK)

> If you successfully update the user information and change the password, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTQ1MTEzMDMxLCJleHAiOjE1NzY2NzA2MzF9.C1oMA1D2qdLLaPSfvEWU5LaXCABVf2DBWomQ1tUQDgU",
  "user": {
    "id": 2
  }
}
```

> > If you successfully update the user information and change just the username, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "user": {
    "id": 2,
    "username": "dinolaur"
  }
}
```

##### 400 (Bad Request)

> If you send in invalid fields or the password of the user corresponding to the token does not match the currentPassword field, the endpoint will return an HTTP response with a status code `400` and a body as below.

```
{
  "error": true,
  "message": "There was a problem with your request."
}
```

##### 401 (Unauthorized)

> If you are not logged in, then endpoint will return an HTTP response with a status code `401` and a body as below.

```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

---

# USER ROUTES

## **GET ALL USERS**

### **Gets an array of user objects**

_Method Url:_ `/api/restricted/users`

_HTTP method:_ **[GET]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Parameters

| name    | type   | required | description                                                    |
| ------- | ------ | -------- | -------------------------------------------------------------- |
| `topic` | String | No       | Query parameters in order to receive quizzes of specific topic |

#### Response

##### 200 (OK)

```
[
  {

  }
]
```

---
