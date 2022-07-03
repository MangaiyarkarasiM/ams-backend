var express = require('express');
var router = express.Router();
var {dbUrl} = require('../dbConfig');
const mongoose = require('mongoose');
const {SiteDetails} = require('../models/site')

mongoose.connect(dbUrl);

//To get all the sites
router.get('/getAllSites',async(req,res)=>{
  
    try{
      const details = await SiteDetails.find()
      res.send({
        statusCode:200,
        sites:details
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

//To get the details of the site with id
router.get('/:id',async(req,res)=>{
  
    try{
      const details = await SiteDetails.findOne({_id:req.params.id})
      res.send({
        statusCode:200,
        site:details
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

//To create a new site
router.post('/create',async(req,res)=>{
    try{
        const site = await SiteDetails.findOne({addressLine1:req.body.addressLine1,city:req.body.city,state:req.body.state,country:req.body.country,pincode:req.body.pincode});
        //console.log(site)
        if(site)
        {
            res.send({
                statusCode:400,
                message:"Site already exists"
              })
        }
        else
        {
            const details = await SiteDetails.create(req.body)
            res.send({
                statusCode:200,
                site:details
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

//To update the site with Id
router.put('/:id',async(req,res)=>{
    try{
      const details = await SiteDetails.updateOne({_id:req.params.id},req.body)
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

//to delete the site with id
router.delete('/:id', async(req,res)=>{
    try {
      await SiteDetails.deleteOne({_id:req.params.id})
      res.send({
        statusCode:200,
        message:"Site Deleted"
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