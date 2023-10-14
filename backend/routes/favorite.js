const express = require("express");
const router = express.Router();
const joi = require("joi");
const auth = require("../middleware/auth");
const favorite = require("../modules/favorite")
const _ = require("lodash")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



//Get fav
router.get("/:_id", auth, async (req, res) => {
    try {
        const favorite = await favorite.findOne({ userId: req.params._id });
        if (!favorite) return res.status(204).send(["No favorites "]);
        res.status(200).send(favorite);
    } catch (error) {
        res.status(400).send(error);
    }
})


//Add remove from fav
router.post("/", auth, async (req, res) => {
    try {
        // 2. find user favorites
        let favorites = await favorite.findOne({ userId: req.payload._id });

        if (!favorites)
            return res.status(404).send("There is a problem contact the site management");

        // 3. check if card in favorites. if yes, remove .
        let inFavorites = favorites.cards.find((favorite) => favorite._id == req.body._id);


        if (inFavorites) {
            let indexToDelete = favorites.cards.findIndex((favorite) => favorite._id == req.body._id)
            favorites.cards.splice(indexToDelete, 1);
            favorites.markModified("favorites");



        } else {
            favorites.cards.push(req.body);
        }

        // 4. add card to favorites array
        await favorites.save();

        // 5 . return a response
        res.status(201).send("The card was added to favorites.");
    } catch (error) {
        res.status(400).send(error);
    }
});






module.exports = router;