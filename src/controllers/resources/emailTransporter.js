import nodemailer from "nodemailer";
import { SECRETS } from "../../../config.js";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "emp10999@gmail.com",
        pass: SECRETS.emailPw,
    },
});
