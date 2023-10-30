const express = require("express");
require("dotenv").config();
const { connection } = require("./db");
const { userRouter } = require("./route/userRoute");
const cors = require("cors");
const { postRouter } = require("./route/postRoute");


const app = express();

app.use(express.json());
app.use(cors());

// app.get("/", (req, res) => {
//   try {
//     res.status(200).json({ msg: "welcome to home" });
//   } catch (error) {
//     res.status(200).json({ error: error });
//   }
// });
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connection is created");
    console.log("sever is running");
  } catch (error) {
    console.log(error);
  }
});
