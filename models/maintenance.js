const mongoose = require('mongoose');

var maintenanceSchema = new mongoose.Schema(
    {
        assetSerialNumber:{
            type: String,
            required: true,
        },
        startTimeStamp:{
            type:String,
            default: Date.now()
        },
        endTimeStamp:{
            type:String,
            default:''
        },
        status:{
            type: String,
            required: true
        },
        comment:{
            type:String
        },
        changedBy:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
)

const MaintenanceDetails = mongoose.model('maintenance',maintenanceSchema);

module.exports={MaintenanceDetails};