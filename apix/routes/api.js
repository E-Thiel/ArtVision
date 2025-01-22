// Пример адаптации api.js для работы с локальными данными
const express = require('express');

const router = express.Router();

// Локальные данные
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
const dimensions = [
    { id: 1, name: 'Small', min_area: 0, max_area: 100 },
    { id: 2, name: 'Medium', min_area: 101, max_area: 300 },
    { id: 3, name: 'Large', min_area: 301, max_area: 600 },
];

router.get('/general/materials', (req, res) => {
    console.log('/general/materials call');
    res.status(200).json(materials);
});

router.post('/general/materials/add', (req, res) => {
    console.log('/general/materials/add call');
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            status: "Invalid inputs",
            message: [{
                field: "name",
                message: "name is required",
            }],
        });
    }

    const newMaterial = { id: materials.length + 1, name };
    materials.push(newMaterial);

    res.status(201).json({
        status: "Success",
        message: `The material ${name} has been added!`,
    });
});

router.get('/general/surfaces', (req, res) => {
    console.log('/general/surfaces call');
    res.status(200).json(surfaces);
});

router.post('/general/surfaces/add', (req, res) => {
    console.log('/general/surfaces/add call');
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            status: "Invalid inputs",
            message: [{
                field: "name",
                message: "name is required",
            }],
        });
    }

    const newSurface = { id: surfaces.length + 1, name };
    surfaces.push(newSurface);

    res.status(201).json({
        status: "Success",
        message: `The surface ${name} has been added!`,
    });
});

router.get('/general/dimensions', (req, res) => {
    console.log('/general/dimensions call');
    res.status(200).json(dimensions);
});

router.post('/general/dimensions/add', (req, res) => {
    console.log('/general/dimensions/add call');
    const { name, min_area, max_area } = req.body;

    if (!name || min_area === undefined || max_area === undefined) {
        return res.status(400).json({
            status: "Invalid inputs",
            message: [
                { field: "name", message: "name is required" },
                { field: "min_area", message: "min_area is required" },
                { field: "max_area", message: "max_area is required" },
            ],
        });
    }

    const newDimension = {
        id: dimensions.length + 1,
        name,
        min_area: parseFloat(min_area),
        max_area: parseFloat(max_area),
    };

    dimensions.push(newDimension);

    res.status(201).json({
        status: "Success",
        message: `The dimension ${name} has been added!`,
    });
});

module.exports = router;
