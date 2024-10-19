import { Router } from "express";
import { UserController } from "../controller/UserController";
import { authenticateJWT, authorizeRole } from "../middlewares/authMiddleware";

class UserRoutes {
  public router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.routes();
  }

  public routes(): void {
    this.router.post("/", authenticateJWT, authorizeRole("admin"), this.userController.createUser);
    this.router.patch("/:id", authenticateJWT, authorizeRole("admin"), this.userController.updateUser);
    this.router.delete("/:id", authenticateJWT, authorizeRole("admin"), this.userController.deleteUser);
    this.router.get("/:id", authenticateJWT, authorizeRole("admin"), this.userController.getUser);
    this.router.get("/", authenticateJWT, authorizeRole("admin"), this.userController.getUsers);
  }
}

export default new UserRoutes().router;
