// Адаптация db.js для локальной работы

// Заглушка для вставки материалов в локальный массив
const insertMaterialsiIntoDb = (req, res, next) => {
    const { name } = req.body;
    let errors = [];

    if (!name || name.length === 0) {
        errors.push({
            field: "name",
            message: "name is invalid",
        });
    }

    if (errors.length > 0) {
        return res.status(400).send({
            status: "Invalid inputs",
            message: errors,
        });
    }

    // Имитируем добавление в локальный массив (например, materials)
    global.materials = global.materials || [];
    global.materials.push({ id: global.materials.length + 1, name });

    console.log(`Material '${name}' added to local storage`);
    next();
};

module.exports = { insertMaterialsiIntoDb };
