const express = require('express');
const db = require('../libraries/dataBase');
const router = express.Router();

router.all("/", async (req, res) => {

    console.log('start migrate');
    

    await db.query(`
        DROP TABLE IF EXISTS users;
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,  
            user_name varchar(255) not null UNIQUE,
            name VARCHAR(255) NOT NULL,  
            email VARCHAR(255) NOT NULL UNIQUE,  
            password VARCHAR(255) NOT NULL,  
            phone VARCHAR(50),
            address varchar(255),
            artist int                
            );

        `)

        await db.query(`
            DROP TABLE IF EXISTS materials;
            CREATE TABLE materials (
                id SERIAL PRIMARY KEY,  
                name VARCHAR(255) NOT NULL
                );
        `)

        await db.query(`
            DROP TABLE IF EXISTS surfaces;
            CREATE TABLE surfaces (
                id SERIAL PRIMARY KEY,  
                name VARCHAR(255) NOT NULL
                );
        `)


        res.status(201).json({
            "message":"migrated successfully"
        }) 
})
module.exports = router;