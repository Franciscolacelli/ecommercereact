import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProdThunk, cartCheckoutThunk, deleteProductThunk } from '../store/slices/prod.slice';

const Carrito = ( { show, handleClose} ) => {

    const dispatch = useDispatch()

    const token = localStorage.getItem("token")
    
    useEffect(() => {
        if (token) {        
        dispatch(getProdThunk())
    }
    },[token])
    
    const producto = useSelector( state => state.prod)

    const deleteProduct = (id) => {
        dispatch(deleteProductThunk(id))
    }

    return (
        <Offcanvas show={show} onHide={handleClose} placement={"end"}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>Mi carrito</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='cardBody'>
                <ul>
            {
            producto.map( item => (
                    <li key={item.id} style={{display:"flex", alignItems:"center", justifyContent:"space-between",borderBottom:"1px solid gray", padding:"10px", margin:"10px"}}>
                        <div>
                        <h5>{item.product?.title}</h5>  
                        <img style={{width:80, objectFit:"contain"}} src={item.product?.images?.[0]?.url} alt="img"/>
                        </div> 
                        <Button
                        onClick={() => deleteProduct(item.id)}
                        style={{height: "50px"}}
                        ><i className='bx bx-trash' ></i></Button>               
                    </li>
            ))
            }
            </ul>
            <Button onClick={() => dispatch(cartCheckoutThunk())}><i className='bx bx-dollar bx-tada' ></i> Completar Compra <i className='bx bx-dollar bx-tada' ></i></Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default Carrito;