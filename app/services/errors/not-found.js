exports.notFounMiddleware = (req, res) => {
  return res.status(404).send("Sorry Route Not Found!");
};
