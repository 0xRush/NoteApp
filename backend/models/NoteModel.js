import mongoose from "mongoose"

const NoteSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        // author: {
        //     type: String,
        //     required: true,
        // },
        done: {
            type: Boolean
        }
    }
);
export const Note = mongoose.model('Note', NoteSchema);