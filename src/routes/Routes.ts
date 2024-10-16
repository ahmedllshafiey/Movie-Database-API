import { Router } from "express";
import IRouter from "./IRouter";

abstract class Routes implements IRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }
    abstract routes(): void;
}

export default Routes;