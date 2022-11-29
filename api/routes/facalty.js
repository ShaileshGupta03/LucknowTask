const express=require('express')
const router=express.Router();
 
router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"this is facalty get request"
    })
})
router.post('/',(req,res,next)=>{
   console.log(req.body)
})
module.exports=router;