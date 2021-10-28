import express from "express";
import '../src/Config/databaseConfig.js'
import {userRouter,adminRouter} from '../src/api/routes'


import jwt from "jsonwebtoken";
import errorHandler from "./api/middlewares/errorHandler.js";


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());



app.use('/user',userRouter);
app.use('/admin',adminRouter);

app.use(errorHandler)


// app.get("/", (req, res) => {
//   const token = jwt.sign({ id: 12, name: "karun" }, "my_secret_key", {
//     expiresIn: "2s",
//   });
//   res.json({ mess: "this is open", token });
// });

// app.get("/api", ensureToken, (req, res) => {
//   jwt.verify(req.token, "jwt_secret", (err, data) => {
//     if (err) res.status(403).json({ mess: "unauthorized" });

//     res.json({ mess: "this is protected api", data });

//   });
// });

// app.get("/token", (req, res) => {
//   const user = { id: "karun12" };
//   const token = jwt.sign(user, "jwt_secret", { expiresIn: "2m" });
//   res.json({ token });
// });

// function ensureToken(req, res, next) {
//   const bearerHeader = req.headers["authorization"];
//   if (typeof bearerHeader !== "undefined") {
//     const bearer = bearerHeader.split(" ");
//     const bearerToken = bearer[1];
//     req.token = bearerToken;
//     next();
//   } else {
//     res.status(403).json({ mess: "unauthorized" });
//   }
// }

app.listen(3000, () => console.log(`run on http://localhost:${PORT}`));
