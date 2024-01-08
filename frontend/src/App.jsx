import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import CreateNotes from './pages/CreateNotes'
import EditNote from './pages/EditNote'
import DeleteNote from './pages/DeleteNote'
import ShowNotes from './pages/ShowNotes'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/notes/create' element={<CreateNotes />} />
      <Route path='/notes/details/:id' element={<ShowNotes />} />
      <Route path='/notes/edit/:id' element={<EditNote />} />
      <Route path='/notes/delete/:id' element={<DeleteNote />} />
    </Routes>
  )
}

export default App