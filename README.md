### **Online Tutors API**

---

_This is an API for an online platform that connects students around the world with qualified tutors to provide quality learning sessions_

_Current version:_ `v1.0`
_baseURL:_ `https://online-tutors-api.herokuapp.com`
_URL:_ `{baseURL}/api/v1/`
_Request header:_ `Authorization: Bearer {token}`
_Admin Log:_ `admin1@tutors.io: test1234`

---

#### AUTHENTICATION

- **SIGN UP - STUDENT**

  - _URL:_ `/users/signup`
  - _method:_ `POST`
  - _Success Response_

    - _Status code_ `200 Success`
    - _Content_

    ```
    {
        status: 'success',
        token,
        data: {
            user
        }
    }

    ```

  - _Request Example_
    - _Required fields:_ `all fields required`
    ```
    {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
    }
    ```

---

- **SIGN UP - TUTOR**

  - _URL:_ `/users/signup/tutor`
  - _method:_ `POST`
  - _Success Response_

    - _Status code_ `200 Success`
    - _Content_

    ```
    {
        status: 'success',
        token,
        data: {
            user
        }
    }

    ```

  - _Request Example_
    - _Required fields:_ `all fields required`
    ```
    {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
    }
    ```

---

- **LOGIN**

  - _URL:_ `/users/login`
  - _method:_ `POST`
  - _Success Response_

    - _Status code_ `200 Success`
    - _Content_

    ```
    {
        status: 'success',
        token,
        data: {
            user
        }
    }

    ```

  - _Request Example_
    - _Required fields:_ `all fields required`
    ```
    {
        email: "",
        password: "",
    }
    ```
    - _Error Response_
    - _Status code_ `401 Incorrect email or password`

---

#### CATEGORIES

- **CREATE CATEGORY**

  - _URL:_ `/categories`
  - _method:_ `POST`
  - _Success Response_

    - _Status code_ `200 Success`
    - _Content_

    ```
    {
        status: 'success',
        data: {
            data: []
        }
    }

    ```

  - _Request Example_
    - _Required fields:_ `field required`
    ```
    {
        name: ""
    }
    ```

---

- **GET ALL CATEGORIES**

  - _URL:_ `/categories`
  - _method:_ `GET`
  - _params:_ `none`
  - _Success Response_

    - _Status code_ `200 Success`
    - _Content_

    ```
    {
        status: 'success',
        results: number of items,
        data: {
            data: [
                {
                    "_id": "",
                    "name": "category name",
                    "subjects": []
                }
            ]
        }
    }

    ```

---

- **GET CATEGORY**
  - _URL:_ `/categories/:id`
  - _method:_ `GET`
  - _params:_ `id`
  - _Success Response_
    - _Status code_ `200 Success`
    - _Content_
    ```
    {
        status: 'success',
        data: {
            data: [
                {
                    "_id": "",
                    "name": "category name",
                    "subjects": []
                }
            ]
        }
    }
    ```
    - _Error Response_
    - _Status code_ `404 Not Found`

---

- **UPDATE CATEGORY**
  - _URL:_ `/categories/:id`
  - _method:_ `PATCH`
  - _params:_ `id`
  - _Success Response_
    - _Status code_ `200 Success`
    - _Content_
    ```
    {
        status: 'success',
        data: {
            data: [
                {
                    "_id": "",
                    "name": "category name",
                    "subjects": []
                }
            ]
        }
    }
    ```
    - _Request Example_
    - _Required fields:_ `field required`
    ```
    {
        name: ""
    }
    ```
    - _Error Response_
    - _Status code_ `404 Not Found`

---

- **DELETE CATEGORY**
  - _URL:_ `/categories/:id`
  - _method:_ `DELETE`
  - _params:_ `id`
  - _Success Response_
    - _Status code_ `204 No Content`
    - _Content_
    ```
    {
        status: 'success',
        data: {
            data: null
        }
    }
    ```
    - _Error Response_
    - _Status code_ `404 Not Found`

---

- **GET SUBJECTS BY CATEGORY**
  - _URL:_ `/categories/:name/all/subjects`
  - _method:_ `GET`
  - _params:_ `name`
  - _Success Response_
    - _Status code_ `200 Success`
    - _Content_
    ```
    {
        status: 'success',
        data: {
            data: [
                {
                    "_id": "",
                    "subjects": []
                }
            ]
        }
    }
    ```
    - _Error Response_
    - _Status code_ `404 Not Found`

---

