// const express = require ('express');
// const router = express.Router();
// const {getContacts,getContact} =require("../controllers/contactController");
// //here
// router.route("/").get(getContacts);
// router.route("/:id").get(getContact);

// router.route("/").post((req,res)=>{
//     res.status(200).json({message:"Create Contact"});
// });

// router.route("/:id").put((req,res)=>{
//     res.status(200).json({message:`Update contact for ${req.params.id}`});
// });

// router.route("/:id").delete((req,res)=>{
//     res.status(200).json({message:`Delete contact for ${req.params.id}`});
// });

//-----------------working version 2-------------------

// const express = require('express');
// const router = express.Router();
// const {
//     getContacts,
//     getContact,
//     postContact,
//     putContact,
//     deleteContact } = require("../controllers/contactController");

// router.route("/").get(getContacts);
// router.route("/:id").get(getContact);
// router.route("/").post(postContact);
// router.route("/:id").put(putContact);
// router.route("/:id").delete(deleteContact);

// module.exports = router; 

//-----------------working version 3-------------------
const express = require('express');
const router = express.Router();
const {
    getContacts,
    getContact,
    postContact,
    putContact,
    deleteContact } = require("../controllers/contactController");

router.route("/").get(getContacts).post(postContact);
router.route("/:id").get(getContact).put(putContact).delete(deleteContact);
module.exports = router;
