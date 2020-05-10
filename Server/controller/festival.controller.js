const festivalSchema = require('../schema/festival.schema');

const festivalController = {
    addFestival: (req, res) => {
        festivalSchema.create(req.body, function (err, result) {
            err ? res.send(err) : res.send(result)
        });
    },
    festivalList: (req, res) => {
        let searchText = req.body.search
        //{ $text: { $search: req.body.search } },
        festivalSchema.find(
            function (err, result) {
                err ? res.send(err) : res.send(result)
            }).populate([{
                path: 'college',
                model: 'College',
                populate: {
                    path: 'city',
                    model: 'City'
                }
            }]).find(
                {
                    $or: [
                        {
                            name: { $regex: '.*' + searchText + '.*' }
                        },
                        {
                            "college.name": { $regex: '.*' + searchText + '.*' }
                        }
                    ]
                }
            );

        //.where('name').equals(searchText);
        // const query = festivalSchema.find();
        // query.populate([{
        //     path: 'college',
        //     model: 'College',
        //     populate: {
        //         path: 'city',
        //         model: 'City'
        //     }
        // }]);
        // if(searchText){
        //     query.where('name').equals(searchText);
        // }

        // query.exec(function (err, result) {
        //     err ? res.send(err) : res.send(result)
        // });
    }
}

module.exports = festivalController;