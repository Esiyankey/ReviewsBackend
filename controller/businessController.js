const bussiness = require("../db/models/bussiness");
const User = require("../db/models/users");
const Subscription = require("../db/models/subscription");

const registerBusiness = async (req, res) => {

    const user = User.findOne({
        where: {
            id: req.body.id,
        },
    });
    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }
   
    const subscription = Subscription.findOne({
        where: {
            id: req.body.id,
        },
    });
    if (!subscription) {
        return res.status(404).json({
            message: "Subscription not found",
        });
    }
  const body = req.body;
  const business = await bussiness.create({
    ownerId: user.id,
    name: body.name,
    description: body.description,
    qrCode: body.qrCode,
    subscriptionId: Subscription.id,
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
