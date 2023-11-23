const { checkout } = require('../../api');
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

async function inventoryCheck(id, quantity) {
    try {
        const { rows: checkInventory } = await client.query(`
            SELECT id, inventory from clothing where id = $1 
            `,[id]);

            if(checkInventory.length === 0) {
                return false;
            }
            
            if (checkInventory[0].inventory >= quantity) {
                return checkInventory[0].inventory - quantity;
            }                

            return false
    } catch(error) {
        throw err;
    }

}

async function updateInventory(clothingId, inventoryNumber) {
    try {
        const { row: inventoryUpdate } = await client.query(`
        update clothing set inventory = $1 where id = $2`,[inventoryNumber, clothingId]);

    } catch(err) {
        throw err;
    }

}


module.exports = {
    createCheckout,
    inventoryCheck,
    getCheckout, 
    updateInventory
}