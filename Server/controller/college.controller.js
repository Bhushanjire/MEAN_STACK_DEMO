const collegeSchema = require('../schema/college.schema');

const collegeController = {
    addCollege: (req, res) => {
        collegeSchema.create(req.body, function (err, result) {
            err ? res.send(err) : res.send(result);
        });
    },

    collegeList : (req,res)=>{
        collegeSchema.find(function(err,result){
            err ? res.send(err) : res.send(result);
        }).populate({
            path : "city",
            model : "City"
        });
    }
}

module.exports = collegeController;