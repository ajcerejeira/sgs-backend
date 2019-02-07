import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

const sgTransport = require('nodemailer-sendgrid-transport');

@Injectable()
export class MailService {
  public to?: string;
  public subject?: string;
  public message?: string;
  constructor() {}

  async sendConfirmationEmail(email: string) {
    var mailOptions = {
      from: 'noreply@sgs.com',
      to: email,
      subject: 'Confirmação de registo',
      text:
        'Bem vindo ao Sistema de Gestão de Sinistros!\n\n' +
        'A sua aplicação está pronta a ser usada.\n\n' +
        'Clique no link seguinte para aceder ao SGS:\n\n' +
        'https://ajcerejeira.github.io/sgs-frontend/#/login\n\n',
    };
    console.log(mailOptions);

    var options = {
      service: 'SendGrid',
      auth: {
        api_key: process.env.SENDGRID_API_KEY
      },
    };

    var transporter = nodemailer.createTransport(sgTransport(options));

    transporter.sendMail(mailOptions, function(err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log('Message sent: ' + info.response);
      }
    });
  }

  async sendPasswordEmail(email: string) {
    var mailOptions = {
      from: 'noreply@sgs.com',
      to: email,
      subject: 'Alteração de password',
      html:
        'Efectuou recentemente um pedido para repor a sua palavra-passe em SGS. Para concluir o processo' +
        'clique na ligação abaixo: \n',
    };
    console.log(mailOptions);
    var options = {
      service: 'SendGrid',
      auth: {
        api_key:
          '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',
      },
    };
    var transporter = nodemailer.createTransport(sgTransport(options));
    transporter.sendMail(mailOptions, function(err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log('Message sent: ' + info.response);
      }
    });
  }
}
