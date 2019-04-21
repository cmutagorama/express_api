const express = require("express");
const router = express.Router();
const Ninja = require('../models/ninja');

// Get a list of ninjas from DB
router.get("/ninjas", (req, res, next) => {
    Ninja.aggregate([{
        $geoNear: {
            near: {
                type: "Point",
                coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
            },
            distanceField: "dist.calculated",
            maxDistance: 100000,
            spherical: true
        }
    }]).then((ninjas) => {
        res.send(ninjas);
    }).catch(next);
});

// Add a new ninja to DB
router.post('/ninjas', (req, res, next) => {
    Ninja.create(req.body).then((ninja) => {
        res.send(ninja);
    }).catch(next);
});

// Update a ninja in DB
router.put('/ninjas/:id', (req, res, next) => {
    Ninja.findByIdAndUpdate({
        _id: req.params.id
    }, req.body).then(() => {
        Ninja.findOne({
            _id: req.params.id
        }).then((ninja) => {
            res.send(ninja);
        });
    });
});

// Delete a ninja from DB
router.delete('/ninjas/:id', (req, res, next) => {
    Ninja.findByIdAndRemove({
        _id: req.params.id
    }).then((ninja) => {
        res.send(ninja);
    }).catch(next);
});

module.exports = router;