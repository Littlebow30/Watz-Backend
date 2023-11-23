const client = require('./client');
const { createUser, getUser } = require('./models/users');
const { createClothing } = require('./models/clothing');


async function dropTables() {

    try {
        await client.query(`
        DROP TABLE IF EXISTS checkout;
        DROP TABLE IF EXISTS clothing;
        DROP TABLE IF EXISTS users;`)
        
    } catch (error) {
        throw error;
    }

}

async function createTables() {
    try {
        console.log('starting to build tables...')

        await client.query(`
            CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                firstName VARCHAR(200),
                lastName VARCHAR (200),
                username VARCHAR(200) UNIQUE NOT NULL,
                password VARCHAR(200) NOT NULL
            );
            `)

        await client.query(`
        CREATE TABLE clothing(
            id SERIAL PRIMARY KEY,
            clothing VARCHAR(300),
            description TEXT,
            size VARCHAR(20),
            color VARCHAR(20),
            price DECIMAL(5,2),
            inventory INTEGER,
            img VARCHAR(200)
        );
            `)

        await client.query(`
            CREATE TABLE checkout(
                id SERIAL PRIMARY KEY,
                userId INTEGER references users(id),
                clothesId INTEGER references clothing(id),
                quantity INTEGER
            );
            `)
            
    }
    catch (error) {
        console.log('error with creating table')
        console.log(error)
    }

}

async function createInitialUsers() {

    try {
        const user = await getUser('user')

        const usersToCreate = [
            {username: 'littlebow30', password: 'littlebow30123', firstName: 'aj', lastName: 'bowman'},
            {username: 'dixonut', password: 'dixonut123', firstName: 'dixon', lastName: 'johnson'},
            {username: 'quinn-jensen', password: 'quinn-jensen123', firstName: 'quinn', lastName: 'jensen'},
        ]

        const users = await Promise.all(usersToCreate.map(createUser));
        console.log(users);

    }   catch (error) {
        console.error('Error creating user!');
        throw error; 
    }
}

