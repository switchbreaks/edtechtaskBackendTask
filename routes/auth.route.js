const express = require('express');
const routes = express.Router();
const authModule = require("../modules/auth/auth.js");


routes.post('/register', authModule.register);
routes.post('/login', authModule.login);

module.exports = routes;