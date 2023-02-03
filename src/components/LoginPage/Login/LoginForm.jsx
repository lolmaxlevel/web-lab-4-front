import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
function LoginForm() {
    return (
        <Form>
        <Form.Group className="mb-3" controlId="formLogin">
            <Form.Label>Login</Form.Label>
            <Form.Control type="email" placeholder="Enter login" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" />
        </Form.Group>
        <Button variant="secondary" type="submit">
            Login
        </Button>
    </Form>
    )
}

export default LoginForm;