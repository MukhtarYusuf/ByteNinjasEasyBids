const Card = require('../models/card.model');

// Get All Cards
async function getAllCards() {
    const cards = await Card.find().exec();
    return cards;
}

// Get one Card
async function getCard(cardId) {
    const card = await Card.findById(cardId).exec();
    return card;
}

// Add a Card
async function addCard(card) {
    const nameOnCard = card.nameOnCard;
    const cardNumber = card.cardNumber;
    const ccv = card.ccv;
    const expirationDate = card.expirationDate;
    const ownerId = card.ownerId;
    const billingAddress1 = card.billingAddress1;
    const billingAddress2 = card.billingAddress2;
    const billingCity = card.billingCity;
    const billingState = card.billingState;
    const billingCountry = card.billingCountry;
    const billingZipCode = card.billingZipCode;

    const newCard = new Card({
        nameOnCard,
        cardNumber,
        ccv,
        expirationDate,
        ownerId,
        billingAddress1,
        billingAddress2,
        billingCity,
        billingState,
        billingCountry,
        billingZipCode,
    });

    await newCard.save()
}

// Update a Card
async function updateCard(cardId, card) {
    const cardToUpdate = await Card.findById(cardId).exec();

    cardToUpdate.nameOnCard = card.nameOnCard;
    cardToUpdate.cardNumber = Number(card.cardNumber);
    cardToUpdate.ccv = Number(card.ccv);
    cardToUpdate.expirationDate = Number(card.expirationDate);
    cardToUpdate.ownerId = card.ownerId;
    cardToUpdate.billingAddress1 = card.billingAddress1;
    cardToUpdate.billingAddress2 = card.billingAddress2;
    cardToUpdate.billingCity = card.billingCity;
    cardToUpdate.billingState = card.billingState;
    cardToUpdate.billingCountry = card.billingCountry;
    cardToUpdate.billingZipCode = card.billingZipCode;

    await cardToUpdate.save();
}

// Delete a Card
async function deleteCard(cardId) {
    await Card.findByIdAndDelete(cardId).exec();
}

module.exports.getAllCards = getAllCards;
module.exports.getCard = getCard;
module.exports.addCard = addCard;
module.exports.updateCard = updateCard;
module.exports.deleteCard = deleteCard;