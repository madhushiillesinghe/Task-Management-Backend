import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';
import hbs from 'nodemailer-express-handlebars';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define interface for the email sending parameters
interface SendEmailParams {
  subject: string;
  send_to: string;
  send_from: string;
  reply_to: string;
  template: string;
  name: string;
  link: string;
}

const sendEmail = async ({
  subject,
  send_to,
  send_from,
  reply_to,
  template,
  name,
  link,
}: SendEmailParams): Promise<any> => {
  // Set up transporter
  const transporter = nodemailer.createTransport({
    service: 'Outlook365',
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER_EMAIL, // Your Outlook email
      pass: process.env.EMAIL_PASS, // Your Outlook password
    },
  });

  // Handlebars options
  const handlebarsOptions = {
    viewEngine: {
      extName: '.handlebars',
      partialsDir: path.resolve(__dirname, '../views'),
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, '../views'),
    extName: '.handlebars',
  };

  // Use handlebars with transporter
  transporter.use('compile', hbs(handlebarsOptions));

  // Set up mail options
  const mailOptions = {
    from: send_from,
    to: send_to,
    replyTo: reply_to,
    subject: subject,
    template: template,
    context: {
      name: name,
      link: link,
    },
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.log('Error sending email: ', error);
    throw error;
  }
};

export default sendEmail;
