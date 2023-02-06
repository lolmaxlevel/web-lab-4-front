import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {userSlice} from "../../../store/reducers/userSlice";
import {fetchLogin} from "../../../store/actions/ActionCreators";
import {Spinner} from "react-bootstrap";
function LoginForm() {
    const {isLoading, username, password} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const {setUsername, setPassword} = userSlice.actions;
    function handleLogin(e){
        dispatch(fetchLogin(username, password))
        e.preventDefault();
    }
    return (
        <Form>
        <Form.Group className="mb-3" controlId="formLogin">
            <Form.Label>Login</Form.Label>
            <Form.Control value={username} type="login" placeholder="Enter login"
                          onChange={(e) => dispatch(setUsername(e.target.value))}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control value={password} type="password" placeholder="Enter Password"
                          onChange={(e) => dispatch(setPassword(e.target.value))}/>
        </Form.Group>
            {isLoading ?
                <Button variant="secondary" disabled>
                    <Spinner
                    as="span" animation="border"
                    size="sm" role="status"
                    aria-hidden="true"/>
                </Button>
                :
                <Button variant="secondary" type="submit" onClick={handleLogin}> Login </Button>
            }
    </Form>
    )
}

export default LoginForm;