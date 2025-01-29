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

export const addToCartServer = async (id_painting, price) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
        throw new Error("No auth token found in localStorage");
    }

    const response = await fetch(`${URL}/cart/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id_painting, price }),
    });

    if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(`Failed to add item to cart: ${response.status} ${errorMsg}`);
    }

    return await response.json();
};


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