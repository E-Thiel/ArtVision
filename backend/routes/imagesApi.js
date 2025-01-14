
const express = require('express');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const dataBase = require('../libraries/dataBase');
const { route } = require('./api');
require('dotenv').config();

const router = express.Router();

const storage = multer.diskStorage({});
const upload = multer({ storage });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

router.post('/upload', upload.single('image'), async (req, res) => {
    const file = req.file;
    const {id_material, id_surface, id_user} =  req.body;

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        // Upload the image to Cloudinary
        const result = await cloudinary.uploader.upload(file.path);
                
        // insert into db
        const records = await dataBase.query(`INSERT INTO public.paintings(
         id_user, title, description, id_material, id_surface, length, width, price, status,  original_file_name, share_path, uploaded_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
         [id_user, 'Title', 'Description', id_material, id_surface, '100', '200', 9.8, 'Insert',  result.original_filename, result.secure_url, (new Date()).toLocaleDateString()])
            .catch(err => {
                res.status(500)
                res.send(
                    {
                        "Status": "rror writting to DB",
                        "message": err
                    }
                )
            }) 

        res.status(200).json({
            message: 'Image uploaded successfully',
            url: result.secure_url,
        });

    } catch (err) {
        console.error('Cloudinary error:', err);
        res.status(500).json({ error: 'Failed to upload image' });
    }
});


router.get('/getAll', async (req, res) => {
    try {
      const result = await dataBase.pool.query(`select 
            p.id, p.id_material, m.name material_name,
            p.id_surface, s.name as surface_name,
            p.title, p.description, p.length, p.width, p.price, p.share_path,
            p.id_user, u.name, p.uploaded_date
            from  paintings as  p
            join materials as m on p.id_material = m.id
            join surfaces as s on p.id_surface = s.id
            join users as u on p.id_user = u.id`);
      res.status(200).json(result.rows);
    } catch (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Failed to fetch images' });
    }
  });

module.exports = router;