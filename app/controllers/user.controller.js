const User = require("../models/user.model");
 const addOneUser = async(req, res) => {

    try {
            console.log("hi i am in postuser");

        const { nameuser, passwordUser, emailUser, phoneUser } = req.body
         
        const ansNewUser = await User.create({
    
            nameUser,
            passwordUser,
            emailUser,
            phoneUser,
        });
        res.send(ansNewUser)
        
    } catch (error) {
        console.log("Can't save this user with error: " + error);
    }  
}
//איפה שומרים את ה USER הנוכחי?
const getUserById = async(req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id)
        if (!user)
            res.status(404).send({ message: "Not found user with id " + id });
        else res.send(user);
    } catch {
        res
            .status(500)
            .send({ message: "Error retrieving user with id " + id });
    }
}

const getByEmailPassword = async(req, res) => {
    const{
        password ,
        email,
    }=req.body;
    try {
        console.log("hi i am in get user by password and email");
        const user = (await User.find()).filter(u =>  u.emailUser == email && u.passwordUser === password)
        console.log(user);
        if (!user)
            res.status(404).send({ message: "Not found user with password and email " + password +" " });
        else res.send(user);
    } catch {
        res
            .status(500)
            .send({ message: "Error retrieving user with password and email " + password+" "});
    }
}
const getAllusers = async(req, res) => {
    try {
        console.log("hi i am in getAllUsers");
        const allUsers = await User.find().sort({ idUser : 1 })
        res.send(allUsers);
    } catch {
        res
            .status(500)
            .send({ message: "Error" });
    }
};

const updateUser = async(req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    try {
        console.log("hi i am in updete");
        const user = await User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        if (!user) {
            res.status(404).send({
                message: `Cannot update user with id=${id}. Maybe item was not found!`
            });
        } else res.send({ message: "User was updated successfully." });
    } catch {
        res.status(500).send({
            message: "Error updating user with id=" + id
        });
    }
};

const deleteUserById = async(req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndRemove(id)
        if (!user) {
            res.status(404).send({
                message: `Cannot delete User with id=${id}. Maybe User was not found!`
            });
        } else {
            res.send({
                message: "User was deleted successfully!"
            });
        }

    } catch {
        res.status(500).send({
            message: "Could not delete User with id=" + id
        });
    }

};

module.exports= {
    addOneUser,
    getUserById,
    getByEmailPassword,
    getAllusers,
    updateUser,
    deleteUserById,
};