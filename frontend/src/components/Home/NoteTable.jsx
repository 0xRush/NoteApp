import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle} from 'react-icons/bs'
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md'

const NoteTable = ({notes}) => {
  return (
    <table className='w-full border-separate border-spacing-2'>
        <thead>
          <tr>
            <th className='border border-slate-600 rounded-md'>No</th>
            <th className='border border-slate-600 rounded-md'>Note</th>
            <th className='border border-slate-600 rounded-md'>isDone</th>
            <th className='border border-slate-600 rounded-md'>Operations</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note, idx) => (
            <tr key={note._id} className='h-8'>
              <td className='border border-slate-700 rounded-md text-center'>{idx + 1}</td>
              <td className='border border-slate-700 rounded-md text-center'>{note.text}</td>
              <td className='border border-slate-700 rounded-md text-center'>{new Boolean (note.done).toString()}</td>
              <td className='border border-slate-700 rounded-md text-center'>
                <div className='flex justify-center gap-x-4'>
                  <Link to={`/notes/details/${note._id}`}>
                    <BsInfoCircle className='text-2xl text-green-800'/>
                  </Link>
                  <Link to={`/notes/edit/${note._id}`}>
                    <AiOutlineEdit className='text-2xl text-yellow-600'/>
                  </Link>
                  <Link to={`/notes/delete/${note._id}`}>
                    <MdOutlineDelete className='text-2xl text-red-600'/>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  )
}

export default NoteTable