import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { saveAs } from 'file-saver';

// here I need Redux because Search bar is out of all component Need.
// so if not Reduc I will create a simple 'search Form' inside needed component.
export default function Menu() {
  // ce state doit etre global et accessible pour 
  // const [search,setSearch] = useState('');

  // const handleSearch = (e)=>{
  //   setSearch(e.target.value);
  //   console.log(search);
  // }

  // const handleSubmit = (e)=>{
  //   e.preventDefault();
  //   alert(search);
  //   searchNote(search);
  // }

  const dowloadExcel = ()=>{
    /*axios.get('http://localhost:3200/note/dowloadexcel')
             .then(res => console.log(res.data))
             .catch(err => console.log(err));
    */
   // the code above dosn't dowload a file even we put sendFile() in server but !
   // but in front we need to tell that we gonna receive a responseType +
   // Then save this Blob Type as File with type pdf that we want 'file-saver'.

    axios.get('http://localhost:3200/note/dowloadexcel', { responseType: 'blob' })
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/excel' });
        saveAs(pdfBlob, 'newFile.xlsx');
      })
  }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link className="navbar-brand" to="/">LOGO </Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/">Notes  </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link active" to="/add">Add Note </Link>
      </li>
      <li className="nav-item">
        <button className="nav-link active" onClick={dowloadExcel} >Dowlaod Commands as EXCEl </button>
      </li>
    </ul>
    {/* 
    <form onSubmit={handleSubmit} className="form-inline my-2 my-lg-0">
    {search}
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSearch} />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit" >Search</button>
    </form> */}
  </div>
</nav>
        </div>
    )
}
