import axios from "axios";
import { useState, useEffect } from "react";
import getConfig from "../utils/getConfig";
import Card from 'react-bootstrap/Card';

const Purchases = () => {

    const [compras, setCompras] = useState([])

    useEffect(() => {
        axios
            .get("https://e-commerce-api-v2.academlo.tech/api/v1/purchases", getConfig())
            .then(resp => setCompras(resp.data))
            .catch(error => console.error(error))
    },[])

    return (
        <div>
            <h1 className="purchases">Purchases</h1>

            <ul>
            {
            compras.map( item => (
                    <li key={item.id} className="lista" style={{borderBottom:"1px solid gray", padding:"10px", margin:"10px",width: '95%', display: "flex", flexDirection : "row" }}>
                        <img style={{width:80, objectFit:"contain", marginRight:"15px"}} src={item.product?.images?.[0]?.url} alt="img"/>
                        <div>
                        <h5>{item.product?.title}</h5>  
                        <h6>$ {item.product?.price}</h6>
                        </div>                   
                    </li>
            ))
            }
            </ul>
            {/* <ul>
            {
                compras.map(item => {
<li>
                    <Card style={{ width: '100%', display: "flex", flexDirection : "row" }} key={ item.id }>
                        <Card.Img variant="left" src={item.product?.images?.[0]?.url} style={{width: 150}}/>
                        <Card.Body>
                            <Card.Title>{item.product?.title}</Card.Title>
                            <Card.Text>
                                {item.product?.description}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    </li>    })
            }</ul> */}
        </div>
    );
};

export default Purchases;