import mongoose from "mongoose";
import slugify from "slugify";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required:[true, "A Post must have a Title."] ,
        trim: true
    },
    slug: {
        type: String,
        unique: true
    },
    markdownContent: {
        type: String,
        required: [true, "A Post must have Content."]
    },
    author: {
        type: String,
        default: "Admin"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

postSchema.pre('save', function(next){
    if(this.isModified('title')){
        this.slug = slugify(this.title, { lower: true, strict: true })
    }
    next()
});

const Post = mongoose.model("Post", postSchema);
export default Post;