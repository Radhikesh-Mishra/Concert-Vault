const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');

const PORT = process.env.PORT;
const app = express();

const Concerts = require('./models/Concerts.js');

mongoose.connect(process.env.MONGO_URL).then(() => console.log('MongoDB connected'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('./public')));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

app.post('/api/newConcerts', upload.single('image'), async (req, res) => {
    const { concertDate, concertLocation, totalTickets, ticketPrice, content } = req.body;
    const date = new Date(concertDate);
    const concertDateOnly = date.toISOString().split('T')[0];
    const imageName = req.file.filename;
    await Concerts.create({ concertDate: concertDateOnly, concertLocation, ticketPrice, totalTickets, imageUrl: imageName, content });
    res.status(200).send('Concert received');
});

app.post('/api/buyTickets', async(req, res) => {
    const { name, email, mobile, numberOfTickets, concertLocation, concertDate, concertId } = req.body;

    try {
        const concert = await Concerts.findOne({ _id: concertId });
        if (!concert) {
            return res.status(404).send('Concert not found');
        }

        if (concert.totalTickets >= numberOfTickets) {
            concert.totalTickets -= numberOfTickets;
            await concert.save();

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Ticket Purchase Confirmation',
                text: `Dear ${name},\n\nThank you for purchasing ${numberOfTickets} ticket(s) for ${concertLocation} on ${concertDate}.\n\nBest regards,\nConcert Vault Team`,
            };

            await transporter.sendMail(mailOptions);
            res.status(200).send('Tickets purchased successfully and confirmation email sent.');
        } else {
            res.status(400).send('Not enough tickets available.');
        }
    } catch (error) {
        console.error('Error processing ticket purchase:', error);
        res.status(500).send('An error occurred while processing your request.');
    } 
});

app.get('/api/concerts', async (req, res) => {
    try {
        const currentDate = Date.now();
        await Concerts.deleteMany({ concertDate: { $lt: currentDate } });
        const upcomingConcerts = await Concerts.find({ concertDate: { $gte: currentDate } });
        res.json(upcomingConcerts);
    } catch (error) {
        console.error('Error fetching concerts:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank You for Your Message!',
        text: `Dear ${name},\n\nThank you for reaching out! We have received your message: "${message}"\n\nBest Regards,\nYour Concert Vault Team`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
