import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
        const { id } = useParams()
        const [detail, setDetail] = useState({})

        useEffect( () => {
            axios
                .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
                .then( resp => setDetail(resp.data))
                .catch(error => console.error(error))

        }, [] )

    return (
        <div className="detail-container">
            <h1>{detail.title}</h1>
            <h2>{detail.category?.name}</h2>
            
            <img src={detail.images[0]?.url} alt="img" />
            
            <h2>{detail.brand} - {detail.price}</h2>
            <p>{detail.description}</p>
        </div>
    );
};

export default ProductDetail;