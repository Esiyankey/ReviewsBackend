const authentication = catchAsync(async (req, res, next) => {
    let idToken = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      idToken = req.headers.authorization.split(" ")[1];
    }
  
    if (!idToken) {
      return next(new AppError("Pleae login to get access", 401));
    }
  
    const tokenDetail = jwt.verify(idToken, process.env.JWTSECRETKEY);
  
    const freshUser = await user.findByPk(tokenDetail.id);
    if (!freshUser) {
      return next(new AppError("User no longer exist", 400));
    }
    req.user = freshUser;
    return next();
  });


  module.exports = authentication;