- **GET SUBJECT IN A CATEGORY BY ID**
  - _URL:_ `/categories/:name/subjects/:subjectId`
  - _method:_ `GET`
  - _params:_ `name subjectId`
  - _Success Response_
    - _Status code_ `200 Success`
    - _Content_
    ```
    {
        status: 'success',
        data: {
            data: [
                {
                    "_id": "",
                    "name": "...",
                    "category": "..."
                }
            ]
        }
    }
    ```
    - _Error Response_
    - _Status code_ `404 Not Found`

---

- **UPDATE SUBJECT IN A CATEGORY BY ID**
  - _URL:_ `/categories/:name/subjects/:subjectId`
  - _method:_ `PATCH`
  - _params:_ `name subjectId`
  - _Success Response_
    - _Status code_ `200 Success`
    - _Content_
    ```
    {
        status: 'success',
        data: {
            data: [
                {
                    "_id": "",
                    "name": "...",
                    "category": "..."
                }
            ]
        }
    }
    ```
    - _Request Example_
    - _Required fields:_ `field required`
    ```
    {
        name: ""
    }
    ```
    - _Error Response_
    - _Status code_ `404 Not Found`

---

- **DELETE SUBJECT IN A CATEGORY BY ID**
  - _URL:_ `/categories/:name/subjects/:subjectId`
  - _method:_ `DELETE`
  - _params:_ `name subjectId`
  - _Success Response_
    - _Status code_ `204 No Content`
    - _Content_
    ```
    {
        status: 'success',
        data: {
            data: null
        }
    }
    ```
    - _Error Response_
    - _Status code_ `404 Not Found`

---

#### SUBJECTS

- **CREATE SUBJECT**

  - _URL:_ `/subjects`
  - _method:_ `POST`
  - _Success Response_

    - _Status code_ `200 Success`
    - _Content_

    ```
    {
        status: 'success',
        data: {
            data: []
        }
    }

    ```

  - _Request Example_
    - _Required fields:_ `all fields required`
    ```
    {
        name: "",
        category: ""
    }
    ```

---

- **GET ALL SUBJECTS**

  - _URL:_ `/subjects`
  - _method:_ `GET`
  - _params:_ `none`
  - _Success Response_

    - _Status code_ `200 Success`
    - _Content_

    ```
    {
        status: 'success',
        results: number of items,
        data: {
            data: [
                {
                    "_id": "...",
                    "name": "...",
                    "category": "..."
                }
            ]
        }
    }

    ```

---

- **GET SUBJECT**
  - _URL:_ `/subjects/:id`
  - _method:_ `GET`
  - _params:_ `id`
  - _Success Response_
    - _Status code_ `200 Success`
    - _Content_
    ```
    {
        status: 'success',
        data: {
            data: [
                {
                    "_id": "...",
                    "name": "...",
                    "category": {
                        "_id": "...",
                        "name": "..."
                    },
                    "tutors": []
                }
            ]
        }
    }
    ```
    - _Error Response_
    - _Status code_ `404 Not Found`

---

- **UPDATE SUBJECT**
  - _URL:_ `/subjects/:id`
  - _method:_ `PATCH`
  - _params:_ `id`
  - _Success Response_
    - _Status code_ `200 Success`
    - _Content_
    ```
    {
        status: 'success',
        data: {
            data: [
                {
                    "_id": "...",
                    "name": "...",
                    "category": "..."
                }
            ]
        }
    }
    ```
    - _Request Example_
    - _Required fields:_ `field required`
    ```
    {
        name: ""
    }
    ```
    - _Error Response_
    - _Status code_ `404 Not Found`

---

- **DELETE SUBJECT**
  - _URL:_ `/subjects/:id`
  - _method:_ `DELETE`
  - _params:_ `id`
  - _Success Response_
    - _Status code_ `204 No Content`
    - _Content_
    ```
    {
        status: 'success',
        data: {
            data: null
        }
    }
    ```
  - _Error Response_
    - _Status code_ `404 Not Found`

---

- **SEARCH SUBJECT BY NAME**
  - _URL:_ `/subjects?search=name&sort=name`
  - _method:_ `GET`
  - _params:_ `none`
  - _query params:_ `search`
  - _additional query params:_ `sort`
    - `sort by name for ascending order`
  - _Success Response_
    - _Status code_ `200 Success`
    - _Content_
    ```
    {
        status: 'success',
        results: number of items,
        data: {
            data: [
                {
                    "_id": "...",
                    "name": "...",
                    "category": "..."
                }
            ]
        }
    }
    ```

---

