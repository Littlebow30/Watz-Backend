const client = require('../client');

async function createClothing({clothing, description, size, color, price, inventory, img}) {
    try {
        const { rows: [articleOfClothing] } = await client.query(`
        INSERT INTO clothing(clothing, description, size, color, price, inventory, img) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, clothing, description, size, color, price, inventory, img`, [clothing, description, size, color, price, inventory, img]);
        return articleOfClothing;
    } catch(error) {
        throw error;
    }
}

async function getClothing() {
    try {
        const { rows: clothing } = await client.query(`
            SELECT id, clothing, description, size, color, price, inventory, img FROM clothing
            `);
        
            return clothing;
        
    } catch(error) {
        throw error;
    }
}

async function deleteClothing(id) {
    try {
        const { rows: clothingId } = await client.query();
        
            return clothingId;
        
    } catch(error) {
        throw error;
    }
}

async function updateClothing() {
    try {
        const { rows: clothing } = await client.query()
            
            return clothing;
        
    } catch(error) {
        throw error;
    }
}


module.exports = {
    createClothing,
    getClothing,
    updateClothing,
    deleteClothing
}