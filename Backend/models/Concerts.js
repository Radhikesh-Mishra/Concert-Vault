const { model, Schema } = require('mongoose');

const ConcertSchema = new Schema({
    concertDate: {
        type: Date,          
        required: true       
    },
    concertLocation: {
        type: String,
        required: true
    },
    totalTickets: {
        type: Number,
        required: true
    },
    ticketPrice: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String         
    },
    content: {
        type: String      
    }
});


const Concerts = model('Concerts', ConcertSchema);

module.exports = Concerts;