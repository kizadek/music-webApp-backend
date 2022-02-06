const bcrypt = require("bcrypt");


//@ function for hashing data
exports. hashFunction  = async (planText , saltrounds = 10)=>{
    try {
       //Generate a salt 
       const salt = await bcrypt.genSalt(saltrounds);
       // return  Hash data
       return await bcrypt.hash(planText,salt)
    } catch (error) {
        console.log(`ERROR::${error}`)
    }
    //return null if error
    return null;
}


//compare-Hashed-Data
exports.compareHashe = async (planText,hashedData) =>{
    try {
        //compareHashe
        return await bcrypt.compare(planText,hashedData);
    } catch (error) {
        console.log(`ERROR:${error}`)
    }
    // if error return false
    return false
}

exports. comp