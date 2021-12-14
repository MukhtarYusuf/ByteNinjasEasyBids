const { Server } = require("socket.io");
const ProductsHelper = require('../helpers/productsHelper');
const UsersHelper = require('../helpers/usersHelper');

let persistingProducts = [];
let products = [];
let counter = 0;

async function setupSocket(server) {
    console.log('In setup socket');
    const io = new Server(server);
    
    products = await ProductsHelper.getAllProducts();
    persistingProducts = [...products];
    
    let connections = 0;
    let intervalId = startTimer(io);

    io.on('connection', (socket) => {
        connections++;
        console.log('Connections: ' + connections);
        console.log('Socket Id: ' + socket.id);
        console.log('Connected to web socket');

        socket.on('place-bid', async (params) => {
            const response = await placeBid(params.userId, params.productId);
            io.emit('bid-update', response);
        });

        socket.on('disconnect', async () => {
            connections--;
            counter = 0;

            if (connections === 0) {
                await bulkSaveProducts();
            }

            console.log('disconnected from web socket');
        });
    });
}

function startTimer(io) {
    return setInterval(() => {
        // console.log('In interval');
        // counter++;
        // io.emit('counter', counter);
        updateProductsTimeLeft(products);
        io.emit('time-left-update', products);
    }, 1000);
}

function stopTimer(intervalId) {
    clearInterval(intervalId);
}

function updateProductsTimeLeft(products) {
    for (let product of products) {
        const now = new Date().valueOf();

        if (now > product.startTime && product.timeLeft > 0) {
            // console.log('now: ' + now)
            // console.log('Inside if');
            let timeLeft = product.timeLeft - 1000;
            
            product.timeLeft = timeLeft >= 0 ? timeLeft : 0;
            if (product.timeLeft === 0) {
                product.save();
            }
        }
    }
}

async function placeBid(userId, productId) {
    const user = await UsersHelper.getUser(userId);
    const product = products.filter(product => product.id === productId)[0];
    let response = {};

    if (user.tokens > 0) {
        // Update current winnerUsername
        product.winnerUsername = user.username;

        // Update participants
        const participantsSet = new Set(product.participantUsernames);
        participantsSet.add(user.username);
        product.participantUsernames = [...participantsSet];

        // Update bidding price
        product.biddingPrice += 0.01;
        product.biddingPrice = Number(Math.round(product.biddingPrice+'e2')+'e-2'); // Round to 2 decimal places

        // Update time left
        if (product.timeLeft < 10) {
            product.timeLeft = 10;
        }

        // Update user tokens
        user.tokens--;
        await user.save();

        response['error'] = null;
    } else { // Error
        response['error'] = 'You don\'t have Enough Tokens';
    }

    response['products'] = products;
    response['product'] = product;
    response['user'] = user;

    return response;
}

async function bulkSaveProducts() {
    persistingProducts = [...products];
    
    try {
        await ProductsHelper.bulkSaveProducts(persistingProducts);
        console.log('Successfully bulk saved products');
    } catch(err) {
        console.log('Error: ' + err);
    }
}

async function syncProducts() {
    try {
        await bulkSaveProducts();
        persistingProducts = await ProductsHelper.getAllProducts();

        products = [...persistingProducts];
    } catch(err) {
        console.log('Error: ' + err);
    }
}

module.exports.setupSocket = setupSocket;
module.exports.syncProducts = syncProducts;
