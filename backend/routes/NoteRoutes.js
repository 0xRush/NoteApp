import express from 'express';
import { Note } from '../models/NoteModel.js';

const router = express.Router();
// making a note
router.post('/', async (req, res) => {
    try {
        if (!req.body.text) return res.status(400).send({message: 'send the text!'});

        const newNote = {
            text: req.body.text,
            done: false
        };

        const note = await Note.create(newNote);
        return res.status(201).send(note)
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// getting all notes
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find({});

        return res.status(200).json({
            count: notes.length,
            data: notes
        });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// getting one note details
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const note = await Note.findById(id);

        return res.status(200).json(note);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// update note
router.put('/:id', async (req, res) => {
    try {
        if(!req.body.text) return res.status(400).send({message: 'somthing is messing!'});

        const { id } = req.params;

        const newNote = {
            ...req.body,
            done: req.body.hasOwnProperty('done') ? req.body.done : false,
        } 

        const result = await Note.findByIdAndUpdate(id, newNote);

        if (!result) return res.status(404).send({message: 'note not found!' }); 

        return res.status(200).send({message: 'note updated successfully!'}); 
    }
    catch (err) {
        console.log(err);
        res.status(500).send({message: err.message });
    }
});

// delete a note
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Note.findByIdAndDelete(id);

        if (!result) return res.status(404).send({message: 'note not found'});

        return res.status(200).send({message: 'note deleted successfully'});
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({message: err.message});
    }
});

export default router;