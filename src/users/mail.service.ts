import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
const sgTransport = require('nodemailer-sendgrid-transport');

@Injectable()
export class MailService {
  public to?: string;
  public subject?: string;
  public message?: string;
  constructor() {}

  async sendMail(email: string) {
    const mailOptions = {
      from: 'noreply@sgs.com',
      to: email,
      subject: 'Confirmação de registo',
      html: 'Bem vindo ao SGS, a sua aplicação está pronta a usar',
    };
    const options = {
      service: 'SendGrid',
      auth: {
        api_key:
          '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',
      },
    };
    const transporter = nodemailer.createTransport(sgTransport(options));
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Message sent: ' + info.response);
      }
    });
  }
}
