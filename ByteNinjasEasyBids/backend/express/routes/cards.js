var express = require('express');
var router = express.Router();

const CardsHelper = require('../helpers/cardsHelper');

/*
const cardSchema = new Schema({
    nameOnCard: { type: String },
    cardNumber: { type: Number },
    ccv: { type: Number },
    expirationDate: { type: Number },
    ownerId: { type: Number },
    billingAddress1: { type: String },
    billingAddress2: { type: String },
    billingCity: { type: String },
    billingState: { type: String },
    billingCountry: { type: String },
    billingZipCode: { type: String },
}
*/

// GET: Get all Cards
router.route('/').get(async (req, res) => {
    try {
        const cards = await CardsHelper.getAllCards();
        res.json(cards);
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

// GET: Get one Card
router.route('/:id').get(async (req, res) => {
    try {
        const card = await CardsHelper.getCard(req.params.id);
        res.json(card);
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

// POST: Add a Card
router.route('/add').post(async (req, res) => {
    try {
        await CardsHelper.addCard(req.body);
        res.json('Successfully Added');
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

// PUT: Update a Card
router.route('/update/:id').put(async (req, res) => {
    try {
        await CardsHelper.updateCard(req.params.id, req.body);
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

// DELETE: Delete a Card
router.route('/delete/:id').delete(async (req, res) => {
    try {
        await CardsHelper.deleteCard(req.params.id);
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;