import axios from 'axios';
import React from 'react'
import {useState} from 'react'
import { useNavigate } from "react-router-dom";


export default function AddNote() {
    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const navigate = useNavigate();
    
    const handleTitle = (e)=>{
        setTitle(e.target.value);
    }
    const handleBody = (e)=>{
        setBody(e.target.value) ;
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const note = {
            title :title,
            body:body
        }
    axios.post("http://localhost:3200/note/add",note)
      .then(()=> navigate("/"))
      .catch((err)=>console.log(err)) 
    }
    return (
        <div className="container">
                <div className="row my-4">
                    <div className="col-md-6 mx-auto">
                        <div className="card bg-light">
                            <div className="card-header">Ajouter une note</div>
                            <div className="card-body">
                                <form method="post" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="">Titre</label>
                                        <input
                                            onChange={handleTitle}
                                            value={title}
                                            type="text"
                                            name="title" id=""
                                            required className="form-control" placeholder="Titre" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Description*</label>
                                        <textarea
                                            onChange={handleBody}
                                            value={body}
                                            className="form-control" required name="body" id="" rows="3" placeholder="Description"></textarea>
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
