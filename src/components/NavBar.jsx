import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
    <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/"><i className='bx bx-barcode-reader bx-burst' ></i> Store-FL <i className='bx bx-barcode-reader bx-burst' ></i></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/purchases">Compras</Nav.Link>
            <Nav.Link>Carrito</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
};

export default NavBar;