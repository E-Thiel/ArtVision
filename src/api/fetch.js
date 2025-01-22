const URL = 'https://art-vision-e0c9a8f9d1d5.herokuapp.com';

export const getMaterials = async () => {
    const response = await fetch(`${URL}/api/general/materials`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch materials");
    }
    return await response.json();
};

export const getSurfaces = async () => {
    const response = await fetch(`${URL}/api/general/surfaces`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch surfaces");
    }
    return await response.json();
};

export const getDimensions = async () => {
    const response = await fetch(`${URL}/api/general/dimensions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch dimensions");
    }
    return await response.json();
};

export const getAll = async () => {
    const response = await fetch(`${URL}/picture/getAll`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch all pictures");
    }
    return await response.json();
};

export const getByIdUser = async (idUser) => {
    const response = await fetch(`${URL}/picture/getByIdUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idUser }),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch pictures by user ID");
    }
    return await response.json();
};

export const getByArtist = async (artistId) => {
    const response = await fetch(`${URL}/review/getByArtist`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ artistId }),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch reviews by artist ID");
    }
    return await response.json();
};

export const getFilteredItems = async (filters) => {
    const response = await fetch(`${URL}/picture/getFiltered`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch filtered items");
    }
    return await response.json();
};


// ========================================================
//  AUTH
// ========================================================

export const registerUser = async (userData) => {
    // userData содержит поля: user_name, email, password, name, phone, address, artist
    // (см. документацию)
    const response = await fetch(`${URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Register failed: ${errorText}`);
    }
    return await response.json(); // предположим, что в успешном ответе приходит {Status: 'Success', ...}
};

export const loginUser = async (userName, password) => {
    const response = await fetch(`${URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Login failed: ${errorText}`);
    }
    // Ожидаем, что в случае успеха приходит объект с ключом (токеном) и данными пользователя
    // Например: { key: "...jwt...", userName: "john", email: "...", id: 123 }
    return await response.json();
};

// ========================================================
//  CART
// ========================================================

// Добавить товар в корзину (уже авторизованный пользователь)
export const addToCartServer = async (id_painting, price) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
        throw new Error("No auth token found in localStorage");
    }

    const response = await fetch(`${URL}/cart/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // ВАЖНО: используем Bearer + token
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id_painting, price }),
    });

    if (!response.ok) {
        // Можно посмотреть текст ошибки, чтобы понять, что именно не так:
        const errorMsg = await response.text();
        throw new Error(`Failed to add item to cart: ${response.status} ${errorMsg}`);
    }

    return await response.json();
};

// Получить товары из корзины (уже авторизованный пользователь)
export const viewCartServer = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
        throw new Error("No auth token found");
    }

    const response = await fetch(`${URL}/cart/view`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({})
    });

    if (!response.ok) {
        throw new Error("Failed to fetch cart items from server");
    }
    return await response.json();
};