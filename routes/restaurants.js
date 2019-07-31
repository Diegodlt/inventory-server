const express = require('express');
const router = express.Router({mergeParams: true});

const { createRestaurant, getRestaurants } = require('../handlers/restaurants');

router.route('')
    .get(getRestaurants)
    .post(createRestaurant);


module.exports = router;
