import React from 'react';
import express from 'express';
let router = express.Router();

/* GET home page. */
router.get('*', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/chicken', (req, res, next) => {
  res.render('chicken', { title: 'Express' });
});

router.get('/coffee', (req, res, next) => {
  res.render('coffee', { title: 'Express' });
});

router.get('/socket_link', (req, res, next) => {
  res.render('socket_link', { title: 'DOMenu' });
});

module.exports = router;
