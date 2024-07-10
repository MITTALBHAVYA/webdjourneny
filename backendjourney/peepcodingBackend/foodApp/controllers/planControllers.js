const planModel = require('../models/planModel');

const handleError = (res, err) => {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
};

module.exports.getAllPlans = async (req, res) => {
    try {
        const plans = await planModel.find();
        return res.json(plans.length > 0 ? { message: 'All plans retrieved', data: plans } : { message: 'No plans found' });
    } catch (err) {
        return handleError(res, err);
    }
};

module.exports.getPlan = async (req, res) => {
    try {
        const plan = await planModel.findById(req.params.id);
        return res.json(plan ? { message: 'Plan found', data: plan } : { message: 'Plan not found' });
    } catch (err) {
        return handleError(res, err);
    }
};

module.exports.createPlan = async (req, res) => {
    try {
        const planData = req.body;
        const createdPlan = await planModel.create(planData);
        return res.status(201).json({ message: 'Plan created', data: createdPlan });
    } catch (err) {
        return handleError(res, err);
    }
};

module.exports.deletePlan = async (req, res) => {
    try {
        const deletedPlan = await planModel.findByIdAndDelete(req.params.id);
        return res.json(deletedPlan ? { message: 'Plan deleted', data: deletedPlan } : { message: 'Plan not found' });
    } catch (err) {
        return handleError(res, err);
    }
};

module.exports.updatePlan = async (req, res) => {
    try{
        console.log(req.params.id);
        let id = req.params.id;
        let dataToBeUpdated = req.body;
        console.log("this is id that i am getting form the postman",id);
        console.log(dataToBeUpdated);
        let keys=[];
        for(let key in  dataToBeUpdated){
            keys.push(key);
        }
        let plan = await planModel.findById(id);
        for(let i=0;i<keys.length;i++){
            plan[keys[i]]=dataToBeUpdated[keys[i]];
        }
        console.log(plan);
        await plan.save();
        res.json({
            message:'plan updated successfully',
            data : plan
        })
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
};

module.exports.top3plans = async (req, res) => {
    try {
        const plans = await planModel.find().sort({ ratingsAverage: -1 }).limit(3);
        return res.json(plans.length > 0 ? { message: 'Top 3 plans', data: plans } : { message: 'No plans found' });
    } catch (err) {
        return handleError(res, err);
    }
};
