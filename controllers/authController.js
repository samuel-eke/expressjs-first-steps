//This controller file is for handling and mangaging the user login logic

const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const bcrypt = require('bcrypt')

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ "message": "Username and password not provided" });

    const userFound = usersDB.users.find(person => person.username === user);
    console.log(userFound)
    if (!userFound) return res.sendStatus(401)

    const match = await bcrypt.compare(pwd, userFound.password)
    if (match) {
        res.json({ "message": `User ${user} logged in successfully` })
    } else {
        res.status(401).json({ "message": "This user doesnt exist" })
    }
}

module.exports = { handleLogin }