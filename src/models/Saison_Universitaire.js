const mongoose = require('mongoose');

const SaisonSchema = new mongoose.Schema(
    {
        annee_univ: {
            type: String,
            unique:true,
            validate: {
                validator: function (v) {
                    return /\d{4}-\d{4}/.test(v);
                },
                message: props => `${props.value} is not a valid year value!`
            },
            required: [true, 'date debut et fin required']
        }
    
    })

const Saison_Univer = mongoose.model('Saison', SaisonSchema);
module.exports = Saison_Univer