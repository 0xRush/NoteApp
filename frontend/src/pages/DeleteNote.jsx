import React, { useState } from 'react'
import Spinner from '../components/Spinner'
import axios from 'axios'
import BackButton from '../components/BackButton'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const DeleteNote = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const {enqueueSnackbar} = useSnackbar();

  const handleDelete = () => {
    setLoading(true);
    axios.delete(`http://localhost:5000/notes/${id}`)
    .then(() => {
      setLoading(false);
      enqueueSnackbar('note deleted successfully', {variant: 'success'});
      navigate('/')
    })
    .catch(err => {
      setLoading(false);
      console.log(err);
      enqueueSnackbar('Error', {variant: 'error'});
    })
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Note</h1>
      {loading && <Spinner />}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are You Sure You want to delete this Note?</h3>

        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDelete}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteNote