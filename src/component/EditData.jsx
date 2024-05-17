import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"


const EditData = () => {
    const navigate = useNavigate()
    const {dataId} = useParams()
    const initialValue = {
        title: '',
        body: '',
        reactions: '',
        userId: '',
        tags: '',
    }
      const [formData, setFormData] = useState(initialValue)
      const [errorFormData, seterrorFormData] = useState({
        title: '',
        body: '',
        reactions: '',
        userId: '',
        tags: '',
    })
    useEffect(() => {
        if (dataId) {
            getData(dataId)
        }
    }, [dataId])

    const getData = async (id) => {
        let res = await fetch(`https://dummyjson.com/posts/${id}`)
        let data = await res.json()
        if (data) {
            setFormData({...data})
        }
    }

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name] : e.target.value,
        })
      }
    
      const handleSubmit = async (e) => {
          e.preventDefault()
        try{
            let newError = errorFormData
          let isSuccess = true
          if (!formData.title) {
              newError.title = "please enter value"
               isSuccess = false
          } else {
            newError.title = ""
             isSuccess = true
          }
    
          if (!formData.body) {
            newError.body = "please enter value"
             isSuccess = false
    
          } else {
            newError.body = ""
            isSuccess = true
          }
    
          if (!formData.reactions) {
            newError.reactions = "please enter value"
             isSuccess = false
    
          } else {
            newError.reactions = ""
             isSuccess = true
          }
    
          if (!formData.userId) {
            newError.userId = "please enter value"
             isSuccess = false
    
          } else {
            newError.userId = ""
             isSuccess = true
          }
    
          if (!formData.tags) {
            newError.tags = "please enter value"
             isSuccess = false
    
          } else {
            newError.tags = ""
             isSuccess = true
          }
    
          seterrorFormData({...newError})
          formData.tags = Array.isArray(formData.tags) ? formData.tags : formData.tags.split(",")
    
    
          if (isSuccess) {
            // let newPost = post
    
              if (formData?.id) {
                  // update
                  let response = await fetch(`https://dummyjson.com/posts/${formData?.id}`,{
                        method : 'put',
                        headers: { 'Content-Type' : 'application/json' },
                        body : JSON.stringify(formData)
                    })
                    let data = await response.json()
                    if (data) {
                        alert('data updated')
                        // let idx = newPost?.posts?.findIndex((p) => p.id == formData.id)
                        // newPost.posts[idx] = formData
                    }
              }else{
                //add
                  let response = await axios.post('https://dummyjson.com/posts/add',formData,{ 'Content-Type' : 'application/json' })
                //   let data = await response.json()
                  console.log(response);
                if (response?.status == 200) {
                    // formData.id = newPost.posts.length + 1
                    // newPost.posts.push(formData)
                    alert('data added  sucsess')
                }
                else{
                    alert("error")
                }
              }
            
            //   setPost({...newPost})
              setFormData({...initialValue})
              Navigate("/")
          }

        }catch(error){
            console.log(error.message);
        }
          
      }


    return(
       
        <>
            <h1>{dataId ? `Edit` : `Add`}Data</h1>
            <form method="post" onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="title" 
                        onChange={handleChange} 
                        value={formData.title}
                    />
                    {errorFormData?.title && <p style={{color: 'red',margin:0,padding:0}}>{errorFormData?.title}</p>}
                    

                </div>
                <div>
                    <input
                        type="text"
                        name="body" 
                        onChange={handleChange} 
                        value={formData.body}
                    />
                    {errorFormData?.body && <p style={{color: 'red', margin:0, padding:0}}>{errorFormData?.body}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        name="reactions" 
                        onChange={handleChange} 
                        value={formData.reactions}
                    />
                    {errorFormData?.reactions && <p style={{color: 'red',margin:0,padding:0}}>{errorFormData?.reactions}</p>}

                </div>
                <div>
                    <input
                        type="text"
                        name="userId" 
                        onChange={handleChange} 
                        value={formData.userId}
                    />
                    {errorFormData?.userId && <p style={{color: 'red',margin:0,padding:0}}>{errorFormData?.userId}</p>}

                </div>
                <div>
                    <input
                        type="text"
                        name="tags"
                        onChange={handleChange}
                        value={formData.tags}
                    />
                    {errorFormData?.tags && <p style={{color: 'red',margin:0,padding:0}}>{errorFormData?.tags}</p>}

                </div>
                <div>
                    <button>Submit</button>
                </div>
                
            </form>
        </>
    )
}

export default EditData