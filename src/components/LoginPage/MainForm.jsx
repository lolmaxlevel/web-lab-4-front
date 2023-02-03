import LoginForm from "./Login/LoginForm";
import RegisterForm from "./Register/RegisterForm";

function MainForm({mode}) {

    if (mode === "login") {
        return (
            <LoginForm/>
        );
    }
    return (
        <RegisterForm/>
    );
}

export default MainForm;