import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authJWT.js';

const router = Router();

// Public routes
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

// Protected + Admin routes
router.route('/').post(protect, admin, createProduct);
router.route('/:id').put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);

export default router;
