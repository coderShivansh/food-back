const express=require('express');
const router=express.Router();
const Food=require('../models/foodModel')

router.get("/getallfoods", async (req,res)=>{
    try{
          const foods=await Food.find({})
          res.send(foods)
    }catch(error){
        return res.status(400).json({message:error});
    }
});


router.post("/addfood", async(req,res)=>{
    const food=req.body.food
try{
    const newfood= new Food({
        name : food.name,
        image : food.image,
        description : food.description,
        category : food.category,
        prices : [food.prices],
        varients: ["small","medium","large","NA"]
    })
    
     await newfood.save()
     res.send('New Food Added Successfully')

} catch(error) 
{
      return res.status(400).json({message : error})
}

})

router.post("/getfoodbyid",async (req,res)=>{

    const foodid= req.body.foodid

    try { 
        const food=await Food.findOne({_id : foodid})
        res.send(food)
    } catch (error) {
        return res.status(400).json({message : error})
    }
    
})

router.post("/editfood" , async (req,res)=>{

    const updatedfood= req.body.updatedfood

    try {
        const food=await Food.findOne({_id : updatedfood._id})

        food.name=updatedfood.name,
        food.description = updatedfood.description,
        food.image= updatedfood.image,
        food.category=updatedfood.category,
        food.prices= [updatedfood.prices]

        await food.save()

        res.send('Food Detail edited Successfully')
    } catch (error)
    {
        return res.status(400).json({message : error})
    }
})


router.post("/deletefood", async (req,res)=>{

    const foodid= req.body.foodid
    
    try {
        await Food.findOneAndDelete({_id: foodid})
        res.send('Dish Deleted Successfully')
    } catch (error) {
        return res.status(400).json({message : error})
    }
})

module.exports=router;
