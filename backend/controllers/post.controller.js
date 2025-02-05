import  {prisma}  from "../lib/prisma.js";
const getPosts = async (req, res) => {
    const query=req.query;
    // console.log("query in query controller",query);
try {
    const posts = await prisma.post.findMany({
        where:{
            city:query.city || undefined,
            type:query.type || undefined,
            price:{
                gte:parseInt(query.minPrice) || 0,
                lte:parseInt(query.maxPrice) || 1000000000
            },
            bedrooms:parseInt(query.bedrooms) || undefined,
            propertyType:query.propertyType || undefined,

        }
    });
    // console.log(posts.length)
    res.status(200).json(posts);
    console.log("Get all posts");
} catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
}
}
const getPost = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await prisma.post.findUnique({
            where: { id },
            include: { 
                postDetail: true,
                // user: true //this one return whole details of user
                user: {
                    select: {
                        username: true,
                       avatar: true
                    }
                }
            }
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ post });
        console.log("Get a single post");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const addPost = async (req, res) => {
    const body=req.body;
    const tokenUserId=req.userId;
try {
    const post = await prisma.post.create({
        data: {
            ...body.postData,
            userId:tokenUserId,
            postDetail:{
               create:body.postDetail,
        }
    }
    });
    res.status(200).json({ post });
    console.log("Add a post");  
}
catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
}
}
const updatePost = async (req, res) => {
try {
    console.log("Update a post");
} catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
}
}
const deletePost = async (req, res) => {
    const id=req.params.id;
    const tokenUserId=req.userId;
try {
    const post = await prisma.post.findUnique({
        where: { id }
    });
    if(post.userId!==tokenUserId){
        return res.status(403).json({message:"You are not allowed to delete other user's post"})
    }
    await prisma.post.delete({
        where: { id }
    });
    res.status(200).json({ message: "Post deleted" });
    console.log("Delete a post");
} catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
}
}
export { getPosts, getPost, addPost, updatePost, deletePost };