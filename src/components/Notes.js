import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom' 

export default function Notes() {
    const [notes,setNotes]=useState([]);
    // state de champ de Search
    const [searchword,setSearchword] = useState('');
    const [searchNotes,setSearchNotes] = useState([]);
    const displayNotes = searchNotes.length > 0 ? searchNotes :notes;  

    // handleSearch 
    const handleSearch = (e)=>{
        setSearchword(e.target.value);
        searchNote(searchword);
     }

    const handleSubmit = (event)=>{
        event.preventDefault();
        //searchNotes.push(searchword);
        //searchNote(searchword);
    }

    useEffect(() => {
        axios.get('http://localhost:3200/notes')
            .then(res => setNotes(res.data.products))
            // attention ici j'ai fait (res.data.notes) !! Top 
            .catch(err => console.log(err));
    }, [])
    
    const deleteNote = id => {
        axios.delete('http://localhost:3200/delete/' + id)
            .then(res => {setNotes(notes.filter((note)=>note.id !== id))}) // noter cela filter top noté 
            .catch(err => console.log(err));
    }
    
    const searchNote = (word) => {
        //console.log('from service '+ word)
        const bodyObj = {word:word};
        axios.post('http://localhost:3200/note/search/',bodyObj)
        .then(res=> setSearchNotes(res.data))
        .catch(err=>console.log(err));
    }

    const paginate = (page)=>{
        alert(`hello ${page}`)
    }
   
    return (
        <div className="fluid">
          <form onSubmit={handleSubmit} className="form-inline my-2 my-lg-0">
           {searchword}
           <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSearch} />
           <button className="btn btn-outline-success my-2 my-sm-0" type="submit" >Search</button>
          </form>
                <div className="row">
                    <div class="col-md-2">
                    <h6>Filter By Category</h6>
                    <ul class="list-group">
                        <li class="list-group-item">An item</li>
                        <li class="list-group-item">A second item</li>
                        <li class="list-group-item">A third item</li>
                    </ul>
                    <h6>Filter By Price price </h6>
                    <ul class="list-group">
                        <li class="list-group-item">An item</li>
                        <li class="list-group-item">A second item</li>
                        <li class="list-group-item">A third item</li>
                    </ul>
                    <h6>Filter By Date inpire by Bright UI</h6>
                    <ul class="list-group">
                     <li class="list-group-item">Latest</li>
                     <li class="list-group-item">Oldest</li>
                     <li class="list-group-item">Specific date :<input type="text" /></li>
                    </ul>
                    <h6>Filter By Made Pays checkobox</h6>
                    <ul class="list-group">
                        <li class="list-group-item"><input type="checkbox" name="" id="" />China</li>
                        <li class="list-group-item"><input type="checkbox" name="" id="" />germany</li>
                        <li class="list-group-item"><input type="checkbox" name="" id="" />maroc</li>
                    </ul>
                    <h6>Filter By paymentType radio</h6>
                    <ul class="list-group">
                        <li class="list-group-item"><input type="radio" name="" id="" />Virement</li>
                        <li class="list-group-item"><input type="radio" name="" id="" />Cash</li>
                    </ul>
                    </div>
                    <div className="col-md-10 my-4 mx-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>TITLE</th>
                                    <th>DESCRIPTION</th>
                                    <th>PAYMENT TYPE</th>
                                    <th>DATE ORDER</th>
                                    <th>MADE PAYS</th>
                                    <th>GUESS PRICE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    displayNotes.map(note => (
                                        <tr key={note.id}>
                                            <td>{note.title}</td>
                                            <td>{note.body}</td>
                                            <td>{note.paymentType}</td>
                                            <td>{note.date_order}</td>
                                            <td>{note.made_pays}</td>
                                            <td>{note.guess_price}</td>
                                            <td>
                                                 <button
                                                    onClick={() => deleteNote(note.id)}
                                                    className="btn btn-sm btn-danger text-white my-1">Supprimer
                                                 </button>
                                                 <Link
                                                    to={`/edit/${note.id}`}
                                                    className="btn btn-sm btn-warning mr-1 text-white"
                                                >Modifier
                                            </Link>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    <div style={{display:'flex',flexDirection:'row'}}>
                    { notes && notes.map((item,index)=>{
                            return(
                            <>
                            <div style={{ color:"white",cursor:"pointer", width:"25px",border:"1px",padding:"5px",backgroundColor:"grey",margin:"4px"}}
                                onClick={()=> paginate(index)} 
                            >
                                {index+1}
                            </div>
                            </>
                            )
                        })
                    }
                    </div>
                    </div>
                </div>
            </div>
    )
}
