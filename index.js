require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const ingredientsRoutes = require('./routes/ingredients');
const restaurantRoutes = require('./routes/restaurants');
const { loginRequired, ensureCorrectUser } = require('./middleware/check-auth');

const PORT = 3200;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.send("Hello World!");
});

app.use('/api/auth', authRoutes);

app.use(
    '/api/users/:id/restaurants',
    loginRequired,
    ensureCorrectUser,
    restaurantRoutes
);

app.use(
    '/api/users/:id/:restaurantId/ingredients', 
    loginRequired,
    ensureCorrectUser,
    ingredientsRoutes
);

app.use((req, res, next)=>{
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(errorHandler);


app.listen(PORT,()=>{
    console.log("Server is running...");
})