async function createInitialClothing() {

    try {

        const clothingToCreate = [
            {clothing: "baseball cap", description: 'A Black one size fits all baseball cap', size: 'one size fits all', color: 'black', price: 25.00, inventory: 10, img: 'pictures/baseballCaps/blackHat.jpg'},
            {clothing: "baseball cap", description: 'A Orange one size fits all baseball cap', size: 'one size fits all', color: 'orange', price: 25.00, inventory: 10, img: 'pictures/baseballCaps/orangeHat.jpg'},
            {clothing: "baseball cap", description: 'A Tan one size fits all baseball cap', size: 'one size fits all', color: 'tan', price: 25.00, inventory: 10, img: 'pictures/baseballCaps/tanHat.jpg'},
            {clothing: "stocking cap", description: 'A Black one size fits all stocking cap', size: 'one size fits all', color: 'black', price: 20.00, inventory: 10, img: 'pictures/stockingCaps/blackStockingCap.jpg'},
            {clothing: "stocking cap", description: 'A Grey one size fits all stocking cap', size: 'one size fits all', color: 'grey', price: 20.00, inventory: 10, img: 'pictures/stockingCaps/greyStockingCap.jpg'},
            {clothing: "stocking cap", description: 'A Red one size fits all stocking cap', size: 'one size fits all', color: 'red', price: 20.00, inventory: 10, img: 'pictures/stockingCaps/redStockingCap.jpg'},
            {clothing: "crew neck", description: 'A simple black crewneck with Embroidered Logo on the front', size: 'small', color: 'black', price: 39.99, inventory: 10, img: 'pictures/crewNeck/blackCrewNeck.jpg'},
            {clothing: "crew neck", description: 'A simple black crewneck with Embroidered Logo on the front', size: 'medium', color: 'black', price: 39.99, inventory: 10, img: 'pictures/crewNeck/blackCrewNeck.jpg'},
            {clothing: "crew neck", description: 'A simple black crewneck with Embroidered Logo on the front', size: 'large', color: 'black', price: 39.99, inventory: 10, img: 'pictures/crewNeck/blackCrewNeck.jpg'},
            {clothing: "crew neck", description: 'A simple black crewneck with Embroidered Logo on the front', size: 'x large', color: 'black', price: 39.99, inventory: 10, img: 'pictures/crewNeck/blackCrewNeck.jpg'},
            {clothing: "crew neck", description: 'A simple black crewneck with Embroidered Logo on the front', size: 'xx large', color: 'black', price: 39.99, inventory: 10, img: 'pictures/crewNeck/blackCrewNeck.jpg'},
            {clothing: "crew neck", description: 'A simple black crewneck with Embroidered Logo on the front', size: 'xxx large', color: 'black', price: 39.99, inventory: 10, img: 'pictures/crewNeck/blackCrewNeck.jpg'},
            {clothing: "crew neck", description: 'A simple blue crewneck with Embroidered Logo on the front', size: 'small', color: 'blue', price: 39.99, inventory: 10, img: 'pictures/crewNeck/blueCrewNeck.jpg'},
            {clothing: "crew neck", description: 'A simple blue crewneck with Embroidered Logo on the front', size: 'medium', color: 'blue', price: 39.99, inventory: 10, img: 'pictures/crewNeck/blueCrewNeck.jpg'},
            {clothing: "crew neck", description: 'A simple blue crewneck with Embroidered Logo on the front', size: 'large', color: 'blue', price: 39.99, inventory: 10, img: 'pictures/crewNeck/blueCrewNeck.jpg'},
            {clothing: "crew neck", description: 'A simple blue crewneck with Embroidered Logo on the front', size: 'x large', color: 'blue', price: 39.99, inventory: 10, img: 'pictures/crewNeck/blueCrewNeck.jpg'},
            {clothing: "crew neck", description: 'A simple blue crewneck with Embroidered Logo on the front', size: 'xx large', color: 'blue', price: 39.99, inventory: 10, img: 'pictures/crewNeck/blueCrewNeck.jpg'},
            {clothing: "crew neck", description: 'A simple blue crewneck with Embroidered Logo on the front', size: 'xxx large', color: 'blue', price: 39.99, inventory: 10, img: 'pictures/crewNeck/blueCrewNeck.jpg'},
            {clothing: "crew neck", description: 'A simple green crewneck with Embroidered Logo on the front', size: 'small', color: 'green', price: 39.99, inventory: 10, img: 'pictures/crewNeck/greenCrewNeck.jpg'},
            {clothing: "crew neck", description: 'A simple green crewneck with Embroidered Logo on the front', size: 'medium', color: 'green', price: 39.99, inventory: 10, img: 'pictures/crewNeck/greenCrewNeck.jpg'},
            {clothing: "crew neck", description: 'A simple green crewneck with Embroidered Logo on the front', size: 'large', color: 'green', price: 39.99, inventory: 10, img: 'pictures/crewNeck/greenCrewNeck.jpg'},
            {clothing: "crew neck", description: 'A simple green crewneck with Embroidered Logo on the front', size: 'x large', color: 'green', price: 39.99, inventory: 10, img: 'pictures/crewNeck/greenCrewNeck.jpg'},
            {clothing: "crew neck", description: 'A simple green crewneck with Embroidered Logo on the front', size: 'xx large', color: 'green', price: 39.99, inventory: 10, img: 'pictures/crewNeck/greenCrewNeck.jpg'},
            {clothing: "crew neck", description: 'A simple green crewneck with Embroidered Logo on the front', size: 'xxx large', color: 'green', price: 39.99, inventory: 10, img: 'pictures/crewNeck/greenCrewNeck.jpg'},
            {clothing: "crew neck", description: 'A simple pink crewneck with Embroidered Logo on the front', size: 'small', color: 'pink', price: 39.99, inventory: 10, img: 'pictures/crewNeck/pinkCrewNeck.jpg'},
            {clothing: "crew neck", description: 'A simple pink crewneck with Embroidered Logo on the front', size: 'medium', color: 'pink', price: 39.99, inventory: 10, img: 'pictures/crewNeck/pinkCrewNeck.jpg'},
            {clothing: "crew neck", description: 'A simple pink crewneck with Embroidered Logo on the front', size: 'large', color: 'pink', price: 39.99, inventory: 10, img: 'pictures/crewNeck/pinkCrewNeck.jpg'},
            {clothing: "crew neck", description: 'A simple pink crewneck with Embroidered Logo on the front', size: 'x large', color: 'pink', price: 39.99, inventory: 10, img: 'pictures/crewNeck/pinkCrewNeck.jpg'},
            {clothing: "crew neck", description: 'A simple pink crewneck with Embroidered Logo on the front', size: 'xx large', color: 'pink', price: 39.99, inventory: 10, img: 'pictures/crewNeck/pinkCrewNeck.jpg'},
            {clothing: "crew neck", description: 'A simple pink crewneck with Embroidered Logo on the front', size: 'xxx large', color: 'pink', price: 39.99, inventory: 10, img: 'pictures/crewNeck/pinkCrewNeck.jpg'},
            {clothing: "hoodies", description: 'Black hoodie to keep you warm and looking good all year long!', size: 'small', color: 'black', price: 59.99, inventory: 10, img: 'pictures/hoodies/blackHoodie.jpg'},
            {clothing: "hoodies", description: 'Black hoodie to keep you warm and looking good all year long!', size: 'medium', color: 'black', price: 59.99, inventory: 10, img: 'pictures/hoodies/blackHoodie.jpg'},
            {clothing: "hoodies", description: 'Black hoodie to keep you warm and looking good all year long!', size: 'large', color: 'black', price: 59.99, inventory: 10, img: 'pictures/hoodies/blackHoodie.jpg'},
            {clothing: "hoodies", description: 'Black hoodie to keep you warm and looking good all year long!', size: 'x large', color: 'black', price: 59.99, inventory: 10, img: 'pictures/hoodies/blackHoodie.jpg'},
            {clothing: "hoodies", description: 'Black hoodie to keep you warm and looking good all year long!', size: 'xx large', color: 'black', price: 59.99, inventory: 10, img: 'pictures/hoodies/blackHoodie.jpg'},
            {clothing: "hoodies", description: 'Black hoodie to keep you warm and looking good all year long!', size: 'xxx large', color: 'black', price: 59.99, inventory: 10, img: 'pictures/hoodies/blackHoodie.jpg'},
            {clothing: "hoodies", description: 'Pink hoodie to keep you warm and looking good all year long!', size: 'small', color: 'pink', price: 59.99, inventory: 10, img: 'pictures/hoodies/pinkHoodie.jpg'},
            {clothing: "hoodies", description: 'Pink hoodie to keep you warm and looking good all year long!', size: 'medium', color: 'pink', price: 59.99, inventory: 10, img: 'pictures/hoodies/pinkHoodie.jpg'},
            {clothing: "hoodies", description: 'Pink hoodie to keep you warm and looking good all year long!', size: 'large', color: 'pink', price: 59.99, inventory: 10, img: 'pictures/hoodies/pinkHoodie.jpg'},
            {clothing: "hoodies", description: 'Pink hoodie to keep you warm and looking good all year long!', size: 'x large', color: 'pink', price: 59.99, inventory: 10, img: 'pictures/hoodies/pinkHoodie.jpg'},
            {clothing: "hoodies", description: 'Pink hoodie to keep you warm and looking good all year long!', size: 'xx large', color: 'pink', price: 59.99, inventory: 10, img: 'pictures/hoodies/pinkHoodie.jpg'},
            {clothing: "hoodies", description: 'Pink hoodie to keep you warm and looking good all year long!', size: 'xxx large', color: 'pink', price: 59.99, inventory: 10, img: 'pictures/hoodies/pinkHoodie.jpg'},
            {clothing: "hoodies", description: 'Purple hoodie to keep you warm and looking good all year long!', size: 'small', color: 'purple', price: 59.99, inventory: 10, img: 'pictures/hoodies/purpleHoodie.jpg'},
            {clothing: "hoodies", description: 'Purple hoodie to keep you warm and looking good all year long!', size: 'medium', color: 'purple', price: 59.99, inventory: 10, img: 'pictures/hoodies/purpleHoodie.jpg'},
            {clothing: "hoodies", description: 'Purple hoodie to keep you warm and looking good all year long!', size: 'large', color: 'purple', price: 59.99, inventory: 10, img: 'pictures/hoodies/purpleHoodie.jpg'},
            {clothing: "hoodies", description: 'Purple hoodie to keep you warm and looking good all year long!', size: 'x large', color: 'purple', price: 59.99, inventory: 10, img: 'pictures/hoodies/purpleHoodie.jpg'},
            {clothing: "hoodies", description: 'Purple hoodie to keep you warm and looking good all year long!', size: 'xx large', color: 'purple', price: 59.99, inventory: 10, img: 'pictures/hoodies/purpleHoodie.jpg'},
            {clothing: "hoodies", description: 'Purple hoodie to keep you warm and looking good all year long!', size: 'xxx large', color: 'purple', price: 59.99, inventory: 10, img: 'pictures/hoodies/purpleHoodie.jpg'},
            {clothing: "sweat pants", description: 'Black sweatpants to keep you warm on those cold days!', size: 'small', color: 'black', price: 29.99, inventory: 10, img: 'pictures/sweatPants/blackSweatPants.jpg'},
            {clothing: "sweat pants", description: 'Black sweatpants to keep you warm on those cold days!', size: 'medium', color: 'black', price: 29.99, inventory: 10, img: 'pictures/sweatPants/blackSweatPants.jpg'},
            {clothing: "sweat pants", description: 'Black sweatpants to keep you warm on those cold days!', size: 'large', color: 'black', price: 29.99, inventory: 10, img: 'pictures/sweatPants/blackSweatPants.jpg'},
            {clothing: "sweat pants", description: 'Black sweatpants to keep you warm on those cold days!', size: 'x large', color: 'black', price: 29.99, inventory: 10, img: 'pictures/sweatPants/blackSweatPants.jpg'},
            {clothing: "sweat pants", description: 'Black sweatpants to keep you warm on those cold days!', size: 'xx large', color: 'black', price: 29.99, inventory: 10, img: 'pictures/sweatPants/blackSweatPants.jpg'},
            {clothing: "sweat pants", description: 'Black sweatpants to keep you warm on those cold days!', size: 'xxx large', color: 'black', price: 29.99, inventory: 10, img: 'pictures/sweatPants/blackSweatPants.jpg'},
            {clothing: "sweat pants", description: 'Blue sweatpants to keep you warm on those cold days!', size: 'small', color: 'blue', price: 29.99, inventory: 10, img: 'pictures/sweatPants/blueSweatPants.jpg'},
            {clothing: "sweat pants", description: 'Blue sweatpants to keep you warm on those cold days!', size: 'medium', color: 'blue', price: 29.99, inventory: 10, img: 'pictures/sweatPants/blueSweatPants.jpg'},
            {clothing: "sweat pants", description: 'Blue sweatpants to keep you warm on those cold days!', size: 'large', color: 'blue', price: 29.99, inventory: 10, img: 'pictures/sweatPants/blueSweatPants.jpg'},
            {clothing: "sweat pants", description: 'Blue sweatpants to keep you warm on those cold days!', size: 'x large', color: 'blue', price: 29.99, inventory: 10, img: 'pictures/sweatPants/blueSweatPants.jpg'},
            {clothing: "sweat pants", description: 'Blue sweatpants to keep you warm on those cold days!', size: 'xx large', color: 'blue', price: 29.99, inventory: 10, img: 'pictures/sweatPants/blueSweatPants.jpg'},
            {clothing: "sweat pants", description: 'Blue sweatpants to keep you warm on those cold days!', size: 'xxx large', color: 'blue', price: 29.99, inventory: 10, img: 'pictures/sweatPants/blueSweatPants.jpg'},
        ]
            
        
        const clothing = await Promise.all(clothingToCreate.map(createClothing));
        console.log(clothing)

    }   catch (error) {
        console.error('Error creating clothing!');
        throw error; 
    }
}


async function rebuildDB() {
    try {
        console.log('building data base...')
      client.connect();
      await dropTables();
      await createTables();
      await createInitialUsers();
      await createInitialClothing();
    //   await createInitialCheckout();
      
    } catch (error) {
      console.log('Error during rebuildDB')
      throw error;
    }
  }
  
  module.exports = {
    rebuildDB
  };
  