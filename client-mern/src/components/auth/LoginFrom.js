import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layout/AlertMessage';

const LoginFrom = () => {
    // Context
    const { loginUser } = useContext(AuthContext)

    // Local state
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })

    const [alert, setAlert] = useState(null)
    const { username, password } = loginForm
    const onChangeLoginForm = (e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.value })

    const login = async (e) => {
        e.preventDefault()
        try {
            const loginData = await loginUser(loginForm)
            if (!loginData.success) {
                setAlert({type: 'danger', message: loginData.message})
                setTimeout(()=> setAlert(null), 5000)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Form className='my-4' onSubmit={login}>
                <AlertMessage info={alert}/>
                <Form.Group>
                    <Form.Control
                        value={username}
                        type='text'
                        placeholder='Username'
                        name='username'
                        required
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <br/>
                <Form.Group>
                    <Form.Control
                        value={password}
                        type='password'
                        placeholder='Password'
                        name='password'
                        required
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <br/>
                <Button variant='success' type='submit'>Login</Button>
            </Form>
            <p>
                Don't have an account? {" "}
                <Link to='/register'>
                    <Button variant='info' size='sm' className='ml-2'>Register</Button>
                </Link>
            </p>
        </>
    );
};

export default LoginFrom;