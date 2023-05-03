# Ecommerce Project using React and Express

## Overview

This is a simple server created with Express and MongoDB. The idea was to create a website where the front-end application takes the resources of its products byS http requests. The server is currently hosted here: https://home-pc.emipellegrino.com/api

You will found the updated code of front-end app [here](https://github.com/Aonik10/shoes-ecommerce)

## Upcoming features to be added

- Add a route to obtain a recovery password.
- Upgrade userSchema's model to contain new properties as payment methods or favourites products.
- Create routes to update some properties of each user.

## About the database

The database was built with MongoDB and mongoose. You'll have basics models for products and users, where:

```js
const productSchema = new Schema(
    {
        model: String,
        gender: String,
        price: Number,
        rating: Number,
        stock: Object,
        imgs: Object,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);
```
and

```js
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        data: {
            name: String,
            lastname: String,
            city: String,
            address: String,
            postalCode: String,
            phoneNumber: String,
            profilePhoto: String,
        },
        cart: [],
        purchases: [],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);
```

All images sources are hosted [here](https://freeimage.host/emilianopellegri)

## Setting up

If you want to host this server locally, you have to clone this repository and install dependencies.

```bash
git clone https://github.com/Aonik10/shoes-ecommerce-server.git
cd shoes-ecommerce-server
npm install
node src/index.js
```

Note that you can also install nodemon and run it with 

```bash
nodemon src/index.js
```

Make sure to have MongoDB installed in your system.

Then, you can create users by HTTP POST requests to the route ```http://{SERVER_URL}/api/user/create```, where the body must follow this format:

```json
{
  "username": "user@shoesecommerce.com",
  "password": "password123456",
  "data": {
      "name": "AnyName",
      "lastname": "AnyLastname",
      "profilePhoto": "An url to a photo like this one: https://iili.io/HkDmMla.jpg"
  }
}
```

Also, you can create products usign HTTP POST requests to the route ```http://{SERVER_URL}/api/collections```, and the body must follow this json format.

```json
{
  "model": "Name of the product",
  "gender": "women / men (choose one)",
  "price": 138,
  "rating": 5,
  "stock": {
      "35": 1,
      "36": 0,
      "37": 1,
      "38": 1,
      "39": 2,
      "40": 1,
      "41": 1,
      "42": 0,
      "43": 3,
      "44": 4,
      "45": 0,
      "46": 2,
      "47": 5,
      "48": 3
  },
  "imgs": {
      "side": "https://iili.io/HvtIuiQ.webp",
      "diagonal": "https://iili.io/HvtITWx.webp",
      "top": "https://iili.io/HvtIRfV.jpg",
      "bottom": "https://iili.io/HvtIIxj.webp"
  }
}
```

Make sure to include ```Content-Type: application/json``` as a header in your POST HTTP requests