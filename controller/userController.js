const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserController {
  async userLogin(req, res) {
    try {
      const { email, password } = req.body;
      try {
        let user = await User.findOne({
          email
        });
        if (!user)
          return res.status(400).json({
            message: ["User Not Exist"]
          });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({
            message: ["Incorrect Password !"]
          });

        // if (user.password !== password)
        //   return res.status(400).json({
        //     message: "Incorrect Password !"
        //   });

        const payload = {
          user: {
            id: user.id
          }
        };

        jwt.sign(
          payload,
          "randomString",
          {
            expiresIn: 3600
          },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({
              token
            });
          }
        );
      } catch (e) {
        console.error(e);
        res.status(500).json({
          message: ["Server Error"]
        });
      }
    } catch (e) {
      console.log(e);
      res.send({ message: ["Error in while adding category"] });
    }
  }

  async userSignUp(req, res) {
    const { firstName, lastName, email, password, companyName } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (user) {
        return res.status(400).json({
          message: ["User Already Exists"]
        });
      }

      user = new User({
        firstName,
        lastName,
        email,
        password,
        companyName,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 10000
        },
        (err, token) => {
          if (err) throw err;
          res.status(201).json({
            token
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
}

module.exports = new UserController();