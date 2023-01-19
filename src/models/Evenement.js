const mongoose = require('mongoose');

const droit =['JPO','JOURNE_INTEGRATION','APPEL_FORMATION']


const EvennementSchema = new mongoose.Schema(
    {
        dateEven: {
            type: Date,
            required: true
        },
        designation :{
            type: String,
            enum: droit
        },
        description:{
            type:String
        }
    })

const Event = mongoose.model('Evennement', EvennementSchema);
module.exports =Event