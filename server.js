const express = require("express");

const config = require("./utils/config");

const Food = require("./models/foodModel");

const db = require("./db");

const app = express();

app.use(express.json());

const foodsRoute = require("./routes/foodsRoute");
const userRoute = require("./routes/userRoute");
const ordersRoute = require("./routes/ordersRoute");

app.use("/api/users/", userRoute);
app.use("/api/foods/", foodsRoute);
app.use("/api/orders/", ordersRoute);

app.get("/", (req, res) => {
  res.send("Server is running");
});

// app.get("/getfoods", (req, res) => {
//     Food.find({})
//         .then(docs => {
//             res.send(docs);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).send("An error occurred while fetching foods.");
//         });
// });

const port = process.env.PORT || 8000;

app.listen(port, () => "server running on port 5000");
