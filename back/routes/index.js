const { Router } = require('express');

const controller = require('../controllers/controller');

const router = Router();

module.exports = () => {

  router.route('/users')
    .get(controller.get)
    .post(controller.post)

  return router;
}