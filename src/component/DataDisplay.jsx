import loader from "../assets/images/loading.gif"
const DataDisplay = (props) => {
    console.log(props);
    return(
    <>
         <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>title</th>
                        <th>description</th>
                        <th>price</th>
                        <th>discountPercentage</th>
                        <th>rating</th>
                        <th>stock</th>
                        <th>brand</th>
                        <th>category</th>
                        <th>thumbnail</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {props.loading ?
                            <img src={loader} width={100} />
                        : (props.data && props.data?.products?.length > 0 ?
                            props.data?.products?.map((p, index) => (
                                <tr key={`index1${index}`}>
                                    <td>{p?.id}</td>
                                    <td>{p?.title}</td>
                                    <td>{p?.description}</td>
                                    <td>{p?.price}</td>
                                    <td>{p?.discountPercentage}</td>
                                    <td>{p?.rating}</td>
                                    <td>{p?.stock}</td>
                                    <td>{p?.brand}</td>
                                    <td>{p?.category}</td>
                                    <td><img src={p?.thumbnail} width={100}/></td>
                                    <td>
                                        <button onClick={() => props.handleEdit(p?.id)}>Edit</button>
                                        <button onClick={() => props.handleDelete(p?.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                            : (<tr>
                                <td colSpan={12}>No Data Found</td>
                            </tr>)
                        )

                    }
                </tbody>
            </table>

    </>
    )
}

export default DataDisplay