const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    itemName:{
        type:String,
        required:true
    },
    store: {
        type:String,
        required:false
    }
},
{
    collection: 'Items',

});

//export this schema by giving it a name(Posts) and the schema it should use(PostSchema)
module.exports = mongoose.model('Posts', PostSchema);