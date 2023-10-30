const express = require("express");
const { postModal } = require("../modal/postModal");
const { auth } = require("../middlewear/auth");

const postRouter = express.Router();

postRouter.use(auth);

postRouter.post("/add",async (req, res) => {
    const payload = req.body;
    try {
        const post = new postModal(payload)
        await post.save()
        res.status(200).json({ msg: "New post is added" });

    } catch (error) {
         res.status(400).json({ error: "error" }); 
    }
})


postRouter.get("/",async (req, res) => {
    try {
        const { device } = req.query;
        const query = {}
        if (device) {
            query = { device: { $regex: device, $option: "i" } };

        }

        const post = await postModal.find({ name: req.body.name }, query)
        res.status(200).json(post);;
    } catch (error) {
        res.status(400).json({error:error});;
    }
})


postRouter.patch("/update/:id", async (req, res) => {

    const id = req.params.id;
    const updatePost = req.body;
    const name = req.body.name;
    try {
        const updatePost = await postModal.findByIdAndUpdate({ _id: id, name }, updatePost, { new: true });
        if (!updatePost) {
            res.status(404).json({msg:"Post not Found"})
        }
        res.status(200).json({msg:'post updated sucessfully!'})
    } catch (error) {
        res.status(400).json({error:"error"})
    }
})

postRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;

    try {
        const deleted = await postModal.findByIdAndDelete({ _id: id, name });
        if (!deleted) {
            res.status(404).json({msg:"Post not deleted"})
        }
        res.status(200).json({msg:'post deleted sucessfully!'})
    } catch (error) {
        res.status(400).json({error:"error"})
    }
})

module.exports = {
    postRouter
}