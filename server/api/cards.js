const router = require('express').Router()
const {Card} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Card.findAll()
    .then(cards => {
        let gameCards = newBoard(cards)
        res.json(gameCards)
    })
    .catch(next)
})


function shuffle(array) {
    var m = array.length, t, i;
    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);
        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

function color(array) {
    let count = 0;
    shortArray = array.slice(0, 25)
    return shortArray.map(word => {
        word.selected = false;
        if (count === 0) {
            word.color = "assasin"
        }
        else if (count < 8) {
            word.color = "bystander"
        }
        else if (count % 2 === 0) {
            word.color = "red"
        } else {
            word.color = "blue"
        }
        count++;
        return word;
    })
}

function newBoard(array) {
    let output = shuffle(array);
    let colored = color(output);
    return shuffle(colored)
}