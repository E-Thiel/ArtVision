const express = require('express');
const dataBase = require('../libraries/dataBase');

const router = express.Router();

router.get('/general/materials', async (req, res) => {
    const records = await dataBase.query('select * from materials');
    res.send(records.rows)
    console.log(records.rows);

})

router.post('/general/materials/add', async (req, res) => {
    const { name } = req.body;
    let errors = [];

    if (!name || name.length == 0) {
        errors.push({
            "field": "name",
            "message": "name is invalid"
        })
    }

    if (errors.length > 0) {
        res.status(401)
        res.send({
            "Status": "Invalid inputs",
            "message": errors
        })
    }
    else {

        const records = await dataBase.query('insert into materials (name) values ($1)', [name]).catch(err => {
            res.status(500)
            res.send(
                {
                    "Status": "rror writting to DB",
                    "message": err.detail
                }
            )
        })

        if (records) {
            res.status(200);
            res.send(
                {
                    "Status": "Success",
                    "message": `The material ${name} has been added!`
                })

        }
    }

})

router.get('/general/surfaces', async (req, res) => {
    const records = await dataBase.query('select * from surfaces');
    res.send(records.rows)
    console.log(records.rows);

})


router.post('/general/surfaces/add', async (req, res) => {
    const { name } = req.body;
    let errors = [];

    if (!name || name.length == 0) {
        errors.push({
            "field": "name",
            "message": "name is invalid"
        })
    }

    if (errors.length > 0) {
        res.status(401)
        res.send({
            "Status": "Invalid inputs",
            "message": errors
        })
    }
    else {

        const records = await dataBase.query('insert into surfaces (name) values ($1)', [name]).catch(err => {
            res.status(500)
            res.send(
                {
                    "Status": "rror writting to DB",
                    "message": err.detail
                }
            )
        })

        if (records) {
            res.status(200);
            res.send(
                {
                    "Status": "Success",
                    "message": `The surfaces ${name} has been added!`
                })

        }
    }

})

module.exports = router;