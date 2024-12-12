//@desc Get all contacts
//@route Get /api/contacts
//@access public
const asyncHandler = require("express-async-handler");
const Contact =require("../models/contactModel");// importing the model before crud operations.
const getContacts =asyncHandler(async(req,res)=>{
    
    const contacts =await Contact.find();
    res.status(200).json(contacts);
});

const getContact =asyncHandler(async(req,res)=>{
    const contact= await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    res.status(200).json(contact);
}); 

const postContact =asyncHandler(async(req,res)=>{
    console.log("the requet body is",req.body);//working till here
    const {name,email,phone} = req.body;
    if(!name||!email||!phone){
       
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
    });

    res.status(201).json(contact);
});

const putContact =asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
// findByIdAndUpdat takes three parameters first id, new body we want to update, query option to true 
    const Updatedcontact =await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );

    res.status(200).json(Updatedcontact);
});

const deleteContact =asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.deleteOne()
    res.status(200).json( "Deleted the following contact",);
});



module.exports ={ getContacts,getContact,postContact,putContact,deleteContact};