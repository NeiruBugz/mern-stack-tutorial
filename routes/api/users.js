const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const User = require("../../models/User.js");

// @route  POST api/users
// @desc   Register new user
// @access Public

router.post("/", (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		return res.status(400).json({ msg: "Please fill all fields" });
	}

	User.findOne({ email }).then(user => {
		if (user) {
			return res.status(400).json({ msg: "User already exists" });
		}

		const newUser = new User({
			name,
			email,
			password
		});

		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				newUser.save().then(user => {
					jwt.sign(
						{ id: user.id },
						config.get("jwtSecret"),
						{ expiresIn: 360000 },
						(err, token) => {
							if (err) throw err;
							res.json({
								token,
								user: {
									id: user.id,
									name: user.name,
									email: user.email
								}
							});
						}
					);
				});
			});
		});
	});
});

module.exports = router;