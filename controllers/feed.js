exports.getPosts = (req,res,next) =>{
    res.status(200).json({
        posts: [{title: 'first post',content: 'this is the first post'}]
    });
}

exports.postPost = (req,res,next) => {
    const title = req.body.title;
    console.log(title);
    res.status(201).json({
        message: 'Post created successfully'
    });
}