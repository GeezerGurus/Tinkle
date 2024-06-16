const User = require("../models/User");

exports.addUser = async (req, res) => {
    const { username, email, password, firstName } = req.body;

    const user = new User({
        username, 
        email, 
        password, 
        firstName
      });

      try {
        if (!username || !email || !password || !firstName) {
          return res.status(400).json({ message: "All fields are required!" });
        }
        if (password.length == 0 || password.length >= 32) {
          return res.status(400).json({ message: "Password limit exceed or need password!" });
        }
        await user.save();
        res.status(200).json({ message: "User Added" });
      } catch (error) {
        res.status(500).json({ message: error });
      }
      console.log(user);
};

exports.getUser = async (req, res) => {
  try {

      const user = await User.find().sort({ createdAt: -1 });
      if (!user) {
          return res.status(404).json({ message: "User not found!" });
      }
      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ message: error });
  }
};

exports.patchUser = async (req,res) => {
  const { userId } = req.params;

  try {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        if (req.body.newName){
          user.username = req.body.newName;
        }

        if (req.body.email) {
            user.email = req.body.email;
        }
        if (req.body.firstName) {
            user.firstName = req.body.firstName;
        }
        if (req.body.lastName) {
            user.lastName = req.body.lastName;
        }

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  User.findByIdAndDelete(id)
    .then((user) => {
      res.status(200).json({ message: "User Deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};