const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    name: String,
    comments: String,
    date: String,
    time: String,
    createdAt: String
},
{
    collection: 'garden',

});

//export this schema by giving it a name(Posts) and the schema it should use(PostSchema)
module.exports = mongoose.model('Posts', PostSchema);