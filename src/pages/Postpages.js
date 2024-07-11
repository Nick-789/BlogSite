import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Postpages()
{
    const [postinfo,setpostinfo] =useState(null);
   
    const {id} = useParams();
    useEffect(()=> {
         fetch(`http://localhost:4000/upload/${id}`).then(response =>{
            response.json().then(postinfo =>{
               setpostinfo(postinfo);
            })
         })
    }, []);


    if (!postinfo) return '';

    return(
      
        <div className="post-page">
        <h1 className="h1title">{postinfo.title}</h1>
      
        <div className="image">
          <img src={`http://localhost:4000/blog-app/${postinfo.filepath}`}></img>
        </div>
        <div className="content" dangerouslySetInnerHTML={{__html:postinfo.content}} />
      </div>
    )

}

