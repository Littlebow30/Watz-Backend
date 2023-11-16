const client = require('../client');

// Put id, clothing, size, price, quantity also would like total
async function createCheckout(userId, clothesId, quanity) {
    try {
        const { rows: clothing } = await client.query(`
        INSERT INTO checkout(userId, clothesId, quantity) VALUES($1, $2, $3)
        RETURNING *; `, [userId, clothesId, quanity]);
        return clothing;       
        
    } catch(error) {
        throw error;
    }
}

async function getCheckout() {
    try {
        const { rows: checkout } = await client.query(`
            SELECT id, userId, clothesId, quantity FROM checkout
            `);
        
            return checkout;
        
    } catch(error) {
        throw error;
    }
}
// after checkout, drop inventory number in clothing data base based on clothing bought

async function inventoryCheck() {}


module.exports = {
    createCheckout,
    inventoryCheck,
    getCheckout
}