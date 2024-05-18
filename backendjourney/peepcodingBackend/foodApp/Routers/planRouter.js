const express = require('express');
const {protectRoute,isAuthorised}=require('../controllers/authController');
const {getAllPlans,top3plans,getPlan,createPlan,updatePlan,deletePlan}=require('../controllers/planControllers');
const planRouter = express.Router();


planRouter
.route('/getAllPlans')
.get(getAllPlans)

planRouter
.route('/top/:id')
.get(top3plans)

planRouter
.use(protectRoute);

planRouter
.route('/plan/:id')
.get(getPlan)

planRouter
.use(isAuthorised(['admin','restaurantowner']));

planRouter
.route('/crudPlan')
.post(createPlan)


planRouter
.route('/crudPlan/:id')
.patch(updatePlan)
.delete(deletePlan)

module.exports = planRouter;
