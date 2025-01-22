// Адаптация dataBase.js для локального окружения

class Database {
    constructor() {
        this.data = {
            users: [
                { id: 1, user_name: 'artist1', name: 'John Doe', email: 'john@example.com', phone: '1234567890', address: '123 Street', artist: true },
                { id: 2, user_name: 'artist2', name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', address: '456 Avenue', artist: false },
                { id: 3, user_name: 'artist3', name: 'Mike Brown', email: 'mike@example.com', phone: '1122334455', address: '789 Boulevard', artist: true },
            ],
            
            products: [
                { id: 1, id_user: 1, title: 'Sunset Painting', description: 'A beautiful sunset.', price: 200, width: 50, height: 40, status: 'available' },
                { id: 2, id_user: 2, title: 'Abstract Art', description: 'Modern abstract art.', price: 350, width: 60, height: 60, status: 'available' },
                { id: 3, id_user: 3, title: 'Mountain View', description: 'A scenic mountain view.', price: 500, width: 80, height: 70, status: 'sold' },
            ],
        
            reviews: [
                { id: 1, artistId: 1, userId: 2, rating: 5, title: 'Amazing work!', body: 'I absolutely loved the painting.', date: '2025-01-10' },
                { id: 2, artistId: 2, userId: 3, rating: 4, title: 'Great quality', body: 'Well worth the price.', date: '2025-01-12' },
                { id: 3, artistId: 3, userId: 1, rating: 3, title: 'Good, but...', body: 'Could be better.', date: '2025-01-14' },
            ],
        
            materials: [
                { id: 1, name: 'Oil Painting' },
                { id: 2, name: 'Acrylic Painting' },
                { id: 3, name: 'Watercolor' },
            ],
        
            surfaces: [
                { id: 1, name: 'Canvas' },
                { id: 2, name: 'Paper' },
                { id: 3, name: 'Wood' },
            ],
        
            dimensions: [
                { id: 1, name: 'Small', min_area: 0, max_area: 100 },
                { id: 2, name: 'Medium', min_area: 101, max_area: 300 },
                { id: 3, name: 'Large', min_area: 301, max_area: 600 },
            ],
        };
    }

    async query(queryText, params) {
        // Логика эмуляции базы данных (упрощенный пример)
        console.log('Simulated query:', queryText, params);

        // Для упрощения возвращаем "пустую" структуру
        return { rows: [], rowCount: 0 };
    }

    async close() {
        console.log('Simulated database connection closed');
    }
}

module.exports = new Database();
