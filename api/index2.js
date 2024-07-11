
const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const path = require("path");
const bcrypt = require('bcryptjs');
const Jwt = require("jsonwebtoken");
const cookieparser = require('cookie-parser');
const multer = require("multer");
const app = express();


app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'api/uploads/');
   },
   filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
   },
});
const uploadMiddleware = multer({ storage });




app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieparser());

const user = require("./models/User");
const Post = require("./models/Post");

app.use('/blog-app/api/uploads', express.static(path.join(__dirname, 'uploads')));


const salt = bcrypt.genSaltSync(10);
const secret = 'akjsheritydhfgendlpffwedpdfjnee';


mongoose.connect("mongodb+srv://nikhil-gupta:nikhilboss123@cluster0.oqlnzzv.mongodb.net/user");
app.post('/register', async (req, res) => {

   const { username, password } = req.body;
   try {
      const userdoc = await user.create({
         username,
         password: bcrypt.hashSync(password, salt),
      });

      res.json(userdoc);
   } catch (e) {
      res.status(400).json(e);
   }

});


app.post('/login', async (req, res) => {
   
   const { username, password } = req.body;
   const userdoc = await user.findOne({ username });
   const loginok = bcrypt.compareSync(password, userdoc.password);
   if (loginok) {
      Jwt.sign({ username, id: userdoc._id }, secret, {}, (err, token) => {
         if (err) throw err;
         res.cookie('token', token).json({
            id: userdoc._id,
            username,
         });

      });
   }
   else {
      res.status(400).json('wrong credentials');

   }


});

app.get('/profile', (req, res) => {
   const { token } = req.cookies;
   //console.log("hi");
   Jwt.verify(token, secret, {}, (err, info) => {
      if (err) throw err;
      res.json(info);

   });
});

app.post('/logout', (req, res) => {
   res.cookie('token', '').json('ok');
   return res.redirect('/');
});


app.post('/upload', uploadMiddleware.single("file"), async (req, res) => {
   const { token } = req.cookies;

   Jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;
      const { title, summary, content } = req.body;
      const filePath = req.file ? req.file.path.replace(/\\/g, '/') : '';
      
      try {
         const postdoc = await Post.create({
            title,
            summary,
            content,
            filepath: filePath,
            author: info.id,
         });
         res.json(postdoc);
      } catch (e) {
         res.status(400).json(e);
      }
   });
});



app.get('/upload', async (req, res) => {
   res.json(await Post.find().populate('author' ,[  'username']));
   
})

app.get('/upload/:id', async (req, res) => {
   const {id} = req.params;
   const postDoc = await Post.findById(id).populate('author', ['username']);
   res.json(postDoc);
 })


 app.delete('/upload/:id', async (req, res) => {
   const { token } = req.cookies;
   const { id } = req.params;

   Jwt.verify(token, secret, {}, async (err, info) => {
       if (err) {
           return res.status(401).json({ error: "Please authenticate using a valid token" });
       }

       try {
           const post = await Post.findById(id);
           if (!post) {
               return res.status(404).json({ error: "Post not found" });
           }

           // Check if the logged-in user is the author of the post
           if (post.author.toString() !== info.id) {
               return res.status(401).json({ error: "Not allowed" });
           }

           await Post.findByIdAndDelete(id);
           res.json({ success: "Post has been deleted", post }); // This sends a response

       } catch (error) {
           console.error(error.message);
           res.status(500).send("Internal Server Error"); // This also sends a response
       }
   });
});

app.put('/upload/:id', async (req, res) => {
   const { token } = req.cookies;
   const { id } = req.params;

   Jwt.verify(token, secret, {}, async (err, info) => {
       if (err) return res.status(401).json({ error: "Please authenticate using a valid token" });

       try {
           const post = await Post.findById(id);
           if (!post) {
               return res.status(404).json({ error: "Post not found" });
           }

           // Check if the logged-in user is the author of the post
           if (post.author.toString() !== info.id) {
               return res.status(401).json({ error: "Not allowed" });
           }

           // Update the post details
           post.title = req.body.title;
           post.summary = req.body.summary;
           post.content = req.body.content;
           await post.save();

           res.json(post);
       } catch (error) {
           console.error(error.message);
           res.status(500).send("Internal Server Error");
       }
   });
});

app.listen(4000, function () {
   console.log("server started");

});


