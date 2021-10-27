import express from "express";
import morgan from "morgan";

import { userRouter } from "./user/user.route";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/user", userRouter);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
