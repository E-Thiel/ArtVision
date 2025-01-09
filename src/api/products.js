export const getProducts = async () => {
    return [
      { id: 1, title: "Product 1", description: "Description 1", price: 100, image: "/img-placeholder.svg", material: "Paper", surface: "Aquarelle", size: "small" },
      { id: 2, title: "Product 2", description: "Description 1", price: 100, image: "/img-placeholder-second.svg", material: "Paper", surface: "SurfaceTwo", size: "small" },
    ];
  };
  
  // id, id_artist, title, description, picture, id_materials, id_surfaces, size, price, status
  // This is a temporary solution until we have a DB.