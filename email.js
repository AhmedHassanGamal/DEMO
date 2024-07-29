const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
// 1. transporter
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false,
  auth: {
    user: "42b8337c9ca6e8",
    pass: "8c2b9c31ba295a",
  },
});

const sendMail = (subject, filename, filepath) => {
  console.log({ filename });
  console.log({ filepath });
  // 2. define email [to, from, subject, body]
  const mailOptions = {
    from: process.env.EMAIL,
    to: "assanamed84@gmail.com",
    subject: subject,
    text: "hello my friend how are u",
    html: `<b style='color:red'>${subject}</b>`,
    attachments: [
      {
        filename: filename,
        path: filepath,
      },
    ],
  };
  // 3. send mail

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return console.log(err);
    }
    console.log("Message sent: ", info.messageId);
  });
};

module.exports = { sendMail };
