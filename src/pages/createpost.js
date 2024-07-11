import React ,{ useState } from "react";
import "../styles/App.css";
import "../styles/createpost.css"
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";

const  modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
];

const Createpost=()=>{
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const[content,setContent] = useState('');
    const[files,setFiles]=useState('');
    
    const [ redirect,setRedirect] = useState(false);

   async function createnewpost(e){
        const data=new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('file',files[0]);
    
        e.preventDefault();
        
        const response = await fetch('http://localhost:4000/upload',{
            method:'POST',
            body:data,
            credentials:'include'
        });
      
       if(response.ok){
            setRedirect(true);
       }
    }

    if(redirect){
      return <Navigate to={'/'} />
    }
    return (
        <form action="/http://localhost:4000/upload" method="POST" encType="multipart/form-data" onSubmit={createnewpost} >
             <label className="label_tag" >Title:</label>
        <input type="text" value={title} onChange={e=>setTitle(e.target.value)} required></input>

        
        <label className="label_tag">Summary:</label>
        <input type="summary" value={summary} onChange={e=>setSummary(e.target.value)}required></input>
        
        <label className="label_tag">Image:</label>
        <input type="file"  accept="image/*" name="file" onChange={e=>setFiles(e.target.files)}required></input>

        
        
        <div className="text-editor"><ReactQuill value={content} onChange={newvalue=>setContent(newvalue)}modules={modules} formats={formats} /></div>
        
        <input type="submit" className="submit-button"></input>
        
        </form>
       
    );
}

 
export default Createpost;
