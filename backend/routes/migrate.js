const express = require('express');
const db = require('../libraries/dataBase');
const router = express.Router();

router.all("/", async (req, res) => {

    console.log(db);
    

    await db.query(`
        DROP TABLE IF EXISTS users;
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,  
            name VARCHAR(255) NOT NULL,  
            email VARCHAR(255) NOT NULL UNIQUE,  
            password VARCHAR(255) NOT NULL,  
            phone VARCHAR(50),
            address varchar(255),
            artist int                
            );

        `)

        res.status(201).json({
            "message":"migrated successfully"
        }) 
})
module.exports = router;