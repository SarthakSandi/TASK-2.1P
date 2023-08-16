const express = require('express'); 
const bodyParser = require('body-parser'); 

const apiKey = 'key-d97abd734a39c546698927c165c4a434';
const domain = 'sandboxfe02226e40604e0d87dbbec00f4f7fc5.mailgun.org';
const mailgun = require('mailgun-js'); 
const mailgunMsg = mailgun({ apiKey: apiKey, domain: domain }); 

const myApp = express();

myApp.use(bodyParser.urlencoded({ extended: true })); 
myApp.use(express.static('public/css')); 

myApp.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); 
});

myApp.post('/', (req, res) => {
    const email = req.body.email;
    console.log(email);

    const data = {
        from: 'SarthakSandal <sarthak4838.be22@chitkara.edu.in>', 
        to: email, 
        subject: 'The Newsletter', 
        text: 'Welcome to the newsletter.', 
    };

    mailgunMsg.messages().send(data, (error, body) => {
        if (error) {
            console.log(error); 
            return res.status(500).send('Error Detected.'); 
        }
        console.log('Email sent successfully:', body); 

    });
});

myApp.listen(9696, function(request,response) {
    console.log('Server is running at port 9696.');
});