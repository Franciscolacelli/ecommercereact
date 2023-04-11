import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProductsThunk, filterCateroriesThunk, filterProductThunk } from '../store/slices/products.slice';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {

        const products = useSelector( state => state.products )
        const dispatch = useDispatch()
        const [categories, setCategories] = useState( [] )
        const [input, setInput] = useState("")

        useEffect( () => {
            dispatch( getProductsThunk())

            axios
                .get("https://e-commerce-api-v2.academlo.tech/api/v1/categories")
                .then(resp => setCategories(resp.data))
                .catch(error => console.error(error))

        }, [])

    return (
        <div>
            <Container>
                <Row>
                    {
                        categories.map( category =>(
                            <Col key={category.id}>
                            <Button className='w-100' onClick={() => dispatch (filterCateroriesThunk(category.id))}>{category.name}</Button>
                        </Col>
                        ))
                    }
                   <Col>
                        <Button
                        onClick={() => dispatch(getProductsThunk())}
                        className='w-100'>Todos</Button>
                   </Col>
                </Row>

                <Row className='py-3'>
                    <Col>
                    <InputGroup className="mb-3">
                         <Form.Control
                           placeholder="Buscar producto"
                           aria-label="name"
                           aria-describedby="basic-addon2"
                           value={input}
                           onChange={e => setInput(e.target.value)}
                         />
                         <Button 
                         onClick={() => dispatch (filterProductThunk(input))}
                         variant="outline-primary" id="button-addon2" className='search'>
                           Buscar
                         </Button>
                        </InputGroup>
                    </Col>
                </Row>
                <Row xs={1} md={2} lg={3}>
                        {
                            products.map( item => (
                                <Col key={item.id}>
                                    <Card style={{displey:"flex", justifyContent:"center", alignItems:"center", padding: "1rem"}}>
                                        <Card.Img variant="top" src={item.images[0]?.url} 
                                        style={{height: 200, width:250}}/>
                                        <Card.Body>
                                            <Card.Title>{item.title}</Card.Title>
                                            <Card.Text>{item.description}</Card.Text>
                                            <Button className='w-100' as={Link} to={`/product/${item.id}`} variant="primary">Ver detalle</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ) )
                        }
                    

                </Row>
            </Container>

        </div>
    );
};

export default Home;