import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import rootRouter from "./routes";
import { prisma } from "./adapters";
import session from "express-session";
import cookieParser from "cookie-parser";


const __dirname = dirname(fileURLToPath(import.meta.url));
const frontendDir = path.join(__dirname, "../../frontend/dist");
const port = process.env.PORT || 8000;
const app = express();

app.use(express.static(frontendDir));
if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
  }
app.use(
    session({
      cookie: {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60000, // session cookie
      },
      username: null, // don't omit this option
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );

app.use(express.json());
app.use(cookieParser());
// app.use(doubleCsrfProtection);
// app.use(csrfErrorHandler);
app.use(rootRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.get("*", (req, res) => { // Keep as the last route
    if (!req.originalUrl.startsWith("/api")) {
        return res.sendFile(path.join(frontendDir, "index.html"));
    }
    return res.status(404).send();
});

process.on("exit", async () => {
await prisma.$disconnect();
}); 