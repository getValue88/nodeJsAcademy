const sgMail = require('@sendgrid/mail');
const sengridAPIKey = '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';

sgMail.setApiKey(sengridAPIKey);


const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'fcpincharrata@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to Task Manager, ${name}. Let me know how you get along with the app`
    })
}

const sendCancelationEmail = (email,name)=>{
    sgMail.send({
        to: email,
        from: 'fcpincharrata@gmail.com',
        subject: 'We hope see you soon!',
        text: `Hello, ${name}. We know you cancelled your subscription and it will be great for us to know the reasons. Please answer this email with your feedback about the application. Thanks!`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}