- **GET TUTORS REGISTERED TO A SUBJECT**
  - _URL:_ `/subjects/:id/tutors`
  - _method:_ `GET`
  - _params:_ `id`
  - _Success Response_
    - _Status code_ `200 Success`
    - _Content_
    ```
    {
        status: 'success',
        data: {
            data: [
                {
                    "_id": "...",
                    "username": "..."
                }
            ]
        }
    }
    ```

---

- **REGISTER TUTOR TO A SUBJECT**

  - _URL:_ `/subjects/tutor/register`
  - _method:_ `POST`
  - _Success Response_

    - _Status code_ `200 Success`
    - _Content_

    ```
    {
        status: 'success',
        data: {
            data: []
        }
    }

    ```

  - _Request Example_
    - _Required fields:_ `all fields required`
    ```
    {
        tutor: "",
        subject: "",
        category: ""
    }
    ```

---

- **GET ALL REGISTERED SUBJECTS**
  - _URL:_ `/subjects/registered/all`
  - _method:_ `GET`
  - _params:_ `none`
  - _Success Response_
    - _Status code_ `200 Success`
    - _Content_
    ```
    {
        status: 'success',
        data: {
            data: [
                {
                "_id": "...",
                "name": "...",
                "category": "..."
                }
            ]
        }
    }
    ```

---

- **GET A REGISTERED SUBJECT**
  - _URL:_ `/subjects/registered/:id`
  - _method:_ `GET`
  - _params:_ `id`
  - _Success Response_
    - _Status code_ `200 Success`
    - _Content_
    ```
    {
        status: 'success',
        data: {
            data: [
                {
                    "_id": "...",
                    "tutor": {
                        "_id": "...",
                        "username": "...",
                        "email": "...",
                    },
                    "subject": {
                        "_id": "...",
                        "name": "...",
                    },
                    category: {
                        "_id": "...",
                        "name": "...",
                    }
                }
            ]
        }
    }
    ```
  - _Error Response_
    - _Status code_ `404 Not Found`

---

- **UPDATE A REGISTERED SUBJECT**
  - _URL:_ `/subjects/registered/:id`
  - _method:_ `PATCH`
  - _params:_ `id`
  - _Success Response_
    - _Status code_ `200 Success`
    - _Content_
    ```
    {
        status: 'success',
        data: {
            data: [
                {
                    "_id": "...",
                    "tutor": {
                        "_id": "...",
                        "username": "...",
                        "email": "...",
                    },
                    "subject": {
                        "_id": "...",
                        "name": "...",
                    },
                    category: {
                        "_id": "...",
                        "name": "...",
                    }
                }
            ]
        }
    }
    ```
  - _Error Response_
    - _Status code_ `404 Not Found`

---

- **DELETE A REGISTERED SUBJECT**
  - _URL:_ `/subjects/registered/:id`
  - _method:_ `DELETE`
  - _params:_ `id`
  - _Success Response_
    - _Status code_ `204 No Content`
    - _Content_
    ```
    {
        status: 'success',
        data: {
            data: null
        }
    }
    ```
  - _Error Response_
    - _Status code_ `404 Not Found`

---

#### BOOKINGS

- **BOOK A LESSON**

  - _URL:_ `/bookings`
  - _method:_ `POST`
  - _Success Response_

    - _Status code_ `200 Success`
    - _Content_

    ```
    {
        status: 'success',
        data: {
            data: []
        }
    }

    ```

  - _Request Example_
    - _Required fields:_ `all fields required`
    ```
    {
        "subject": "...",
        "student": "...",
        "reserved":
            {
                "from": "2020-05-10",
                "to": "2020-05-15"
            }
    }
    ```

---

- **GET ALL LESSON BOOKINGS**
  - _URL:_ `/bookings`
  - _method:_ `GET`
  - _params:_ `none`
  - _Success Response_
    - _Status code_ `200 Success`
    - _Content_
    ```
    {
        status: 'success',
        results: "number of items"
        data: {
            data: [
                {
                    "_id": "...",
                    "subject": {
                        "_id": "...",
                        "name": "..."
                    },
                    "student": "..."
                }
            ]
        }
    }
    ```

---

- **GET A LESSON**
  - _URL:_ `/bookings/:id`
  - _method:_ `GET`
  - _params:_ `id`
  - _Success Response_
    - _Status code_ `200 Success`
    - _Content_
    ```
    {
        status: 'success',
        data: {
            data: [
                {
                    "_id": "...",
                    "subject": {
                        "_id": "...",
                        "name": "..."
                    },
                    "student": {
                        "_id": "...",
                        "username": "...",
                        "email": "..."
                    },
                }
            ]
        }
    }
    ```
  - _Error Response_
    - _Status code_ `404 Not Found`

---

