import { model, Schema } from "mongoose";
import { IBorrow, IBorrowModelType } from "./borrow.interface";


const borrowSchema = new Schema<IBorrow,IBorrowModelType>({
    book : {
        type : Schema.Types.ObjectId,
        ref : "Book",
        required : [true, "book id is required"]
    },
    quantity : {
        type : Number,
        required : [true, "quantity is required"],
        min : 1,
        validate : {
            validator : async function (value:number) {
                const book = await model("Book").findById(this.book);
                return book ? value <= book.copies : false
            },
            message : "Borrow quantity exceeds available copies"
        }
    },
    dueDate :{
        type : Date,
        required : [true, "Date is required"],
        validate:{
            validator : (date : Date) => date > new Date(),
            message : "Due date must be in the future"
        }
    }
},{
    versionKey : false,
    timestamps: true
});

borrowSchema.static("handleBookStock", async function handleBookStock(payload : IBorrow){
    const BookModel = model("Book")
    const book = await BookModel.findById(payload.book);

    if(!book) throw new Error("book not found")

        if(payload.quantity > book.copies) throw new Error("Borrow quantity exceeds available copies")

    book.copies -= payload.quantity
    if(book.copies === 0){
        book.available = false
    }

    await book.save()
})


const Borrow = model<IBorrow,IBorrowModelType>("Borrow", borrowSchema);
export default Borrow;