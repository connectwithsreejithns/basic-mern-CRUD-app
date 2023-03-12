const Note = require('../models/note')

const fetchNotes=async (req, res) => {
    //Find Notes
    const notes = await Note.find()
    //respond with them
    res.json({notes })
}

const fetchNote =async (req, res) => {
    //get id
    const noteId = req.params.id
    //Find Notes
    const note = await Note.findById(noteId)
    //respond with them
    res.json({ note })
}


const createNote=async (req, res) => {
    //get the sent in data off request body
    const{title,body}=req.body
    // const title = req.body.title
    // const body = req.body.body

    //create a note with it
    const note = await Note.create({
        // title: title,
        // body: body,
        title,body
    });

    //respond with the new note 
    res.json({ note })
}

const updateNote=async (req, res) => {
    //get id
    const noteId = req.params.id
    //get the data off the reqbody
    const title = req.body.title
    const body = req.body.body
    //Find Notes and update record
    await Note.findByIdAndUpdate(noteId, {
        title: title,
        body: body
    })
    //Find Updated Note
    const note = await Note.findById(noteId)
    //respond with them
    res.json({ note })
}

 const deleteNote =async (req, res) => {
    //get id
    const noteId = req.params.id

    //Find Notes and update record

    await Note.deleteOne({ id: noteId })



    //respond with them
    res.json({ success: 'record deleted' })
}

module.exports={
    // fetchNotes:fetchNotes,
    // fetchNote:fetchNote,
    // createNote:createNote,
    // updateNote:updateNote,
    // deleteNote:deleteNote,
    fetchNotes,
    fetchNote,
    createNote,
    updateNote,
    deleteNote,
}