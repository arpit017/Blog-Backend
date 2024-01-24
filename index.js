const express = require("express");
const { connection } = require("./connection");
const {userRouter}=require("./routes/userRoute")
const {authentication}=require("./middlewares/authentication");
const { blogsRouter } = require("./routes/blogsRoute");
const { adminRouter } = require("./routes/adminRoute");
const cors=require("cors")
const app = express();
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
  res.send("home");
});

app.use("/users",userRouter)
app.use("/blogs",blogsRouter)
app.use(authentication)
app.use("/admin",adminRouter)
const PORT=8080;
app.listen(PORT, async (req, res) => {
  try {
    await connection;
    console.log("connection established with db");
  } catch {
    console.log("error in connection");
  }

  console.log(`listening on ${PORT}`);
});
