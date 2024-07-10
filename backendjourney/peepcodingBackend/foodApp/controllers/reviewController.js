const reviewModel = require('../models/reviewModel');
const planModel = require("../models/planModel");
const {changePlan} = require("./authController")
const handleError = (res, err) => {
    console.error(err);
    return res.status(500).json({ message:err.message });
};

module.exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await reviewModel.find();
        return res.json(reviews.length > 0 ? { message: 'All reviews retrieved', data: reviews } : { message: 'No reviews found' });
    } catch (err) {
        return handleError(res, err);
    }
};

module.exports.top3Reviews = async (req, res) => {
    try {
        const reviews = await reviewModel.find().sort({ ratingsAverage: -1 }).limit(3);
        return res.json(reviews.length > 0 ? { message: 'Top 3 reviews', data: reviews } : { message: 'No reviews found' });
    } catch (err) {
        return handleError(res, err);
    }
};

module.exports.getPlanReview = async(req,res)=>{
    try{
        const id = req.params.id;
        const reviews = await reviewModel.find();
        reviews.filter(reviews=>reviews.plan._id==id);
        return res.json(reviews ? {message:'reviews found',data:reviews} : {message : 'Review not found'});
    }
    catch(err){
        return handleError(res,err);
    }
}

module.exports.createReview = async (req, res) => {
    try {
        const newReview = req.body;
        const createdReview = await reviewModel.create(newReview);
        const id = req.params.id;
        const plan = await planModel.findById(id);
        if(!plan){
            return res.json({
                message : "NO such plan is available"
            });
        }
        changePlan(id,createdReview.rating,0);
        res.json({
            message:"Review Created",
            data:createdReview
        });
    } catch (err) {
        return handleError(res, err);
    }
};

module.exports.deleteReview = async (req, res) => {
    try {
        let planid = req.params.id;
        let id = req.body.id;
        const deletedReview = await reviewModel.findByIdAndDelete(id);
        return res.json(deletedReview ? { message: 'Review deleted', data: deletedReview } : { message: 'Review not found' });
    } catch (err) {
        return handleError(res, err);
    }
};

module.exports.updateReview = async (req, res) => {
    try{
        let planid = req.params.id;
        let id = req.body.id;
        let dataToBeUpdated = req.body;
        const reviewchange = await reviewModel.findById(id);
        if(!reviewchange){
            return res.json({
                message:"review not found"
            });
        }
        let val=1;
        if(dataToBeUpdated.rating && reviewchange.rating!=dataToBeUpdated.rating){
            val = changePlan(reviewchange.plan,dataToBeUpdated.rating,reviewchange.rating)
        }
        if(val==0){
            return res.json({
                message:"Review not found"
            });
        }

        for(let key in  dataToBeUpdated){
            reviewchange[key] = dataToBeUpdated[key];
        }
        await reviewchange.save();
        let review = await reviewModel.findById(id);
        console.log(review);
        res.json({
            message:'review updated successfully',
            data : review
        })
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
};