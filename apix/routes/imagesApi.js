// Пример адаптации imagesApi.js для работы с локальными данными
const express = require('express');
const multer = require('multer');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

// Локальные данные
const paintings = [
    { id: 1, id_user: 1, title: 'Sunset Painting', description: 'A beautiful sunset.', price: 200, width: 50, height: 40, status: 'available' },
    { id: 2, id_user: 2, title: 'Abstract Art', description: 'Modern abstract art.', price: 350, width: 60, height: 60, status: 'available' },
    { id: 3, id_user: 3, title: 'Mountain View', description: 'A scenic mountain view.', price: 500, width: 80, height: 70, status: 'sold' },
];
const materials = [
    { id: 1, name: 'Oil Painting' },
    { id: 2, name: 'Acrylic Painting' },
    { id: 3, name: 'Watercolor' },
];
const surfaces = [
    { id: 1, name: 'Canvas' },
    { id: 2, name: 'Paper' },
    { id: 3, name: 'Wood' },
];

// Настройка хранения загруженных файлов
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('image'), authenticateToken, (req, res) => {
    console.log('/upload call');

    const { id_material, id_surface, title, description, width, height, price } = req.body;
    const id_user = req.id_user;

    let errors = [];

    if (!id_material) {
        errors.push({
            field: "id_material",
            message: "id_material is invalid",
        });
    }

    if (!id_surface) {
        errors.push({
            field: "id_surface",
            message: "id_surface is invalid",
        });
    }

    if (!req.file) {
        errors.push({
            field: "image",
            message: "No file uploaded!",
        });
    }

    if (!title) {
        errors.push({
            field: "title",
            message: "title is invalid",
        });
    }

    if (!description) {
        errors.push({
            field: "description",
            message: "description is invalid",
        });
    }

    if (!width || isNaN(width)) {
        errors.push({
            field: "width",
            message: "width is invalid",
        });
    }

    if (!height || isNaN(height)) {
        errors.push({
            field: "height",
            message: "height is invalid",
        });
    }

    if (!price || isNaN(price)) {
        errors.push({
            field: "price",
            message: "price is invalid",
        });
    }

    if (errors.length > 0) {
        return res.status(400).json(errors);
    }

    const newPainting = {
        id: paintings.length + 1,
        id_user,
        title,
        description,
        id_material: parseInt(id_material),
        id_surface: parseInt(id_surface),
        width: parseFloat(width),
        height: parseFloat(height),
        price: parseFloat(price),
        status: 'Insert',
        original_file_name: req.file.originalname,
        share_path: `local/path/to/${req.file.originalname}`,
        uploaded_date: new Date().toISOString(),
    };

    paintings.push(newPainting);

    res.status(201).json({
        message: 'Image uploaded successfully',
        painting: newPainting,
    });
});

router.get('/getAll', (req, res) => {
    console.log('/getAll call');
    res.status(200).json(paintings);
});

router.get('/getByUser', authenticateToken, (req, res) => {
    console.log('/getByUser call');
    const id_user = req.id_user;
    const userPaintings = paintings.filter((painting) => painting.id_user === id_user);
    res.status(200).json(userPaintings);
});

module.exports = router;
