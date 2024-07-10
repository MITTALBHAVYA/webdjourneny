const express = require('express');
const {protectRoute}=require('../controllers/authController');
const { getAllReviews, top3Reviews, getPlanReview, createReview,updateReview,deleteReview } = require('../controllers/reviewController');
const reviewRouter = express.Router();

reviewRouter
.route('/all')
.get(getAllReviews)

reviewRouter
.route('/top3')
.get(top3Reviews)

reviewRouter
.route("/:id")
.get(getPlanReview);

reviewRouter
.use(protectRoute);
reviewRouter
.route('/crud/:id')
.post(createReview)


reviewRouter
.route('/crud/:id')
.patch(updateReview)
.delete(deleteReview)

module.exports=reviewRouter;
