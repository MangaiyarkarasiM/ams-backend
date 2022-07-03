var express = require('express');
var router = express.Router();
var {dbUrl} = require('../dbConfig');
const mongoose = require('mongoose');
const {AssetDetails} = require('../models/asset')

mongoose.connect(dbUrl);

//To get all the assets
router.get('/getAllAssets',async(req,res)=>{
  
    try{
      const details = await AssetDetails.find()
      res.send({
        statusCode:200,
        assets:details
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

//To get the details of the asset with serialNumber
router.get('/:serialNumber',async(req,res)=>{
  
  try{
    const details = await AssetDetails.findOne({serialNumber:req.params.serialNumber})
    res.send({
      statusCode:200,
      asset:details
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

//To get the details of the asset with id
router.get('/id/:id',async(req,res)=>{
  
    try{
      const details = await AssetDetails.findOne({_id:req.params.id})
      res.send({
        statusCode:200,
        asset:details
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

//To create a new asset
router.post('/create',async(req,res)=>{
    try{

        const asset = await AssetDetails.findOne({assetName:req.body.assetName});
        if(asset)
        {
            res.send({
                statusCode:400,
                message:"Asset Name already exists"
              })
        }
        else
        {
            const details = await AssetDetails.create(req.body)
            res.send({
                statusCode:200,
                asset:details
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

//To update the asset with Id
router.put('/:id',async(req,res)=>{
    try{
      const details = await AssetDetails.updateOne({_id:req.params.id},req.body)
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

//to delete the asset
router.delete('/:id', async(req,res)=>{
    try {
      await AssetDetails.deleteOne({_id:req.params.id})
      res.send({
        statusCode:200,
        message:"Asset Deleted"
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