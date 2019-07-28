const express = require('express');
const router = express.Router({mergeParams: true});

const { getIngredients } = require('../handlers/ingredients')

router.route('/').get(getIngredients);

module.exports = router;