const citySchema = require('../schema/city.schema');

const cityController = {
    addCity: (req, res) => {
        citySchema.create(req.body, function (err, result) {
            err ? res.send(err) : res.send(result);
        });
    },
    listCity: (req, res) => {
        citySchema.find(function (err, result) {
            err ? res.send(err) : res.send(result)
        })
    }
}

module.exports = cityController;