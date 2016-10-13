import express from 'express';
let router = express.Router();
let user_controller = require('../controllers/users');

router.route('/')
    .get(user_controller.apiGET)
    .post(user_controller.apiPOST);

module.exports = router;
