import React from 'react'
import { useState, useEffect } from 'react'
import Spinner from '../components/Spinner'
import axios from 'axios'
import BackButton from '../components/BackButton'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const EditNote = () => {
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/notes/${id}`)
    .then((res) => {
      setLoading(false);
      setText(res.data.text);
      setDone(res.data.done);
    })
    .catch(err => {
      setLoading(false);
      console.log(err)
    })
  }, [])

  const handleSaveNote = () => {
    const data = {
      text,
      done,
    };
    setLoading(true);
    axios.put(`http://localhost:5000/notes/${id}`, data)
    .then(() => {
      setLoading(false);
      enqueueSnackbar('note updated successfully', {variant: 'success'});
      navigate('/');
    })
    .catch(err => {
      setLoading(false);
      enqueueSnackbar('Error', {variant: 'error'});
      console.log(err);
    });
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Note</h1>
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
      <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>isDone</label>
          <input
            type='checkbox'
            checked= {done}
            onChange={(e) => setDone(e.target.checked)}
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

export default EditNote