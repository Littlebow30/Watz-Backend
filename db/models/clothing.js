const client = require('../client');

async function createClothing({clothing, description, size, color, price, inventory}) {
    try {
        const { rows: [articleOfClothing] } = await client.query(`
        INSERT INTO clothing(clothing, description, size, color, price, inventory) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, clothing, description, size, color, price, inventory`, [clothing, description, size, color, price, inventory]);
        return articleOfClothing;
    } catch(error) {
        throw error;
    }
}

async function getClothing() {
    try {
        const { rows: clothing } = await client.query(`
            SELECT id, newClothing, description, size, color, price FROM clothing
            `);
        
            return clothing;
        
    } catch(error) {
        throw error;
    }
}


module.exports = {
    createClothing,
    getClothing
}