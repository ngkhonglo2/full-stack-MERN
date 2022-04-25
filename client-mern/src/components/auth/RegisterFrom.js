import React, { useState, useContext } from 'react';
import  Button from 'react-bootstrap/Button';
import Form  from 'react-bootstrap/Form';
import { Link} from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layout/AlertMessage';

const RegisterFrom = () => {
    const {registerUser} = useContext(AuthContext)

    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    })

    const [alert, setAlert] = useState(null)
    const {username, password, confirmPassword} = registerForm

    const onChangeRegisterForm = (e)=>{
        setRegisterForm({...registerForm, [e.target.name]: e.target.value})
    }

    const register = async (e)=>{
        e.preventDefault()

        if(password !== confirmPassword){
            setAlert({type: 'danger', message: "password do not match"})
            setTimeout(()=> setAlert(null), 5000)
            return
        }

        try{
            const registerData = await registerUser(registerForm)
            if(!registerData.success){
                setAlert({type: 'danger', message: registerData.message})
                setTimeout(()=> setAlert(null), 5000)
            }
        }catch(error){
            console.log(error);
        }
    }

    return (
        <>
            <Form className='my-4' onSubmit={register}>
                <AlertMessage info={alert}/>
                <Form.Group>
                    <Form.Control 
                        type='text' 
                        placeholder='Username' 
                        name='username' 
                        required 
                        value={username}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <br/>
                <Form.Group>
                    <Form.Control 
                        type='password' 
                        placeholder='Password' 
                        name='password' 
                        required 
                        value={password}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <br/>
                <Form.Group>
                    <Form.Control 
                        type='password' 
                        placeholder='Confirm Password' 
                        name='confirmPassword' 
                        required 
                        value={confirmPassword}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <br/>
                <Button variant='success' type='submit'>Register</Button>
            </Form>        
            <p>
                Already have an account? {" "}
                <Link to='/login'>
                    <Button variant='info' size='sm' className='ml-2'>Login</Button>
                </Link>
            </p>
        </>
    );
};

export default RegisterFrom;