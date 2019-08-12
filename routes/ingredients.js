const express = require('express');
const router = express.Router({mergeParams: true});

const { getIngredients, createIngredient } = require('../handlers/ingredients')

router.route('/')
    .get(getIngredients)
    .post(createIngredient);

module.exports = router;