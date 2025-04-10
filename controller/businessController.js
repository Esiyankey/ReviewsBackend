const bussiness = require("../db/models/bussiness");
const User = require("../db/models/users");
const Subscription = require("../db/models/subscription");
const SubscriptionPlan = require("../db/models/subscriptionplan");

const registerBusiness = async (req, res) => {
    const body = req.body;

    const user = User.findOne({
        where: {
            id:body.id,
        },
    });
    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }
   
    const subscriptionPlanId = SubscriptionPlan.findOne({
        where: {
            subscriptionPlan:body.subscriptionPlan,
        },
    });
    if (!subscriptionPlanId) {
        return res.status(404).json({
            message: "Subscription not found",
        });
    }
  const business = await bussiness.create({
    ownerId: user.id,
    name: body.name,
    description: body.description,
    qrCode: body.qrCode,
    subscriptionPlanId: subscriptionPlanId.id,
  });

    if (business) {
        return res.status(200).json({
        message: "Business Created Successfully",
        data: business,
        });
    } else {
        return res.status(500).json({
        message: "Internal Server Error",
        });
    }

};
