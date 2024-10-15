import Routes from "./Routes";

class UserRoutes extends Routes{
    public routes(): void {
        this.router.post("");
        this.router.patch("/:id");
        this.router.delete("/:id");
        this.router.get("/:id");
        this.router.get("");
    }
}


export default new UserRoutes().router;