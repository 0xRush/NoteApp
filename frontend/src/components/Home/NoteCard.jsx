import React from 'react'
import NoteSingleCard from './NoteSingleCard'

const NoteCard = ({notes}) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {notes.map((item) => (
        <NoteSingleCard key={item._id} note={item} />
      ))}
    </div>
  )
}

export default NoteCard