import { Router } from "express";
import { UserController } from "../controller/UserController";

class UserRoutes {
  public router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.routes();
  }

  public routes(): void {
    this.router.post("/", this.userController.createUser);
    this.router.patch("/:id", this.userController.updateUser);
    this.router.delete("/:id", this.userController.deleteUser);
    this.router.get("/:id", this.userController.getUser);
    this.router.get("/", this.userController.getUsers);
  }
}

export default new UserRoutes().router;
