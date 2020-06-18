const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


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