import "dotenv/config";

import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import multipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import fastify from "fastify";
import { resolve } from "node:path";
import { authRoutes } from "./routes/auth";
import { memoriesRoutes } from "./routes/memories";
import { uploadRoutes } from "./routes/upload";

const app = fastify();

const secret =
  process.env.SECRET_KEY ?? "HD23h*&3dGHR23&$3H29hb79KM0G8fgdgFHW8";
const port = Number(process.env.PORT) ?? 3333;

// app.register(cors, {
//   origin: ["http://localhost:3000"],
// });

app.register(multipart);

app.register(fastifyStatic, {
  root: resolve(__dirname, "../uploads"),
  prefix: "/uploads",
});

app.register(cors);

app.register(fastifyJwt, {
  secret,
});

app.register(authRoutes);
app.register(uploadRoutes);
app.register(memoriesRoutes);

app
  .listen({
    port,
  })
  .then(() => {
    console.log(`🚀 HTTP server running on http://localhost:${port}`);
  });
