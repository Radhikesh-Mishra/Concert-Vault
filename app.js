require('dotenv').config()

const express = require('express');
const app = express();
const path = require('path');
const nodemailer = require('nodemailer');
const { error } = require('console');

const PORT = process.env.PORT;

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}))


const bandMembers = [
    {
        name: 'Name1',
        image: 'images/bandmember.jpg'
    },
    {
        name: 'Name2',
        image: 'images/bandmember.jpg'
    },
    {
        name: 'Name3',
        image: 'images/bandmember.jpg'
    }
]

const concert = [
    {
        city:"New York",
        day: 'Sat',
        date: 15,
        month: 'June',
        image: 'images/newyork.jpg',
        content: 'Last time in New York, we had great time.'
    },
    {
        city:"Paris",
        day: 'Fri',
        date: 21,
        month: 'June',
        image: 'images/paris.jpg',
        content: 'We are thrilled to perform in Paris.'
    },
    {
        city:"San Francisco",
        day: 'Sun',
        date: 30,
        month: 'June',
        image: 'images/sanfran.jpg',
        content: 'The crowd in San Francisco is amazing.'
    }
]


app.get('/', (req, res) => {
    res.render('index', {
        bandMembers,
        concert,
    });
})


app.post('/send-email', (req, res) => {
    const { Name, Email, Message } = req.body; 

    // Configuring the email transporter using nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: Email,
        subject: 'Thank you message', 
        text: `Hi ${Name}, thank you for your message:\n\n${Message}` 
    };

    // Sending the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent successfully with id : ' + info.response);
        }
    });
});

app.post('/pay', (req, res) => {
    const {tickets, email} = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }   
    })

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Ticket Confirmation',
        text: `Thank you for buying ${tickets} tickets.` 
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
            res.status(500).send('Error sending email');
        }   else{
            console.log('Email sent');
            res.redirect('/');
        }
    })
})


app.listen(PORT, () => {
    console.log('Server is running');
})
