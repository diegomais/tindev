const Dev = require('../models/Dev');

module.exports = {
  async store(req, res) {
    const { user } = req.headers;
    const { devId } = req.params;

    if (user === devId) {
      return res.status(400).json({ error: 'User cannot dislike himself.' });
    }

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    if (!targetDev) {
      return res.status(400).json({ error: 'Dev not exists.' });
    }

    if (loggedDev.dislikes.includes(targetDev._id)) {
      return res.status(400).json({ error: 'Dev already disliked.' });
    }

    loggedDev.dislikes.push(targetDev._id);

    await loggedDev.save();

    return res.json(loggedDev);
  },
};
