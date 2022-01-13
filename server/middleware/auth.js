import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const isCustom = token.length < 500;

    let decodedData;

    if (token && isCustom) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token); // google token
      if (decodedData.exp * 1000 < new Date().getTime()) {
        throw new Error('token expired');
      }
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, msg: 'Something wrong with your authorization' });
  }
};

export default auth;
