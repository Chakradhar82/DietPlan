const { genSalt, hash, compare } = require("bcrypt");
let connection = require("../config/database");
const { sign } = require('jsonwebtoken');

let users = (req, res, next) => {
    connection.query('SELECT * FROM user', (err, results, fields) => {
        if (err) {
            console.error('Error executing query:', err);
            res.json('Error executing query:', err)
            return;
        }
        console.log('Query results:', results);
        if (results.length === 0) {
            res.json({
                success: 0,
                data: [],
                message: "No records found"
            })
            return;
        }
        res.json({
            success: 1,
            data: results,
        })
    });
}

let getUserByID = (req, res, next) => {
    let id = req.params.id;
    console.log(id)
    let query = 'SELECT * FROM user WHERE id = ?'
    connection.query(query, [id], (err, results, fields) => {
        if (err) {
            console.error('Error executing query:', err);
            res.json('Error executing query:', err);
        }
        console.log('Query results:', results);
        if (results.length < 1) {
            res.json({
                success: 0,
                data: [],
                message: "No records found"
            })
            return;
        }
        res.json({
            success: 1,
            data: results,
        })
    });
}


const updateUser = async (req, res, next) => {
    let body = req.body;
    let password = body.password;
    let salt = await genSalt(10);
    password = await hash(password, salt);

    let query = "UPDATE user SET username = ?, email = ?,password = ? WHERE id = ?"

    connection.query(query, [body.username, body.email, password, body.id], (err, results) => {

        if (err) {
            console.error('Error executing query:', err);
            res.status(504).json('Error executing query:', err);
            return;
        }
        console.log(results);

        if (results.affectedRows === 0) {
            res.status(404).json({
                success: results.affectedRows,
                message: "unable to update the user!!"
            })
            return;
        }

        res.json({
            success: 1,
            message: "user updated succesfully!!"
        })
    })
}


let deleteUser = (req, res, next) => {
    let body = req.body;
    let query = 'DELETE FROM user WHERE id = ?';

    connection.query(query, [body.id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(504).json('Error executing query:', err);
        }

        if (results.affectedRows === 0) {
            res.status(404).json({
                success: results.affectedRows,
                message: "unable to delete the user!!"
            })
            return;
        }

        res.json({
            success: 1,
            message: "user DELETED succesfully!!"
        })
    })
}

const thirdPartyApi = async (req, res, next) => {
    let url = fetch('https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEyMDd9&s=ce40ce8b8ba365e5e6d06401e5485390',)
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
        res.json({ data: json })
    } catch (error) {
        console.error(error.message);
    }
}

const signup = async (req, res, next) => {
    console.log(req.body);

    const { first_name, last_name, email, password, age, phone, gender } = req.body;
    const salt = await genSalt(10);
    let hashpass = password;
    hashpass = await hash(hashpass, salt);
    console.log(first_name, last_name, hashpass, age, phone, gender);

    let query = "INSERT INTO user(first_name,last_name,email,password,age,phone,gender) VALUES (?,?,?,?,?,?,?)"

    connection.query(query, [first_name, last_name, email, hashpass, age, phone, gender], (err, results) => {
        if (err) {
            res.status(501).json({ err });
            return;
        }
        console.log('Data inserted successfully:', results.insertId);
        res.status(201).json(results);
    })
}

const login = (req, res, next) => {
    const body = req.body;
    let password = body.password;

    let query = "SELECT * FROM user WHERE email= ?"

    connection.query(query, [body.email], async (err, results) => {
        if (err) {
            res.status(501).json({ err });
            return;
        }
        if (results.length == 0) {
            res.status(401).json({ message: "incorrect email or password" });
            return;
        }
        let verifyPassword = await compare(password, results[0].password);
        if (verifyPassword) {
            let token = sign({ result: results[0] }, process.env.SECRET_KEY, {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            })
            res.json({
                success: 1,
                message: "login successfully!!",
                token: token
            })
            return;
        } else {
            res.status(401).json({ success: 0, message: "incorrect email or password" });
            return;
        }

    })
}


module.exports = { signup, users, getUserByID, updateUser, deleteUser, login, thirdPartyApi };