import razorpay from "../configs/razorpay.js";
import crypto from "crypto"
import User from "../models/User.js"

export const createOrder = async (req, res) => {
    try {
        const options = {
            amount: 100 * 100,
            currency: "INR",
        };
        const order = await razorpay.orders.create(options);
        res.json({
            success: true,
            order
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};
export const verifyPayment = async (req, res) => {
    try {
        const userId = req.user._id
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body
        const sign =
            razorpay_order_id + "|" + razorpay_payment_id
        const expectedSign = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(sign.toString())
            .digest("hex")
        if (razorpay_signature === expectedSign) {
            await User.findByIdAndUpdate(userId, {
                $inc: { credits: 100 }
            })
            return res.json({
                success: true,
                message: "payment verified"
            })
        }
        res.json({
            success: false,
            message: "invalid signature"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}