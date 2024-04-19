import express from "express";
import cors from "cors";
import morgan from "morgan";

import userRoutes from "./routes/usuarios.routes.js";
//import categoryRoutes from "./routes/categorias.routes.js";
import newsRoutes from "./routes/noticias.routes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api", userRoutes);
//app.use("/api", categoryRoutes);
app.use("/api", newsRoutes);

export default app;
