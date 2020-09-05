const Dev = require('../models/Dev');

module.exports = {
  async store(req, res) {
    try {
      const { user } = req.headers;
      const { devId } = req.params;

      if (user === devId) {
        return res.status(400).json({ error: 'User cannot like himself.' });
      }

      const loggedDev = await Dev.findById(user);
      const targetDev = await Dev.findById(devId);

      if (!targetDev) {
        return res.status(400).json({ error: 'Dev not exists.' });
      }

      if (loggedDev.likes.includes(targetDev._id)) {
        return res.status(400).json({ error: 'Dev already liked.' });
      }

      if (targetDev.likes.includes(loggedDev._id)) {
        console.log("It's a match!");
      }

      loggedDev.likes.push(targetDev._id);

      await loggedDev.save();

      return res.json(loggedDev);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
