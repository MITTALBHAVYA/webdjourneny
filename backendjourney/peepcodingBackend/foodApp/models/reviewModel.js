const mongoose = require('mongoose');
const db_link='mongodb+srv://bhavya:bhavya@cluster0.yxwygwr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(db_link)
.then(function(db){
    console.log(db);
    console.log('review db connected');
})
.catch(function(err){
    console.log(err);
})

const reviewSchema = new mongoose.Schema({
    review : {
        type:String,
        required:[true,'review is required']
    },
    rating : {
        type: Number,
        min : 1,
        max : 10,
        required : [true,'rating is required']
    },
    createdAt : {
        type:Date,
        default:Date.now()
    },
    user : {
        type : mongoose.Schema.ObjectId,
        ref:'userModel',
        req : [true,'review must belong to a user']
    },
    plan : {
        type : mongoose.Schema.ObjectId,
        ref:'planModel',
        req : [true,'review must belong to a existing plan']
    }
})

reviewSchema.pre(/^find/,function(next){
    this.populate({
        path:"user",
        select:"name ProfileImage",
    }).populate("plan");
    next();
});

const reviewModel = mongoose.model('reviewModel', reviewSchema);

module.exports = reviewModel;