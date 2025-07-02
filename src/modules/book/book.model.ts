import { model, Schema } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema = new Schema<IBook>({
    title :{
        type :String,
        required : [true, "title is required"],
        trim : true
    },
    author :{
        type:String,
        required : [true, "author is required"],
    },
    genre : {
        type : String,
        enum : {
            values : ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
            message : 'genre is not valid : got {VALUE}'
        },
        required:[true, "genre is required"]
    },
    isbn : {
        type : String,
        required : [true, "isbn is required"],
        unique : true
    },
    description : {
        type : String
    },
    copies : {
        type : Number,
        required : [true, "copies is required"],
        min : [0, "copies cannot be negative"]
    },
    available : {
        type : Boolean,
        default : true
    }
},
{
    versionKey : false,
    timestamps: true
})

const Book = model<IBook>("Book", bookSchema);
export default Book;