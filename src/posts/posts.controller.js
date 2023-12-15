const service = require("./posts.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function postExists(req, res, next) {
  const { postId } = req.params;

  const post = await service.read(postId);
  if (post) {
    res.locals.post = post;
    return next();
  }
  return next({ status: 404, message: `Post cannot be found.` });
}

async function create(req, res) {
  res.status(201).json({ data: await service.create(req.body.data) });
}

async function update(req, res) {
  const dbResponse = await service.update(req.body.data)
  res.json({ data: dbResponse });
}

async function destroy(req, res) {
  const dbResponse = await service.delete(res.locals.post.post_id);
  res.status(204).json({ data: dbResponse });
}

module.exports = {
  create: asyncErrorBoundary(create),
  update: [asyncErrorBoundary(postExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(postExists), asyncErrorBoundary(destroy)],
};
