export const getProducts = async () => {
    return [
      { id: 1, idArtist: 1, title: "Canvas Art", description: "Beautiful canvas art for your living room", price: 500, image: "/svg/placeholders/img-placeholder.svg", material: "Canvas", surface: "Matte", size: "Large" },
      { id: 2, idArtist: 2, title: "Glossy Paper Poster", description: "High-quality glossy paper poster", price: 150, image: "/svg/placeholders/img-placeholder-second.svg", material: "Paper", surface: "Glossy", size: "Medium" },
      { id: 3, idArtist: 3, title: "Metal Wall Art", description: "Durable and stylish metal wall art", price: 300, image: "/svg/placeholders/img-placeholder.svg", material: "Metal", surface: "Textured", size: "Small" },
      { id: 4, idArtist: 4, title: "Abstract Art", description: "Unique abstract art piece", price: 450, image: "/svg/placeholders/img-placeholder-second.svg", material: "Canvas", surface: "Glossy", size: "Large" },
      { id: 5, idArtist: 5, title: "Minimalist Poster", description: "Simple and elegant minimalist poster", price: 100, image: "/svg/placeholders/img-placeholder.svg", material: "Paper", surface: "Matte", size: "Medium" },
      { id: 6, idArtist: 6, title: "Vintage Metal Sign", description: "Retro-style vintage metal sign", price: 200, image: "/svg/placeholders/img-placeholder-second.svg", material: "Metal", surface: "Textured", size: "Small" },
      { id: 7, idArtist: 7, title: "Custom Canvas Print", description: "Create your own custom canvas print", price: 550, image: "/svg/placeholders/img-placeholder.svg", material: "Canvas", surface: "Matte", size: "Large" },
    ];
  };
  
  // id, id_artist, title, description, picture, id_materials, id_surfaces, size, price, status
  // This is a temporary solution until we have a DB.