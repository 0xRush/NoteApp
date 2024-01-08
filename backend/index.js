import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import NoteRoute from './routes/NoteRoutes.js'
import cors from "cors";

const app = express();

// middleware to parse json body
app.use(express.json());

// middleware to handle cors policy
// opt 1: allow all origins with default of cors(*)
app.use(cors());
// opt 2: allow custom origins
// app.use({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'], 
// })

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('hello world')
});

app.use('/notes', NoteRoute)

// if your app is simple do this, but if you have larger app and each module need routes .. create route folder and refactor your code  

// making a note
// app.post('/notes', async (req, res) => {
//     try {
//         if (!req.body.text) return res.status(400).send({message: 'send the text!'});

//         const newNote = {
//             text: req.body.text,
//             done: false
//         };

//         const note = await Note.create(newNote);
//         return res.status(201).send(note)
//     }
//     catch (err) {
//         console.log(err.message);
//         res.status(500).send({ message: err.message });
//     }
// });

// // getting all notes
// app.get('/notes', async (req, res) => {
//     try {
//         const notes = await Note.find({});

//         return res.status(200).json({
//             count: notes.length,
//             data: notes
//         });
//     }
//     catch (err) {
//         console.log(err.message);
//         res.status(500).send({ message: err.message });
//     }
// });

// // getting one note details
// app.get('/notes/:id', async (req, res) => {
//     try {
//         const { id } = req.params;

//         const note = await Note.findById(id);

//         return res.status(200).json(note);
//     }
//     catch (err) {
//         console.log(err.message);
//         res.status(500).send({ message: err.message });
//     }
// });

// // update note
// app.put('/notes/:id', async (req, res) => {
//     try {
//         if(!req.body.text) return res.status(400).send({message: 'somthing is messing!'});

//         const { id } = req.params;

//         const newNote = {
//             ...req.body,
//             done: false
//         } 

//         const result = await Note.findByIdAndUpdate(id, newNote);

//         if (!result) return res.status(404).send({message: 'note not found!' }); 

//         return res.status(200).send({message: 'note updated successfully!'}); 
//     }
//     catch (err) {
//         console.log(err);
//         res.status(500).send({message: err.message });
//     }
// });

// // delete a note
// app.delete('/notes/:id', async (req, res) => {
//     try {
//         const { id } = req.params;

//         const result = await Note.findByIdAndDelete(id);

//         if (!result) return res.status(404).send({message: 'note not found'});

//         return res.status(200).send({message: 'note deleted successfully'});
//     }
//     catch (err) {
//         console.log(err);
//         return res.status(500).send({message: err.message});
//     }
// });

// it suppose to be here 
// app.listen(PORT, () => {
//     console.log(`app is listenning at port ${PORT}`);
// })

mongoose.connect(mongoDBURL)
.then(() => {
    console.log('app connected to the database');
    // but we putted here to run app only if connected to the DB
    app.listen(PORT, () => {
        console.log(`app is listenning at port ${PORT}`);
    });
})
.catch((err) => {
    console.log(err);
});