import { Request, Response } from "express";
import Borrow from "./borrow.model";

const createBorrow = async (req : Request, res : Response) =>{
    try {
        const payload = req.body;
        await Borrow.handleBookStock(payload)

        const data = await Borrow.create(payload);
       res.status(201).send({
            success : true,
            message:"Book borrowed successfully",
            data
        })
        
    } catch (error : any) {
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error : error.message
        });
        
    }
};

const getBorrow = async(req: Request, res : Response) =>{
    try {
        const data = await Borrow.aggregate([
            // group
            {
                $group :{
                    _id : "$book",
                    totalQuantity : {$sum : "$quantity"}
                }
            },

            // lookup book details
            {
                $lookup :{
                    from : "books",
                    localField: "_id",
                    foreignField: "_id",
                    as : "bookDetails"
                }
            },

            // unwind
            {
                $unwind : "$bookDetails"
            },

            //reshape format
            {
                $project :{
                    _id : 0,
                    book :{
                        title : "$bookDetails.title",
                        isbn : "$bookDetails.isbn"
                    },
                    totalQuantity : 1
                }
            } 
        ])




          res.status(200).send({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data
        });
        
    } catch (error) {
         res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        });
    }
}



export const borrowController = {
    createBorrow,
    getBorrow
}