import { Injectable } from '@nestjs/common';
import * as nodemailer from "nodemailer";

var sgTransport = require("nodemailer-sendgrid-transport");


@Injectable()
export class MailService {
    public to?: string;
        public subject?: string;
        public message?: string;
    constructor(
        ) { }

async sendMail(email: string) {
    // Generate SMTP service account from ethereal.email
    /*nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return process.exit(1);
    }
    
    console.log('Credentials obtained, sending message...');*/

    
    console.log(email);

    var mailOptions = {
        from: 'noreply@sgs.com',
        to: email,
        subject: 'Confirmação de registo',
        html: 'Bem vindo ao SGS, a sua aplicação está pronta a usar'
    };
    console.log(mailOptions);

    var options = {
        service: 'SendGrid',
        auth: {
          api_key: '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'
        }
      }

    var transporter = nodemailer.createTransport(sgTransport(options));

    transporter.sendMail(mailOptions, function(err, info){
        if (err ){
          console.log(err);
        }
        else {
          console.log('Message sent: ' + info.response);
        }
    });
    }
}

