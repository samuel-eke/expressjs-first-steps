const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ "message": "Username and password are required" });

    //check for duplicates in the JSON db
    const duplicate = usersDB.users.find(person => person.username === user)
    if (duplicate) return res.status(409).json({ "message": "user already exists" });

    try {
        //this is for encrypting the password in a secure manner
        const hashedPassword = await bcrypt.hash(pwd, 10)

        //this line stores the new user details
        const newUser = { "username": user, "password": hashedPassword }
        usersDB.setUsers([...usersDB.users, newUser])
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users, null, 2)
        )
        console.log(usersDB.users)
        res.status(201).json({ "message": `Welcome, ${user}. Account created successfully!` })
    } catch (error) {
        res.status(500).json({ "Message": error.message })
    }
}

module.exports = { handleNewUser }