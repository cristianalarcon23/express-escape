const mongoose = require('mongoose');
const { Schema } = mongoose;

const enigmaSchema = new Schema ({
    title: {
        type: String
    },
    number: {
        type: Number
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    team: {
        type: [Schema.Types.ObjectId],
        ref: 'Team',
    },
    solved: {
        type: Boolean,
    }
});

const Enigma = mongoose.model('Enigma', enigmaSchema);

module.exports = Enigma;