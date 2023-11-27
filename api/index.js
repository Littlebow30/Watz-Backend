require('dotenv').config();
const express = require('express');
const { getClothing } = require('../db/models/clothing');
const adminRouter = require("./admin")
const authRouter = require("./auth")
const { requireAuth } = require("../middleware/auth")

const client = require('../db/client');


const router = express.Router();

router.use("/admin", adminRouter)
router.use("/auth", authRouter)


router.get('/clothes/', async (req, res) => {
    try {
        const clothes = await getClothing();
        res.json(clothes);
    } catch (err) {
        throw err;
    }
})


router.get('/clothes/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await client.query('SELECT * FROM clothing WHERE id = $1', [id]);
        const product = result.rows[0];

        res.json(product);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.post('/checkout', requireAuth, async (req, res) => {
    try {
        const items = req.body;
        const user = req.user;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Invalid or empty items array in the request body' });
        }

        const cart = {
            purchases: [],
            userId: user.id
        }

        for (const item of items) {
            const result = await client.query('SELECT * FROM clothing WHERE id = $1', [item.id]);
            const product = result.rows[0];

            if (!product) {
                return res.status(404).json({ message: `Product with ID ${item.id} not found` });
            }

            // Add the purchase details to the cart
            cart.purchases.push({
                productId: item.id,
                quantity: item.quantity,
            });
        }

        // Save the cart to the database
        const cartResult = await client.query('INSERT INTO orders (userId, status) VALUES ($1, $2) RETURNING *', [cart.userId, 'Pending']);
        const orderId = cartResult.rows[0].id;

        for (const purchase of cart.purchases) {
            await client.query('INSERT INTO order_items (orderId, clothingId, quantity) VALUES ($1, $2, $3)', [orderId, purchase.productId, purchase.quantity]);
        }

        res.status(200).json({ message: 'Purchase successful!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/checkout-history', requireAuth, async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch orders for the user
        const ordersResult = await client.query('SELECT * FROM orders WHERE userId = $1', [userId]);
        const purchaseHistory = ordersResult.rows;

        // For each order, fetch associated order items with clothing details
        for (const order of purchaseHistory) {
            const orderItemsResult = await client.query(`
                SELECT order_items.id, order_items.quantity, clothing.clothing AS name, clothing.size, clothing.color, clothing.price
                FROM order_items
                JOIN clothing ON order_items.clothingId = clothing.id
                WHERE order_items.orderId = $1
            `, [order.id]);

            // Assign the order items to the purchases property of the order
            order.purchases = orderItemsResult.rows;
        }

        res.json(purchaseHistory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});




module.exports = router