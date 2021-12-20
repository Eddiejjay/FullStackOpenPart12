const express = require('express');
const router = express.Router();
const redis = require('../redis')

const configs = require('../util/config')

let visits = 0

router.get('/statistics', async (req, res) => {
  const todo_count = await redis.getAsync("added_todos")
  res.send({ added_todos: todo_count? Number(todo_count) :0 });
});
/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits,
  });
});

module.exports = router;
