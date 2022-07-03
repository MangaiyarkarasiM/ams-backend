const mongoose = require('mongoose');
const validator = require('validator');

var userSchema = new mongoose.Schema(
    {
        userName:{
            type:String,
            unique:true
        },
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            default:''
        },
        email:{
            type:String,
            required:true,
            lowercase:true,
            validate:(value)=>{
                return validator.isEmail(value)
            }
        },
        password:{
            type:String,
            required:true
        },
        mobile:{
            type:String,
            default:''
        },
        organizationName:{
            type:String,
            required:true
        },
        location:{
            type:Array,
        },
        asset:{
            type:Array,
        }
    },
    {
        timestamps: true
    }
)

const UserDetails = mongoose.model('users',userSchema);

module.exports={UserDetails};