- **UPDATE A LESSON**
  - _URL:_ `/bookings/:id`
  - _method:_ `PATCH`
  - _params:_ `id`
  - _Success Response_
    - _Status code_ `200 Success`
    - _Content_
    ```
    {
        status: 'success',
        data: {
            data: [
                {
                    "_id": "...",
                    "subject": {
                        "_id": "...",
                        "name": "..."
                    },
                    "student": {
                        "_id": "...",
                        "username": "...",
                        "email": "..."
                    },
                }
            ]
        }
    }
    ```
  - _Error Response_
    - _Status code_ `404 Not Found`

---

- **DELETE A LESSON**
  - _URL:_ `/bookings/:id`
  - _method:_ `DELETE`
  - _params:_ `id`
  - _Success Response_
    - _Status code_ `204 No Content`
    - _Content_
    ```
    {
        status: 'success',
        data: {
            data: null
        }
    }
    ```
  - _Error Response_
    - _Status code_ `404 Not Found`

---

- **GET USERS**
  - _URL:_ `/users/`
  - _method:_ `GET`
  - _params:_ `none`
  - _Success Response_
    - _Status code_ `200 Success`
    - _Content_
    ```
    {
        status: 'success',
        data: {
            data: []
        }
    }
    ```

---

- **GET USERS BY ID**
  - _URL:_ `/users/:id`
  - _method:_ `GET`
  - _params:_ `id`
  - _Success Response_
    - _Status code_ `200 Success`
    - _Content_
    ```
    {
        status: 'success',
        data: {
            data: [
                {
                    "_id": "...",
                    "username": "...",
                    "firstName": "...",
                    "lastName": "...",
                    "email": "...",
                    "lessons": [],
                    "subjects": []
                }
            ]
        }
    }
    ```
    - _Error Response_
    - _Status code_ `404 Not Found`

---

- **UPDATE USERS BY ID**
  - _URL:_ `/users/:id`
  - _method:_ `PATCH`
  - _params:_ `id`
  - _Success Response_
    - _Status code_ `200 Success`
    - _Content_
    ```
    {
        status: 'success',
        data: {
            data: [
                {
                    "_id": "...",
                    "username": "...",
                    "firstName": "...",
                    "lastName": "...",
                    "email": "...",
                    "lessons": [],
                    "subjects": []
                }
            ]
        }
    }
    ```
    - _Error Response_
    - _Status code_ `404 Not Found`

---

- **DELETE USERS BY ID**
  - _URL:_ `/users/:id`
  - _method:_ `DELETE`
  - _params:_ `id`
  - _Success Response_
    - _Status code_ `204 No Content`
    - _Content_
    ```
    {
        status: 'success',
        data: null
    }
    ```
    - _Error Response_
    - _Status code_ `404 Not Found`

---

- **GET ALL TUTORS**
  - _URL:_ `/users/tutors/all`
  - _method:_ `GET`
  - _params:_ `none`
  - _Success Response_
    - _Status code_ `200 Success`
    - _Content_
    ```
    {
        status: 'success',
        data: {
            data: [
                {
                    "_id": "...",
                    "username": "...",
                    "firstName": "...",
                    "lastName": "...",
                    "email": "...",
                }
            ]
        }
    }
    ```

---

- **SEARCH TUTOR BY NAME**
  - _URL:_ `/users/tutors?search=name`
  - _method:_ `GET`
  - _params:_ `none`
  - _query params:_ `search`
  - _Success Response_
    - _Status code_ `200 Success`
    - _Content_
    ```
    {
        status: 'success',
        results: number of items,
        data: {
            data: [
                {
                    "_id": "...",
                    "username": "...",
                    "firstName": "...",
                    "lastName": "...",
                    "email": "...",
                }
            ]
        }
    }
    ```
    ***
- **DEACTIVATE TUTOR BY ID**
  - _URL:_ `/users/tutors/:id/deactivate`
  - _method:_ `PATCH`
  - _params:_ `id`
  - _Success Response_
    - _Status code_ `204 No Content`
    - _Content_
    ```
    {
        status: 'success',
        data: null
    }
    ```

---

- **MAKE TUTOR ADMIN**
  - _URL:_ `/users/tutors/:id/make-admin`
  - _method:_ `PATCH`
  - _params:_ `id`
  - _Success Response_
    - _Status code_ `200 Success`
    - _Content_
    ```
    {
        status: 'success',
        data: {
            data: {
                "_id": "...",
                "username": "...",
                "firstName": "...",
                "lastName": "...",
                "role": "admin",
                "email": "...",
            }
        }
    }
    ```
