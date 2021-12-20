const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  const added_todos = await redis.getAsync('added_todos');
  console.log("added todos",added_todos)
  await redis.setAsync('added_todos', Number(added_todos) + 1);
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo).status(200);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const body = req.body
  const updatedTodo = await Todo.findByIdAndUpdate(req.todo.id,body, {new: true })
  .catch((error) => {
    res.send(error).status(400)
  })
  res.send(updatedTodo).status(204); // Implement this
});


router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
