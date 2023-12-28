import nodemailer from "nodemailer";

export default class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "",
                pass: ""
            }
        });
    }
}