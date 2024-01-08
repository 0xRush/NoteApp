import React from 'react'
import BackButton from '../components/BackButton';
import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ShowNotes = () => {
  const [note, setNote] = useState({});
  const [loading, setLoading] = useState(false);
  const {id} = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/notes/${id}`)
    .then((res) => {
      setNote(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.log(err);
      setLoading(false);
    })
  }, [])
  
  return (
    <div className='p-4'>
      <BackButton />
    <h1 className='text-3xl my-4'>Show Note</h1>
    {loading ? (<Spinner />) :
      (<div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>id</span>
          <span>{note._id}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Text</span>
          <span>{note.text}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>done</span>
          <span>{new Boolean(note.done).toString()}</span>
        </div>
      </div> 
    )}
    </div>
  )
}

export default ShowNotes