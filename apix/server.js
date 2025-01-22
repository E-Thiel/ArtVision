// Пример адаптации server.js для локального окружения
const express = require('express');
const apiRoute = require('./routes/api.js');
const authRoute = require('./routes/auth.js');
const migrateRoute = require('./routes/migrate.js');
const picturesRoute = require('./routes/imagesApi.js');
const reviewsRoute = require('./routes/reviews.js');
const cors = require('cors');

const app = express();
const port = 3000; // Используем стандартный порт для локального запуска

// Middleware для обработки JSON
app.use(cors());
app.use(express.json());

// Подключение маршрутов
app.use('/api', apiRoute);
app.use('/auth', authRoute);
app.use('/migrate', migrateRoute);
app.use('/picture', picturesRoute);
app.use('/review', reviewsRoute);

// Тестовый эндпоинт
app.get("/", (req, res) => {
    res.status(200).json({
        status: 200,
        message: "Server is running locally",
    });
});

// Обработка некорректных маршрутов
app.use((req, res) => {
    res.status(404).json({
        statusCode: 404,
        message: "Endpoint not found",
    });
});

// Обработка ошибок
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: err.stack,
    });
});

app.listen(port, () => {
    console.log(`Server running locally on port ${port}`);
});
