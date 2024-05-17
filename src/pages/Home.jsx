// import Header from "../component/Header"
// import Footer from "../component/Footer"
// import FunComponent from "./FunComponent"
import { decrement, increment , addValueAsync, addValue} from "../store/slice/counterSlice"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"

function Home() {
    const [numberVal, setNumberVal] = useState(2)
    const count = useSelector((state) => state.counter.value)
    const disable = useSelector((state) => state.counter.disable)
    const dispatch = useDispatch()
    return(
        <div>
            <button onClick={() => dispatch(decrement())} disabled={disable}>-</button>
            {count}
            <button onClick={() => dispatch(increment())} disabled={disable}>+</button>
            <input 
                type="number" 
                name="value" 
                value={numberVal} 
                onChange={(e) => setNumberVal(e.target.value)} 
                disabled={disable}
            />
            <button onClick={() => {
                    let nVal = Number(numberVal)
                    dispatch(addValue(nVal))
                }}
                disabled={disable}
            >Submit</button>
            <button
                onClick={() => {
                    let nVal = Number(numberVal)
                    dispatch(addValueAsync(nVal))
                }}
                disabled={disable}
            >Submit Async</button>
            {/* <Header/>
            <div>
                <h1>Product</h1>
                <FunComponent/>
            </div>
            <Footer/> */}
        </div>
    )
}

export default Home