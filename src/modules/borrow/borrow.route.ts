import { Router } from "express";
import { borrowController } from "./borrow.controller";

const borrowRoute = Router();

borrowRoute.post("/", borrowController.createBorrow);
borrowRoute.get("/", borrowController.getBorrow);


export default borrowRoute;