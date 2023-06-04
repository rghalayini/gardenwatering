const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    date:{
        type:String,
        required:true
    },
    time: {
        type:String,
        required:true
    },
    name: {
        type:String,
        required:true
    },
    comments: {
        type:String,
        required:false
    }
},
{
    collection: 'garden',

});

//export this schema by giving it a name(Posts) and the schema it should use(PostSchema)
module.exports = mongoose.model('Posts', PostSchema);