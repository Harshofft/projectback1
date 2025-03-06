import express from 'express'; 
import cors from 'cors'   
import dotenv from 'dotenv'
dotenv.config();       
const app = express();

app.use(express.json());    
app.use(cors())
const PORT = process.env.PORT;


let FOODITEM =[
    {
        id:1,
        name:"Pizza",
        price:100,
        description:"Delicious Pizza",
    },
    {
        id:2,
        name:"Burger",
        price:80,
        description:"Delicious Burger",
    },
    {
        id:3,
        name:"Pasta",
        price:70,
        description:"Delicious Pasta",
    },
    {
        id:4,
        name:"Sandwich",
        price:50,
        description:"Delicious Sandwich",
    }
]
app.get('/health',(req,res)=>{
    res.json({
        success:true,
        message:"Server is running",
    });


})
app.get('/food', (req,res)=>{
    res.json({
        success:true,
        message:"Food Items",
        data:FOODITEM,
    })
})
// for finding a particular food item
app.get('/food/:id',(req,res)=>{
    
    const {id} = req.params;
    let foodindex = -1;
    FOODITEM.map((food,index)=>{
        if(food.id == id){
            foodindex = index;
        }
    })
    res.json({
        success:true,
        message:"Food Item",
        data:FOODITEM[foodindex],
    })

})
// for adding a new food item
app.post('/food',(req , res)=>{
    const {id,name,description,price} = req.body; // req body is used to get the data from the client
    if(!name || !description || !price || !id){ 
        res.status(400).json({
            success:false,
            message:"Please provide all the details",
        })
    }
    // check if the food item already exists
    const sameFood = FOODITEM.find((food)=>{
        if (food.id==id) {
            return true;
        }
    });
    if (sameFood) {
        return res.json({
            success:false,
            message:"Food item already exists",
        }) 
    }
    const newFood ={
        id:id,
        name,
        description,
        price,
    }
    FOODITEM.push(newFood);
    res.status(201).json({
        success:true,
        message:"Food item added successfully",
        data:newFood,
    })

})
app.delete('/food/:id',(req,res)=>{
    const {id}= req.params;
    let foodindex=-1;
     
    FOODITEM.map((food,index)=>{
        if (food.id==id) {
           foodindex= index;
           console.log(food)
        }
    })
    if (foodindex==-1) {
        return res.json({
            success:false,
            msg:"food item not found"
        })
    }
    FOODITEM.splice(foodindex,1);
    res.json({
        success:true
        ,msg:"item is deleted"
    })

})

// this code for the put

app.put("/food/:id",(req,res)=>{
    const {id}=req.params;
    const {name,description,price}=req.body;
    let foodindex=-1;

    FOODITEM.map((food,index)=>{
        if(food.id==id){
            foodindex=index;
        }
    })
    if(foodindex==-1){
        return res.json({
            success:false,
            msg:"food item not found"
        })
    }
    const updatedFood={
        id:id,
        name,
        description,
        price,
    }
    FOODITEM[foodindex]=updatedFood;
    res.json({
        success:true,
        msg:"item is updated",
        data:updatedFood
    })
})
// patch node 
app.patch("/food/:id",(req,res)=>{
    const {id}=req.params;
    const {name} = req.body;
    let foodindex=-1;
    FOODITEM.map((food,index)=>{
        if(food.id==id){
            foodindex=index;
        }
    })
    if(foodindex==-1){
        return res.json({
            success:false,
            msg:"food item not found"
        })
    }
    const updatedfood = FOODITEM[foodindex];
    updatedfood.name=name;
    res.json({
        success:true,
        msg:"item is updated",
        data:updatedfood
    })
})
app.use("*",(req,res)=>{
    res.status(404).json({
        success:false,
        msg:"page not found"
    })
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})