var express = require('express');
var router = express.Router();
var {dbUrl} = require('../dbConfig');
const mongoose = require('mongoose');
const {MaintenanceDetails} = require('../models/maintenance');

mongoose.connect(dbUrl);

//Tp get all the maintenance details
router.get('/getAllMaintenanceDetails', async(req,res)=>{
    try {
        let details = await MaintenanceDetails.find();
        res.send({
            statusCode:200,
            maintenances:details
          })
    } catch (error) {
        console.log(error);
        res.send({
            statusCode:500,
            message:"Internal Server Error",
            error:error
          })
    }
})

//To get the maintenance details with asset serial Number
router.get('/:serialNumber',async(req,res)=>{
  
    try{
      const details = await MaintenanceDetails.findOne({serialNumber:req.params.serialNumber})
      res.send({
        statusCode:200,
        maintenances:details
      })
    }
    catch(error)
    {
      console.log(error)
        res.send({
          statusCode:500,
          message:"Internal Server Error",
          error:error
        })
    }
  })
  
  //To get the maintenance details with id
  router.get('id/:id',async(req,res)=>{
    
      try{
        const details = await MaintenanceDetails.findOne({_id:req.params.id})
        res.send({
          statusCode:200,
          maintenance:details
        })
      }
      catch(error)
      {
        console.log(error)
          res.send({
            statusCode:500,
            message:"Internal Server Error",
            error:error
          })
      }
    })

    //To create a maintenance for asset
router.post('/create',async(req,res)=>{
    try{
        if(req.body.assetSerialNumber && req.body.changedBy)
        {
            const details = await MaintenanceDetails.create(req.body)
            res.send({
                statusCode:200,
                maintenance:details
            })
        }
        else
        {
            res.send({
                statusCode:400,
                message:'Please provide asset serial number, start time updated user'
            })
        }
      }
      catch(error)
      {
        console.log(error)
          res.send({
            statusCode:500,
            message:"Internal Server Error",
            error:error
          })
      }
})

//To update the maintenance detail with Id
router.put('/:id',async(req,res)=>{
    try{
      const details = await MaintenanceDetails.updateOne({_id:req.params.id},req.body)
      res.send({
        statusCode:200,
        details,
        message:"Changes Saved"
      })
    }
    catch(error)
    {
      console.log(error)
        res.send({
          statusCode:500,
          message:"Internal Server Error",
          error:error
        })
    }
  })

//to delete the maintenance detail
router.delete('/:id', async(req,res)=>{
    try {
      await MaintenanceDetails.deleteOne({_id:req.params.id})
      res.send({
        statusCode:200,
        message:"Maintenance Deleted"
      })
    } catch (error) {
      console.log(error)
        res.send({
          statusCode:500,
          message:"Internal Server Error",
          error:error
        })
    }
  })


module.exports = router;