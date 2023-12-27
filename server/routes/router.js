const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");



// router.get("/",(req,res)=>{
//     console.log("connect");
// });

// register user

router.post("/register", async (req, res) => {
    const { sname, course, email, phoneNo, CGPA } = req.body;

    if (!sname || !course || !email || !phoneNo || !CGPA) {
        return res.status(422).json("Please fill in all the required fields");
    }

    try {
        const preuser = await users.findOne({ email: email });

        if (preuser) {
            return res.status(422).json("This user is already present");
        }

        const adduser = new users({
            sname, course, email, phoneNo, CGPA
        });

        await adduser.save();
        console.log(adduser);

        // Send a success response after saving the user
        res.status(201).json(adduser);
    } catch (error) {
        // Handle errors and send an appropriate response
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// get userdata

router.get("/getdata",async(req,res)=>{
    try {
        const userdata = await users.find();
        res.status(201).json(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

// get individual user

router.get("/getuser/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await users.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
})


// update user data

router.patch("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await users.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})


// delete user
router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deletuser = await users.findByIdAndDelete({_id:id})
        console.log(deletuser);
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
})




module.exports = router;









