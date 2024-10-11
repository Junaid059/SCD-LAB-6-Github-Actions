import express from "express";
import { v4 as uuidv4 } from 'uuid';

const app = express()

const Port = 3000;

let posts = [
  {
    id: uuidv4(),
    title: "Animal Planet",
    content: "view live at national geografic",
    comments: [
      { id: uuidv4(), text: "Great post!" },
      { id: uuidv4(), text: "Very informative!" },
      { id: uuidv4(), text: "Loved the details!" },
    ],
  },
];

app.use(express.json())
app.post("/createPost",async (req,res)=>{
try{

  const {title,content}=req.body

  if(!title || !content){
    res.status(400).send("Title and content is required")
  }


  const newPost = {
    id: uuidv4(),
    title,
    content,
    comments: [],
  };


  posts.push(newPost);
  res.status(201).json(newPost)
}catch(error){
  console.log("Error",error)
}
})

app.get("/allPosts",async (req,res)=>{
  try{  
    res.json(posts)
    }catch(error){
      console.log("Error",error)
      }

})

app.put("/updatePost/:id",async (req,res)=>{
  const id = req.params;
  const {title,content} = req.body

  const post = post.find((p)=>p.id == id)

  if(!post){
    res.status(404).send("Post not found")
  }

  if(post){
    post.title = title
    post.content = content

  }

  res.status(200).json(post,"post updated successfully")

})

app.delete("/deletePost/:id",async(req,res)=>{
  try{
    const id = req.params;

    const index = posts.find((p)=>p.id == id)
    if(index == -1){
     res.status(400).send("post not found")
    }

  const deletePost  = posts.splice(index,1)

res.status(200).json(deletePost," deleted post")


  }catch(error){
    console.log("error ",error)
  }

})

app.post("/post/comment/:id",async (req,res)=>{
  const postId = req.params;

  if (!posts[postId]) return res.status(404).json({ error: "Post not found" });

    const id = Date.now();
    const { text } = req.body;
    comments[id] = { id, text };
    posts[postId].comments.push(id);
    res.status(201).json(comments[id]);
  

})

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;

  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).send("Post not found.");
  }

  res.status(200).json(post.comments);
});

app.delete("post/comment/:id", (req,res)=>{
  const {postid,commentid} = req.params.id;
  
  const post = posts.find((p)=>p.id==postid)

  if(!post){
    return res.status(404).send("post not found")
  }

  const commentindex = posts.comments.findIndex((c)=>c.id==commentid)

  if(!commentindex){
    res.status(400).json("comment not found")
  }

 const deletedComment =  posts.comments.splice(commentid,1)

res.status(200).json(deletedComment, "comment deleted successfully")

})

app.listen(Port,()=>{
  console.log(`App is listening on Port ${Port}`)
})
