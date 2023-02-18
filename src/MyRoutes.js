import React from 'react';
import {Routes,Route} from 'react-router-dom';
import AddNote from './components/AddNote.js';
import Notes from './components/Notes.js';
import EditNote from './components/EditNote.js';
function MyRoutes() {
    return (
        <div>
              <Routes>
                <Route path="/" exact element={<Notes/>} />
                <Route path="/add" exact element={<AddNote/>}/>
                <Route path="/edit/:id" exact element={<EditNote/>} />
              </Routes>
        </div>
    )
}
export default MyRoutes ;
