import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { createProductThunk } from "../store/slices/prod.slice";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../store/slices/isLoading.slice";

const ProductDetail = () => {
        const { id } = useParams()
        const [detail, setDetail] = useState({})
        const [counter, setCounter] = useState(1)
        const dispatch = useDispatch()

        useEffect( () => {
            dispatch( setIsLoading(true))
            axios
                .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
                .then( resp => setDetail(resp.data))
                .catch(error => console.error(error))
                .finally(() => dispatch(setIsLoading(false)))
        }, [] )

        const addProduct = () => {
            const data = {
                quantity: counter,
                productId: id
            }

            dispatch(createProductThunk(data))
        }

        const counterIncrement = () => {
            setCounter(counter + 1)
        }

        const counterDecrement = () => {
            if (counter > 0) {          
            setCounter(counter - 1)
        }}

    return (
        <div className="detail-container">
            <div >
            <img className="image" src={detail.images?.[0]?.url} alt="img"/>
            </div>
            <div className="infoProduct">
            <h1>{detail.title}</h1>
            {/* <h2>{detail.category?.name}</h2>      */}
            <h2>{detail.brand}</h2>
            <p>{detail.description}</p>
            <div className="contador">
                <h2>${detail.price}</h2>
                <div className="buton"><Button onClick={() => counterDecrement()}>-</Button>
                {counter}
                <Button onClick={() => counterIncrement()}>+</Button>
                </div>
            </div>
            <Button 
            onClick={()=> addProduct()}
            className="añadir"><i className='bx bx-cart-download bx-tada' ></i> Añadir al carrito <i className='bx bx-cart-download bx-tada' ></i></Button>
            </div>
        </div>
    );
};

export default ProductDetail;