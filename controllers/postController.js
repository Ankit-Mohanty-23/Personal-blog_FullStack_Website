import Post from "../models/postModel.js";

/**
 * @desc    Create new blog Post
 * @route   POST /api/posts
 * @access  Public (for now)
 */

export async function createPost(req, res){
    try{
        const {title, markdownContent, author} = req.body;

        if(!title || !markdownContent){
        }

        const newPost = await Post.create({
            title,
            markdownContent,
            author
        });
        return res.status(201).json(newPost);
    }catch(error){
        console.log(error);
        return res.status(400).json({msg: "Error creating post! ", error: error.message});
    }
};

/**
 * @desc    Get all blog posts
 * @route   GET /api/posts
 * @access  Public
 */

export async function getAllPosts(req, res){
    try{
        const data = await Post.find({}).sort({createdAt: -1});
        res.status(201).json(data);
    }catch(error){
        console.log(error);
        return res.status(400).json({msg: "Error fetching data!", error: error.message});
    }
};

/**
 * 
 * @desc    Get a single Post by it's title-slug
 * @route  GET /api/posts/:slug
 * @access  Public 
 */

export async function getPostBySlug(req, res){
    try{
        const post = await Post.findOne({slug: req.params.slug});
        if(post){
            res.status(200).json(post);
        }else{
            res.status(404).json({msg: "Post not found"});
        }
    }catch(error){
        res.status(400).json({msg: 'Error fetching Post', error: error.message});
    }
};

/**
 * @desc    Update a Post 
 * @route   PATCH /api/posts/:id
 * @access  Public
 */

export async function updatePost(req, res){
    try{
        const updatedPost = await Post.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if(updatedPost){
            res.status(200).json(updatedPost);
        }else{
            res.status(404).json({msg: 'Post not found'});
        }
    }catch(error){
        res.status(400).json({msg: 'Error updating Post', error: error.message});
    }
};


/**
 * @desc    Delete a Post
 * @route   DELETE /api/posts/id
 * @access  Public
 */

export async function deletePost(req, res){
    try{
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if(deletedPost){
            res.status(200).json({msg: 'Post deleted Successfully'});
        }else{
            res.status(404).json({msg: 'Post not found'});
        }
    }catch(error){
        if(error.name === 'CastError'){
            return res.status(400).json({msg: `Invaild id format ${req.params.id}`});
        }
        res.status(400).json({msg: 'Error deleting post', error: error.message});

    }
};

