export const getProducts = async () => {
    return [
      { id: 1, idArtist: 1, title: "Product 1", description: "Description 1", price: 500, image: "/svg/placeholders/img-placeholder.svg", material: "Paper", surface: "Matte", size: "Small" },
      { id: 2, idArtist: 2, title: "Product 2", description: "Description 1", price: 100, image: "/svg/placeholders/img-placeholder-second.svg", material: "Paper", surface: "Glossy", size: "Medium" },
      { id: 3, idArtist: 2, title: "Product 2", description: "Description 1", price: 100, image: "/svg/placeholders/img-placeholder-second.svg", material: "Paper", surface: "Glossy", size: "Medium" },
      { id: 4, idArtist: 2, title: "Product 2", description: "Description 1", price: 100, image: "/svg/placeholders/img-placeholder-second.svg", material: "Paper", surface: "Glossy", size: "Medium" },
      { id: 5, idArtist: 2, title: "Product 2", description: "Description 1", price: 100, image: "/svg/placeholders/img-placeholder-second.svg", material: "Paper", surface: "Glossy", size: "Medium" },
      { id: 6, idArtist: 2, title: "Product 2", description: "Description 1", price: 100, image: "/svg/placeholders/img-placeholder-second.svg", material: "Paper", surface: "Glossy", size: "Medium" },
      { id: 7, idArtist: 2, title: "Product 2", description: "Description 1", price: 100, image: "/svg/placeholders/img-placeholder-second.svg", material: "Paper", surface: "Glossy", size: "Medium" },
    ];
  };
  
  // id, id_artist, title, description, picture, id_materials, id_surfaces, size, price, status
  // This is a temporary solution until we have a DB.