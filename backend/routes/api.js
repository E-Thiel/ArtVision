const express = require('express');
const dataBase = require('../libraries/dataBase');
const multer = require('multer');

const router = express.Router();

// Configure Multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

router.get('/general/materials', async (req, res) => {
    const records = await dataBase.query('select * from materials');
    res.send(records.rows)
    
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


router.post('/painting/add',upload.single('image'), async (req, res) => {
    const {title, description, id_user, id_material, id_surface, width, height, imagePath, price} = req.body;
    const file  = req.file;

    let errors = [];

    if (!title || title.length == 0) {
        errors.push({
            "field": "title",
            "message": "title is invalid"
        })
    }

    if (!description || description.length == 0) {
        errors.push({
            "field": "description",
            "message": "description is invalid"
        })
    }

    if (!id_user || id_user.length == 0) {
        errors.push({
            "field": "id_user",
            "message": "id_user is invalid"
        })
    }

    
    if (!id_material || id_material.length == 0) {
        errors.push({
            "field": "id_material",
            "message": "id_material is invalid"
        })
    }

    if (!id_surface || id_surface.length == 0) {
        errors.push({
            "field": "id_surface",
            "message": "id_surface is invalid"
        })
    }

    if (!width || width.length == 0) {
        errors.push({
            "field": "width",
            "message": "width is invalid"
        })
    }

    if (!height || height.length == 0) {
        errors.push({
            "field": "height",
            "message": "height is invalid"
        })
    }

    if (!imagePath || imagePath.length == 0) {
        errors.push({
            "field": "imagePath",
            "message": "imagePath is invalid"
        })
    }

    if (!file) {
        errors.push({
            "field": "file",
            "message": "No file uploaded!"
        })
      }




    if(errors.length < 0 ){
        res.status(401)
        res.send({
            "Status": "Invalid inputs",
            "message": errors
        })
    }
    else {
        /* const results = await  dataBase.query(`INSERT INTO paintings(
                id_user, title, description, id_material, id_surface, length, width, price, status, data)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, [id_user, title, description, id_material, id_surface, height, width, price, 'Creat', file.buffer]) */
                const results = await  dataBase.query(`INSERT INTO test(
                     image)
                    VALUES ($1)`, [ file.buffer])
                .catch(err => {
                    res.send(
                        {
                            "Status": "rror writting to DB",
                            "message": err.detail
                        }
                    )
                });                
                
        if(results){
            res.status(200);
            res.send(
                {
                    "Status": "Success",
                    "message": `Upload `
                })
        }
    }

})


// Retrieve an Image
router.get('/painting/get', async (req, res) => {
    const { id } = req.params;
  
    try {
      const query = 'SELECT image FROM test';
      const result = await dataBase.query(query);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Image not found' });
      }
  
      const { name, data, image } = result.rows[0];

      console.log(image)
  
      res.set('Content-Type', result.rows[0].content_type)
      res.send(result.rows[0].image)
    } catch (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Failed to retrieve image' });
    }
  });


module.exports = router;