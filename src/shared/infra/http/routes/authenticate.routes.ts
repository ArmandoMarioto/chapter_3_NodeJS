import AuthenticateUserController from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { Router } from "express";

const authenticateRouter = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRouter.post("/session", authenticateUserController.handle);

export default authenticateRouter;
