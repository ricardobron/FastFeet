export default async (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({ error: 'ID dont found' });
  }

  if (!Number(req.params.id)) {
    return res.status(400).json({ error: 'ID is not number' });
  }

  if (Number(req.params.id) < 0) {
    return res.status(400).json({ error: 'ID is not positive number' });
  }

  return next();
};
