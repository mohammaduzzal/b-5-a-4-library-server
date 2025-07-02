import { Router } from "express";
import bookRoute from "../book/book.route";
import borrowRoute from "../borrow/borrow.route";

const route = Router()

route.use("/books", bookRoute);
route.use("/borrow", borrowRoute);


export default route;