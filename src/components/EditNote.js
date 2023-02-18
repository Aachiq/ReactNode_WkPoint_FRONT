import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import { useParams,useNavigate } from "react-router-dom";

export default function EditNote() {
    let { id } = useParams();
    const navigate = useNavigate();

    const[note,setNote]=useState({
        title:'',
        body:''
    })

    useEffect(() => {
        axios.get('http://localhost:3200/getOne/'+id)
            .then(res => setNote(res.data.note))
            // attention ici j'ai fait (res.data.notes) !! Top 
            .catch(err => console.log(err));
    }, [])

    const handleTitle=(event)=>{
         setNote({...note,title:event.target.value});
    }
    const handleBody=(event)=>{
        setNote({...note,body:event.target.value});
    }
    const handleSubmit=(e)=>{
         e.preventDefault();
      // console.log(note.title + " " + note.body);
      const newNote = {
        title: note.title,
        body: note.body
    }
    axios.put(`http://localhost:3200/update/${id}`, newNote)
        .then(navigate('/'))
        .catch(err => console.log(err));
         
    }
    return (
        <div className="container">
                <div className="row my-4">
                    <div className="col-md-6 mx-auto">
                        <div className="card bg-light">
                            <div className="card-header">Modifier une note</div>
                            <div className="card-body">
                                <form method="post" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="">Titre </label>
                                        <input
                                            value={note.title}
                                            onChange={handleTitle}
                                            type="text"
                                            name="title"
                                            className="form-control" placeholder="Titre" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Description </label>
                                        <textarea
                                            className="form-control" 
                                            value={note.body}
                                            onChange={handleBody}
                                            name="body" id="" rows="3" placeholder="Description">
                                        </textarea>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-primary" type="submit">Valider</button>
                                    </div>
                                 </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}
