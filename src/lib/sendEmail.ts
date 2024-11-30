import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs/promises';
import path from 'path';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.example.com',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'default@example.com',
    pass: process.env.EMAIL_PASS || 'defaultpassword',
  },
});

export const sendEmail = async (to: string, subject: string, templateName: string, context: Record<string, any>) => {
  try {
    const templatePath = path.join(process.cwd(), 'src/lib/templates', `forgot-password.hbs`);
    const templateContent = await fs.readFile(templatePath, 'utf-8');
    const compiledTemplate = handlebars.compile(templateContent);

    const html = compiledTemplate(context);

    const info = await transporter.sendMail({
      from: `"CashFlow" <${process.env.EMAIL_USER || 'default@example.com'}>`,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};
