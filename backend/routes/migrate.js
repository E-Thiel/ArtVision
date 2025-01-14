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

        await db.query(`
            DROP TABLE IF EXISTS paintings;
            CREATE TABLE IF NOT EXISTS public.paintings
            (
                id SERIAL PRIMARY KEY, 
                id_user integer,
                title text COLLATE pg_catalog."default" NOT NULL,
                description text COLLATE pg_catalog."default" NOT NULL,
                id_material integer,
                id_surface integer,
                length numeric,
                width numeric,
                price numeric,
                status text COLLATE pg_catalog."default",
                
                CONSTRAINT fk_material FOREIGN KEY (id_material)
                    REFERENCES public.materials (id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION
                    NOT VALID,
                CONSTRAINT fk_surface FOREIGN KEY (id_surface)
                    REFERENCES public.surfaces (id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION
                    NOT VALID,
                CONSTRAINT fk_user FOREIGN KEY (id_user)
                    REFERENCES public.users (id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION
                    NOT VALID
            )
            `)


        res.status(201).json({
            "message":"migrated successfully"
        }) 
})
module.exports = router;