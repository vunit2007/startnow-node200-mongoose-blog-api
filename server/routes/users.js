const express = require('express');
const router = express.Router();
const User = require('../db/models/User');

router.get('/', (req, res) => {
    User
        .find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => console.log(err))        
});
 
router.get('/:id', (req, res) => {
    User
    .findById(req.params.id)
    .then(users => {
        if (!users) {
        return res.status(404).send();
        } 
        return res.status(200).json(users);
        
    })
   .catch(err => console.log(err))
});


router.post('/', (req, res) => {
    console.log('body: ',req.body)
    User
    .create(req.body)
    .then(users => {
        res.status(201).json(users);
    })
   .catch(err => console.log(err))
});


router.put('/:id', (req, res) => {
    User
    .findByIdAndUpdate(req.params.id, req.body)
    .then(users => {
        res.status(204).json(users);
    })
   .catch(err => console.log(err))
});

//this should be correct but it's not
router.delete('/:id', (req, res) => {
    User
    .findByIdAndRemove(req.params.id)
    .then(users => {
        // console.log('delete:', users)
        res.status(200).send()
    })
    .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
    Blog
    .findByIdAndRemove(req.params.id)
    .then(blogs => {
        res.status(200).send();
    })
    .catch(err => console.log(err))
})


module.exports = router;