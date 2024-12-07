//@desc Get all contacts
//@route Get /api/contacts
//@access public
const getContacts =(req,res)=>{
    res.status(200).json({message:"Get all contacts"});
};

const getContact =(req,res)=>{
    res.status(200).json({message:`Get contact for ${req.params.id}`});
}; 

const postContact =(req,res)=>{
    console.log("the requet body is",req.body);//working till here
    const {name,email,phone} = req.body;
    if(!name||!email||!phone){
        res.status(400);
        throw new Error("All fields are mandatory!");
        
    }
    res.status(200).json({message:"Create Contact"});
};

const putContact =(req,res)=>{
    res.status(200).json({message:`Update contact for ${req.params.id}`});
};

const deleteContact =(req,res)=>{
    res.status(200).json({message:`Delete contact for ${req.params.id}`});
};



module.exports ={ getContacts,getContact,postContact,putContact,deleteContact};