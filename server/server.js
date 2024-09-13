const dotenv = require("dotenv")
const express = require("express");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const viewRoutes = require("./routes/view");

dotenv.config({ path: ".env" });

const app = express();
const port = process.env.PORT || 8760;

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", userRoutes);
app.use("/", postRoutes);
app.use("/", viewRoutes);

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./dist" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
