const mongoose = require('mongoose');
const db_link='mongodb+srv://bhavya:bhavya@cluster0.yxwygwr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(db_link)
.then(function(db){
    console.log(db);
    console.log('plan db connected');
})
.catch(function(err){
    console.log(err);
})

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: [20, 'Name should not exceed 20 characters']
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    ratingsAverage: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return value < 100;
            },
            message: "Discount should be less than 100%"
        }
    },
    
});

const planModel = mongoose.model('planModel', planSchema);

module.exports = planModel;
