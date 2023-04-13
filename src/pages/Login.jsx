import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const {register, handleSubmit} = useForm()
    const navigate = useNavigate()

    const submit = data => {
        axios
            .post("https://e-commerce-api-v2.academlo.tech/api/v1/users/login", data)
            .then(resp => { 
                localStorage.setItem("token", resp.data.token)
                navigate("/")        
            })
            .catch(error => {
                if(error.response?.status === 401){
                    alert("Usuario incorrecto")
                } else {
                    console.log(error.response?.data)
                }
            })
        
    }

    const token = localStorage.getItem("token")

    const logout = () => {
        localStorage.clear()
        navigate("/login")
    }

    return (
    <>
    {
        token ? 
        <div className='close-session'>
            <div className='user'><i class='bx bx-user' ></i></div>
            <Button onClick={logout}>Cerrar sesion</Button>
        </div>
    :
    <div className='general'>
    <div className='test-data'>
    <h6>Test Data</h6>
    <div>
        <p>
            <i className='bx bx-envelope' ></i> franciscolacelli49@gmail.com
        </p>
        <p>
    <i className='bx bx-wrench' ></i> fran1234
    </p>
    </div>
    </div>
        <Form className='formulario'
        onSubmit={handleSubmit(submit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className='log'><i className='bx bx-envelope bx-tada' ></i> Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" 
                {...register("email")}/>
            </Form.Group>
  
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className='log'><i className='bx bx-wrench bx-tada' ></i> Password</Form.Label>
                <Form.Control type="password" placeholder="Password" 
                {...register("password")}/>
            </Form.Group>
       
       
            <Button variant="primary" type="submit">
                Iniciar Sesion
            </Button>
      </Form>
      </div>
    }
    </>
    );
};

export default Login;