const mongoose = require('mongoose');

var assetSchema = new mongoose.Schema(
    {
        assetName:{
            type:String,
            required: true
        },
        assetDesc:{
            type:String,
            required:true
        },
        assetType:{
            type:String,
            required:true
        },
        brand:{
            type:String,
            required:true
        },
        serialNumber:{
            type:String,
            required:true,
            unique: true
        },
        status:{
            type:String,
            enum: ['Available','Assigned','Under Maintenance','Disposed'],
            default:'Available'
        },
        location:{
            type:mongoose.Types.ObjectId
        },
        assignedUser:{
            type:String
        },
        lastUpdatedBy:{
            type:String,
            required:true
        }
    },
    {
        timestamps: true
    }
)

const AssetDetails = mongoose.model('assets',assetSchema);

module.exports={AssetDetails};