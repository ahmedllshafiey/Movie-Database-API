import { Router } from "express";
import { AuthController } from "../controller/AuthController";

class AuthRoutes {
  public router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.routes();
  }

  public routes(): void {
    this.router.post("/register", this.authController.register);
    this.router.post("/login", this.authController.login);
  }
}

export default new AuthRoutes().router;
