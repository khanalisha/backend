const mongoose = require("mongoose");
const PostSchema = mongoose.Schema({
    title:String,
    body: String,
    device: String,
    no_of_comments : Number
    
});


const postModal = mongoose.model("post", PostSchema);
module.exports = {
  postModal,
};
