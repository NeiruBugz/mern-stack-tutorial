const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

const DB_URI = config.get("mongoURI");

const app = express();

app.use(express.json());

mongoose
	.connect(DB_URI, { useNewUrlParser: true, useCreateIndex: true })
	.then(() => console.log("Connected to MongoDB"))
	.catch(error => console.log(error));

app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
