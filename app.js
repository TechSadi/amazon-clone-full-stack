import express from 'express';
import productRoutes from './routes/products.js';
import path from 'path';
import { fileURLToPath } from 'url';
import ejsMate from 'ejs-mate';
import methodOverride from 'method-override';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cartRoutes from './routes/cart.js';
import checkoutRoutes from './routes/checkout.js'
import ordersRoutes from './routes/orders.js'
import orderTracking from './routes/tracking.js';

dotenv.config();

connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set('query parser', 'extended');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));


// product routes
app.use('/products', productRoutes);

// cart routes
app.use('/cart', cartRoutes);

// checkout routes
app.use('/checkout', checkoutRoutes);

// orders routes
app.use('/orders', ordersRoutes);

// order tracking routes
app.use('/tracking', orderTracking);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is running.");
})