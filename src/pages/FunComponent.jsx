import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import DataDisplay from "../component/DataDisplay"
import FunCss from '../assets/images/loading.gif'
import '../assets/css/FunComponent.module.css'
// import styled from 'styled-components`';
import{css} from '@emotion/react'
// const Button = styled.button`background-color: red; color:white`
const pStyle = css`color: red; font-size:12px`

function FunComponent(props){
    const navigate = useNavigate()
    // console.log(props,"===props");
    useEffect((props)=>{
        getData()
    },[])
 
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [post,setPost] = useState()
    const [formData, setFormData] = useState({
        id: '',
        title: "",
        description: "",
        price: '',
        discountPercentage: '',
        rating: '',
        stock: '',
        brand: "",
        category: "",
        thumbnail: ""
      })
      console.log(props.test,"===props");
    //   const [post,setPost] = useState(props.test)
      const [errorformData, setErrorFormData] = useState({
        id: '',
        title: "",
        description: "",
        price: '',
        discountPercentage: '',
        rating: '',
        stock: '',
        brand: "",
        category: "",
        thumbnail: ""
      })

    const getData = async () => {
        try{
            setLoading(true)
            let response = await fetch('https://dummyjson.com/products')
            let data = await response.json()
            // console.log(data);
            setProducts(data)
            setLoading(false)
        }catch(error){
            console.log(error.message);
        }
    }

    const handleDelete = async (id) => {
        try{
            let response = await fetch(`https://dummyjson.com/products/${id}`, {
                method: 'delete'
            })
            let data = await response.json()
            // console.log(data);
            const newProducts = products
            if(data){
                let idx = newProducts.products.findIndex((u)=> u.id === id)
                if(idx > -1){
                    newProducts.products.splice(idx, 1)
                }
            }
            setProducts({...newProducts})
        }catch(error){
            console.log(error.message);
        }
    }

    const handleEdit = async (id) => {
        console.log(id);
        navigate(`/post/${id}`)
        // try{
        //     let response = await fetch(`https://dummyjson.com/products/${id}`)
        //     let data = await response.json()
        //     if(data){
        //         setFormData(data)
        //     }
        // }catch(error){
        //     console.log(error.message);
        // }
    }

    const handleChange = (e) => {
        try{
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            })
        }catch(error){
            console.log(error.message);
        }
    }

    const handleSubmit = async (e) => {
        try{
            e.preventDefault()
            let newErrorFormData = errorformData
            let isSucces = true
            if (!formData.title) {
                newErrorFormData.title = "Please enter title"
                isSucces = false
            } else {
                newErrorFormData.title = ""
                isSucces = true
            }
            if (!formData.description) {
                newErrorFormData.description = "Please enter description"
                isSucces = false
            } else {
                newErrorFormData.description = ""
                isSucces = true
            }
            if (!formData.price) {
                newErrorFormData.price = "Please enter price"
                isSucces = false
            } else {
                newErrorFormData.price = ""
                isSucces = true
            }
            if (!formData.discountPercentage) {
                newErrorFormData.discountPercentage = "Please enter discountPercentage"
                isSucces = false
            } else {
                newErrorFormData.discountPercentage = ""
                isSucces = true
            }
            if (!formData.rating) {
                newErrorFormData.rating = "Please enter rating"
                isSucces = false
            } else {
                newErrorFormData.rating = ""
                isSucces = true
            }
            if (!formData.stock) {
                newErrorFormData.stock = "Please enter stock"
                isSucces = false
            } else {
                newErrorFormData.stock = ""
                isSucces = true
            }
            if (!formData.brand) {
                newErrorFormData.brand = "Please enter brand"
                isSucces = false
            } else {
                newErrorFormData.brand = ""
                isSucces = true
            }
            if (!formData.category) {
                newErrorFormData.category = "Please enter category"
                isSucces = false
            } else {
                newErrorFormData.category = ""
                isSucces = true
            }
            if (!formData.thumbnail) {
                newErrorFormData.thumbnail = "Please enter thumbnail"
                isSucces = false
            } else {
                newErrorFormData.thumbnail = ""
                isSucces = true
            }

            setErrorFormData({...newErrorFormData})
            let newProducts = products
            if(formData.id){
                let response = await fetch(`https://dummyjson.com/products/${formData?.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                })
                let data = await response.json()
                // console.log(data);
                if (data) {
                    let idx = newProducts?.products?.findIndex((p) => p.id == formData.id)
                    newProducts.products[idx] = formData
                }
            }else{
                if(isSucces){
                    let response = await fetch('https://dummyjson.com/products/add', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    })
                    let data = await response.json()
                    console.log(data);
                    formData.id = newProducts.products.length + 1
                    newProducts.products.push(formData)
                }
            }
            setProducts({...newProducts})
        }catch(error){
            console.log(error.message);
        }
    }

    return(
        <div>
            <button
                onClick={() => {
                    navigate("/post")
                }}
            >Add Post</button>
            
            <DataDisplay 
                loading={loading} 
                data={products}  
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </div>
    )
}

export default FunComponent
