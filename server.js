
const express = require('express');
const app = express();
app.listen(3022, () => console.log('listenting at 3022'))
app.use(express.static('public'));


const bodyParser = require("body-parser");

app.get("/", (req, res) => {
    response.sendFile(__dirname + "/public/index.html");
});
app.use(express.json());
app.use(bodyParser.json());

("use strict");

const yelp = require("yelp-fusion");
const client = yelp.client('PvGaFk2VAiRwMTWLusp44E7tuTe9zcBYhy_J9RyHVbwiR8yy5LbFeAxJ_ppLTN_N6wkgZM8ElyRQLzBJS4726tpukC9R23DMBsqtU4M0eUIYvgYfzoUnru8_BUqMYXYx');

class Restaurant {
    constructor(name, address, review_count, price, rating, img, url) {
        this.name = name;
        this.address = address;
        this.review_count = review_count;
        this.price = price;
        this.rating = rating;
        this.img = img;
        this.url = url;
        ;

    }
}

let restaurantList = []
let deleteList = []

// Retreives user requests
app.post('/getList', (req, res) => {
    restaurantList = [];
    deleteList = []

    let food = req.body.food;
    let location = req.body.location;
    console.log(food + "and " + location);

    client.search({
        term: food,
        location: location
    })
        // utilizes the yelp Api and provides all this information 
        .then(response => {
            console.log(response.jsonBody.businesses)
            for (var x = 0; x < 16; x++) {
                let rest = new Restaurant(
                    response.jsonBody.businesses[x].name,
                    response.jsonBody.businesses[x].location.display_address,
                    response.jsonBody.businesses[x].review_count,
                    response.jsonBody.businesses[x].price,
                    Math.round(response.jsonBody.businesses[x].rating),
                    response.jsonBody.businesses[x].image_url,
                    response.jsonBody.businesses[x].url
                );
                restaurantList.push(rest);
            }
            deleteList = restaurantList;
            for (var x = 0; x < restaurantList.length; x++) {
                console.log(restaurantList[x].name);
            }
            console.log(restaurantList.length);
            // sends it back to the client side to display the information
            res.send(JSON.stringify(restaurantList));

        })
        .catch(e => {
            console.log(e)
        });
});


const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');


// to serve static files
// teammate's microservice, scraps information from webiste and displays it on the homepage
app.use(cors());


const url = 'https://www.encyclopedia.com/food/encyclopedias-almanacs-transcripts-and-maps/cuisine-evolution';

app.get('/display', (req, res) => {
    axios(url)
        .then(response => {
            const txt = response.data;
            const $ = cheerio.load(txt);
            const para = [];

            const data = "#collapseExample0 > p:nth-child(3)"
            $(data, txt).each(function () {
                const passage = $(this).text();
                para.push({ passage })
            })
            res.json(para);
        }).catch(err => console.log(err));
});
