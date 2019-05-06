const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const DB_URI = require("./config/keys").MONGODB_URI;

const items = require("./routes/api/items");

const app = express();

app.use(bodyParser.json());

mongoose
	.connect(DB_URI, { useNewUrlParser: true })
	.then(() => console.log("Connected to MongoDB"))
	.catch(error => console.log(error));

app.use("/api/items", items);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
