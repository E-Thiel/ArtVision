// Пример адаптации migrate.js для работы с локальными данными
const express = require('express');
const router = express.Router();

// Локальные данные
const users = [
    { id: 1, user_name: 'artist1', name: 'John Doe', email: 'john@example.com', phone: '1234567890', address: '123 Street', artist: true },
    { id: 2, user_name: 'artist2', name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', address: '456 Avenue', artist: false },
    { id: 3, user_name: 'artist3', name: 'Mike Brown', email: 'mike@example.com', phone: '1122334455', address: '789 Boulevard', artist: true },
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
const dimensions = [
    { id: 1, name: 'Small', min_area: 0, max_area: 100 },
    { id: 2, name: 'Medium', min_area: 101, max_area: 300 },
    { id: 3, name: 'Large', min_area: 301, max_area: 600 },
];
const reviews = [
    { id: 1, artistId: 1, userId: 2, rating: 5, title: 'Amazing work!', body: 'I absolutely loved the painting.', date: '2025-01-10' },
    { id: 2, artistId: 2, userId: 3, rating: 4, title: 'Great quality', body: 'Well worth the price.', date: '2025-01-12' },
    { id: 3, artistId: 3, userId: 1, rating: 3, title: 'Good, but...', body: 'Could be better.', date: '2025-01-14' },
];

router.all("/", (req, res) => {
    console.log('start migrate');

    // Очистка данных
    users.length = 0;
    materials.length = 0;
    surfaces.length = 0;
    dimensions.length = 0;
    reviews.length = 0;

    res.status(201).json({
        message: "Migration completed successfully",
    });
});

router.all('/populate', (req, res) => {
    console.log('start populate with data');

    // Загрузка материалов
    const defaultMaterials = ["oil painting", "acrylic painting", "watercolour", "gouache", "egg tempera", "ink", "graphite", "mixed media", "other"];
    defaultMaterials.forEach((material, index) => {
        materials.push({ id: index + 1, name: material });
    });

    console.log('Materials populated:', materials);

    // Загрузка поверхностей
    const defaultSurfaces = ["paper", "canvas", "wood", "cardboard", "fabric", "glass", "metal", "other"];
    defaultSurfaces.forEach((surface, index) => {
        surfaces.push({ id: index + 1, name: surface });
    });

    console.log('Surfaces populated:', surfaces);

    // Загрузка размеров
    const defaultDimensions = [
        { name: "small", min_area: 0, max_area: 100 },
        { name: "medium", min_area: 101, max_area: 300 },
        { name: "large", min_area: 301, max_area: 600 },
        { name: "extra large", min_area: 601, max_area: 1000 },
    ];
    defaultDimensions.forEach((dimension, index) => {
        dimensions.push({ id: index + 1, ...dimension });
    });

    console.log('Dimensions populated:', dimensions);

    res.status(201).json({
        message: "Data populated successfully",
    });
});

module.exports = router;
