import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { saveAs } from 'file-saver';

// here I need Redux because Search bar is out of all component Need.
// so if not Reduc I will create a simple 'search Form' inside needed component.
export default function Menu() {
  // ce state doit etre global et accessible pour 
  // const [search,setSearch] = useState('');
  const [publicNotif,setPublicNotif] = useState([]);
  const [privateNotif,setPrivateNotif] = useState([]);
  const [countPublicNotif,setCountPublicNotif] = useState();
  const [countPrivateNotif,setCountPrivateNotif] = useState('');
  
  // const handleSearch = (e)=>{
  //   setSearch(e.target.value);
  //   console.log(search);
  // }
  
  useEffect(() => {
    axios.get('http://localhost:3200/note/publicnotification')
        .then(res => {
          //console.log(res.data.publicNotif)
          setPublicNotif(res.data.publicNotif)
        })
        // attention ici j'ai fait (res.data.notes) !! Top 
        .catch(err => console.log(err));
    axios.get('http://localhost:3200/note/privatenotification')
    .then(res => {
      //console.log(res.data.privateNotif)
      setPrivateNotif(res.data.privateNotif)
    })
    // attention ici j'ai fait (res.data.notes) !! Top 
    .catch(err => console.log(err));
  }, [])

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
  const exportTableDowloadPdf = ()=>{
    // axios.get('http://localhost:3200/note/dowloadpdf', { responseType: 'blob' })
    //   .then((res) => {
    //     const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
    //     saveAs(pdfBlob, 'mypdf.pdf');
    //   })
    const bodyObj = {
      users : [
      {
        name: "hell",
        age: "26",
      },
      {
        name: "kok",
        age: "26",
      },
      {
        name: "Vitthal",
        age: "26",
      },
    ]};
    axios.post("http://localhost:3200/note/generatepdfromhtmlbodydata",bodyObj)
     .then((res)=>console.log(res))
     .catch((err)=>console.log(err))
  }
  
  const DowloadPdfBodyData = ()=>{
    axios.get('http://localhost:3200/note/dowloadpdf', { responseType: 'blob' })
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, 'newFile.pdf');
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
      <li className="nav-item">
        <button className="nav-link active" onClick={exportTableDowloadPdf} >Send Data && generatePDF to Dowload as PDF </button>
      </li>
      <li className="nav-item">
        <button className="nav-link active" onClick={DowloadPdfBodyData} >Send Body Data && generatePDF to Dowload as PDF </button>
      </li>
      <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            public notif <span>{publicNotif.length}</span>
          </a>
          <ul class="dropdown-menu">
          {
              publicNotif && publicNotif.map((notif,index)=>{
                 return (
                 <>
                  <li>
                    <a class="dropdown-item" href="#">
                     <h6>{notif.title}</h6>
                     <p>{notif.content}</p>
                    </a>
                    </li>
                 </>
                 )
              })
            }
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Private notif <span>{privateNotif.length}</span>
          </a>
          <ul class="dropdown-menu">
          {
              privateNotif && privateNotif.map((notif,index)=>{
                 return (
                 <>
                  <li>
                    <a class="dropdown-item" href="#">
                     <h6>{notif.title}</h6>
                     <p>{notif.content}</p>
                    </a>
                    </li>
                 </>
                 )
              })
            }
          </ul>
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
