const mongoose = require('mongoose');

const siteSchema = mongoose.Schema(
    {
        addressLine1:{
            type:String,
            required:true,
            unique: true
        },
        addressLine2:{
            type:String,
            default:''
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        pincode:{
            type:String,
            required:true,
            maxlength:6
        },
        country:{
            type:String,
            required:true
        },
        changedBy:{
            type:String,
            required:true
        }
    },
    {
        timestamps: true
    }
)

const SiteDetails = mongoose.model('sites',siteSchema);

module.exports = {SiteDetails};