import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import cors from 'cors';
import { materials } from './data/materials.js';
import { surfaces } from './data/surfaces.js';
import { dimensions } from './data/dimensions.js';
import { users } from './data/users.js';
import { pictures } from './data/pictures.js';
import { products } from './data/products.js';
import { reviews } from "./data/reviews.js";
  

const app = express();
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  }));


const JWT_SECRET = 'your_jwt_secret_key';




const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token is required' });

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};


app.post('/auth/register', (req, res) => {
  const { user_name, email, password, name, phone, address, artist } = req.body;

  if (!user_name || !email || !password || !name) {
    return res.status(400).json({ error: 'Missing mandatory fields' });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);
  const newUser = {
    id: users.length + 1,
    user_name,
    email,
    password: hashedPassword,
    name,
    phone,
    address,
    artist: artist === "1" ? true : false,
  };
  users.push(newUser);
  res.json({ message: 'User registered successfully' });
});


app.post('/auth/login', (req, res) => {
  const { userName, password } = req.body;
  const user = users.find((u) => u.user_name === userName);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) return res.status(401).json({ error: 'Invalid password' });

  const token = jwt.sign({ id: user.id, user_name: user.user_name, email: user.email }, JWT_SECRET);
  res.json({ token });
});


app.get('/api/general/materials', (req, res) => {
  res.json(materials);
});


app.post('/api/general/materials/add', authenticateToken, (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is mandatory' });

  const newMaterial = { id: materials.length + 1, name };
  materials.push(newMaterial);
  res.json({ message: 'Material added successfully', material: newMaterial });
});


app.get('/api/general/surfaces', (req, res) => {
  res.json(surfaces);
});


app.post('/api/general/surfaces/add', authenticateToken, (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is mandatory' });

  const newSurface = { id: surfaces.length + 1, name };
  surfaces.push(newSurface);
  res.json({ message: 'Surface added successfully', surface: newSurface });
});


app.get('/api/general/dimensions', (req, res) => {
  res.json(dimensions);
});


app.get('/picture/getAll', (req, res) => {
  res.json(products);
});


app.post('/api/products/add', authenticateToken, (req, res) => {
  const { title, description, price, image, id_material, id_surface, size, idArtist } = req.body;

  if (!title || !description || !price || !id_material || !id_surface || !size || !idArtist) {
    return res.status(400).json({ error: 'All fields are mandatory' });
  }

  const newProduct = {
    id: products.length + 1,
    title,
    description,
    price,
    image,
    id_material,
    id_surface,
    size,
    idArtist,
  };

  products.push(newProduct);
  res.json({ message: 'Product added successfully', product: newProduct });
});


const upload = multer({ dest: 'uploads/' });

app.post('/picture/upload', authenticateToken, upload.single('image'), (req, res) => {
  const { id_material, id_surface } = req.body;
  if (!id_material || !id_surface) {
    return res.status(400).json({ error: 'Material and Surface IDs are mandatory' });
  }

  const newPicture = {
    id: pictures.length + 1,
    id_material: parseInt(id_material),
    id_surface: parseInt(id_surface),
    user_id: req.user.id,
    path: req.file.path,
  };
  pictures.push(newPicture);
  res.json({ message: 'Picture uploaded successfully', picture: newPicture });
});


app.get("/api/reviews/:artistId", (req, res) => {
  const { artistId } = req.params;
  const artistReviews = reviews.filter((review) => review.artistId === parseInt(artistId));
  res.json(artistReviews);
});


app.post("/api/reviews", (req, res) => {
  const { artistId, userId, rating, title, body } = req.body;

  if (!artistId || !userId || !rating || !title || !body) {
    return res.status(400).json({ error: "All fields are mandatory" });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be between 1 and 5" });
  }

  const newReview = {
    id: reviews.length + 1,
    artistId: parseInt(artistId),
    userId: parseInt(userId),
    rating,
    title,
    body,
    date: new Date().toISOString().split("T")[0],
  };

  reviews.push(newReview);
  res.status(201).json(newReview);
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
