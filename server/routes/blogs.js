const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

router.get('/', (req, res) => {
    Blog
        .find()
        .then(blogs => {
            res.status(200).json(blogs);
        })
        .catch(err => console.log(err))        
});

router.get('/featured', (req, res) => {
    Blog
    .find() 
    .where('featured', true)
    .then(blogs => {
        res.status(200).json(blogs);
    })
   .catch(err => console.log(err))
});


router.get('/:id', (req, res) => {
    Blog
    .findById(req.params.id)
    .then(blogs => {
        if (!blogs) {
            return res.status(404).send();
          }
          return res.status(200).json(blogs);
    })
   .catch(err => {
        res.status(404).send();
   })
});


// POST / should save a new blog to the database when userId passed in body
//the save is complicated beacuse you're updating the user model and not the blog. find user id first. this will be a couple of steps. 
router.post('/', (req, res) => {

    let dbUser = null;

    //find the user in the database
    User
        .findById(req.body.authorId)
        .then(user => {
            dbUser = user;

            //create a new blog for the user
            let newBlog = new Blog(req.body);

            //set the blogs author to the users id
            newBlog.author = user._id;

            //save the blog and return it
            return newBlog.save();
        })
        .then(blog => {
            //with that blog that we saved, push it into the users blogs
            dbUser.blogs.push(blog)

            //save the user
            dbUser.save()
                .then(() => res.status(201).send(blog))
        })
//     Blog
//     .create(req.body)
//     .save()
//     .then(blogs => {
//         res.status(201).json(blogs);
//     })
//    .catch(err => console.log(err))
});



//5) PUT /:id should update a blog...why is this wrong
router.put('/:id', (req, res) => {
    Blog
    .findByIdAndUpdate(req.params.id, req.body)
    .then(blogs => {
        res.status(204).json(blogs);
    })
   .catch(err => console.log(err))
});


router.delete('/:id', (req, res) => {
    Blog
    .findByIdAndRemove(req.params.id)
    .then(blogs => {
        res.status(200).send();
    })
    .catch(err => console.log(err))
})



//post or put you will use req.body and console.log(req.body)
//id or /:id is req.params.id
//the save is complicated beacuse you're updating the user model and not the blog. find user id first. this will be a couple of steps. 

module.exports = router;