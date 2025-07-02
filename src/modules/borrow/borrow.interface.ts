import { Model, Types } from "mongoose";

export interface IBorrow{
    book : Types.ObjectId;
    quantity : number;
    dueDate : Date;

};


export interface IBorrowModelType extends Model<IBorrow>{
    handleBookStock(payload : IBorrow) :  Promise<void>
}