const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
    try {
      const user = await User.create(req.body);
      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.logged_in = true;
        res
          .status(200)
          .json({ user: user, message: `New user ${req.body.name} created!` });
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ where: { name: req.body.name } });
      if (!user) {
        res.status(400).json({ message: "The name or password is incorrect!" });
        return;
      }
      const valid = await user.checkPassword(req.body.password);
  
      if (!valid) {
        res.status(400).json({ message: "The name or password is incorrect!" });
        return;
      }
      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.logged_in = true;
        res.json({ user: user, message: `Thanks for logging in, ${user.name}` });
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.get("/logout", (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.redirect("/");
      });
    } else {
      res.status(404).end;
    }
  });
  
  module.exports = router;