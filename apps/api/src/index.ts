import express from "express";
import authRouter from "./routes/auth.route";
import meRouter from "./routes/me.route";
import onboardingRouter from "./routes/onboarding.route";
import verificationRouter from "./routes/verification.route";
import { onboarding, users, sessions, passwords } from "./storage";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.use(authRouter);
app.use(meRouter);
app.use(onboardingRouter);
app.use(verificationRouter);

app.get("/", (_req, res) => {
  res.json({ message: "API is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
