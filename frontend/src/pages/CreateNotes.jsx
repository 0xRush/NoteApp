import React from 'react'
import { useState } from 'react'
import Spinner from '../components/Spinner'
import axios from 'axios'
import BackButton from '../components/BackButton'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const CreateNotes = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar();

  const handleSaveNote = () => {
    const data = {
      text,
      done: false
    };
    setLoading(true);
    axios.post('http://localhost:5000/notes', data)
    .then(() => {
      setLoading(false);
      enqueueSnackbar('note created successfully', {variant: 'success'});
      navigate('/');
    })
    .catch(err => {
      setLoading(false);
      enqueueSnackbar('an error occured', {variant: 'error'});
      console.log(ErrorEvent);
    });
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Note</h1>
      {loading && <Spinner />}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
      <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Text</label>
          <input
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
      </div>
      <button className='p-2 bg-sky-300 m-8' onClick={handleSaveNote}>
          Save
      </button>
      </div>
    </div>
  )
}

export default CreateNotes