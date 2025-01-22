// Пример адаптации всех файлов для работы с локальными данными
const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');

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
const paintings = [
    { id: 1, id_user: 1, title: 'Sunset Painting', description: 'A beautiful sunset.', price: 200, width: 50, height: 40, status: 'available' },
    { id: 2, id_user: 2, title: 'Abstract Art', description: 'Modern abstract art.', price: 350, width: 60, height: 60, status: 'available' },
    { id: 3, id_user: 3, title: 'Mountain View', description: 'A scenic mountain view.', price: 500, width: 80, height: 70, status: 'sold' },
];
const reviews = [
    { id: 1, artistId: 1, userId: 2, rating: 5, title: 'Amazing work!', body: 'I absolutely loved the painting.', date: '2025-01-10' },
    { id: 2, artistId: 2, userId: 3, rating: 4, title: 'Great quality', body: 'Well worth the price.', date: '2025-01-12' },
    { id: 3, artistId: 3, userId: 1, rating: 3, title: 'Good, but...', body: 'Could be better.', date: '2025-01-14' },
];

// Reviews API
router.post('/review/add', authenticateToken, (req, res) => {
    const { artistId, rating, title, body } = req.body;
    const id_user = req.id_user;

    let errors = [];
    if (!artistId) errors.push({ field: 'artistId', message: 'artistId is invalid' });
    if (!rating) errors.push({ field: 'rating', message: 'rating is invalid' });
    if (!title) errors.push({ field: 'title', message: 'title is invalid' });
    if (!body) errors.push({ field: 'body', message: 'body is invalid' });

    if (errors.length > 0) {
        return res.status(400).json({ status: 'Invalid inputs', message: errors });
    }

    reviews.push({ id: reviews.length + 1, artistId, userId: id_user, rating, title, body, date: new Date().toISOString() });
    res.status(201).json({ status: 'Success', message: 'Review added!' });
});

router.get('/review/getByArtist', (req, res) => {
    const { artistId } = req.query;
    if (!artistId) {
        return res.status(400).json({ status: 'Invalid inputs', message: [{ field: 'artistId', message: 'artistId is required' }] });
    }

    const filteredReviews = reviews.filter((review) => review.artistId === parseInt(artistId));
    res.status(200).json(filteredReviews);
});

// Users API
router.post('/auth/register', (req, res) => {
    const { user_name, name, email, password } = req.body;
    const id = users.length + 1;

    users.push({ id, user_name, name, email, password });
    res.status(201).json({ status: 'Success', message: 'User registered!' });
});

router.post('/auth/login', (req, res) => {
    const { user_name, password } = req.body;
    const user = users.find((u) => u.user_name === user_name && u.password === password);
    if (!user) {
        return res.status(401).json({ status: 'Error', message: 'Invalid credentials' });
    }

    res.status(200).json({ status: 'Success', message: 'Login successful', user });
});

// Paintings API
router.post('/picture/upload', authenticateToken, (req, res) => {
    const { id_material, id_surface, title, description, width, height, price } = req.body;
    const id_user = req.id_user;

    paintings.push({
        id: paintings.length + 1,
        id_user,
        id_material,
        id_surface,
        title,
        description,
        width,
        height,
        price,
        date: new Date().toISOString(),
    });

    res.status(201).json({ status: 'Success', message: 'Painting uploaded!' });
});

router.get('/picture/getAll', (req, res) => {
    res.status(200).json(paintings);
});

// General API
router.get('/general/materials', (req, res) => {
    res.status(200).json(materials);
});

router.post('/general/materials/add', (req, res) => {
    const { name } = req.body;
    materials.push({ id: materials.length + 1, name });
    res.status(201).json({ status: 'Success', message: 'Material added!' });
});

router.get('/general/surfaces', (req, res) => {
    res.status(200).json(surfaces);
});

router.post('/general/surfaces/add', (req, res) => {
    const { name } = req.body;
    surfaces.push({ id: surfaces.length + 1, name });
    res.status(201).json({ status: 'Success', message: 'Surface added!' });
});

module.exports = router;
