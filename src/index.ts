import express, { Application } from "express";
import Database from "./config/database";
import UserRoutes from "./routes/UserRoutes";
import AuthRoutes from "./routes/AuthRoutes";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.database_sync();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  protected routes(): void {
    this.app.use("/api/v1/users", UserRoutes);
    this.app.use("/api/v1/users", AuthRoutes);
  }

  protected database_sync(): void {
    const db = new Database();
    db.sync();
  }
}

const PORT: number = 8000;
const app = new App().app;

app.listen(PORT, () => {
  console.log(`Server URL: http://localhost:${PORT}`);
});
