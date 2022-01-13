import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  try {
    const existedUser = await User.findOne({ email });
    if (existedUser)
      return res
        .status(400)
        .json({ success: false, msg: 'user already exists.' });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });
    const token = jwt.sign({ email, id: result._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    const { _id } = result;
    const name = `${firstName} ${lastName}`;
    res
      .status(200)
      .json({
        success: true,
        result: { firstName, lastName, email, phone, name, _id },
        token,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, msg: 'Something went wrong. Try again later.' });
    console.log(error);
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existedUser = await User.findOne({ email });
    if (!existedUser)
      return res
        .status(404)
        .json({ success: false, msg: 'User does not exist.' });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existedUser.password,
    );
    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ success: false, msg: 'Invalid Credentials!' });
    const token = jwt.sign(
      { email, id: existedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );
    const { firstName, lastName, _id } = existedUser;
    const phone = existedUser?.phone ? existedUser.phone : '';
    const name = `${firstName} ${lastName}`;
    res
      .status(200)
      .json({
        success: true,
        result: { firstName, lastName, email, phone, name, _id },
        token,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, msg: 'Something went Wrong. Try again later.' });
  }
};
