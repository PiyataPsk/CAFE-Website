const database = require('./connect');

let productschema = database.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true},
    price: { type: String, required: true},
    sweet: { type: String, required: true}
});

const Product = database.model('product',productschema);

module.exports = Product;
