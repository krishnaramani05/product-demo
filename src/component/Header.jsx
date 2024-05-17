import { Link, useNavigate } from "react-router-dom"

const Header = () => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const handleClick = () => {
        const token = localStorage.getItem("token")
        if(token){
            localStorage.clear()
            navigate("/")
        }
        else{
            navigate("/login")
        }
    }
    return(
        <>
            <ul>
            <Link to={"/"}><li>Home</li></Link>
            <Link to={"/about-us"}><li>About</li></Link>
            </ul>
            <button 
                style={{float: "right"}}
                onClick={handleClick}
            >{token ? `Logout` : `Login`}</button>
        </>
    )
}


export default Header