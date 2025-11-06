import "../css/Login.css"
import { useForm } from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useState } from "react"


function Login(){

    const [showPassword, setShowPassword] = useState(false);

    const [isLogin, setIsLogin] = useState(true);

    const loginSchema = yup.object().shape({
        email: yup.string().email("Invalid format").required("Email is required"),
        password: yup.string().min(4, "Incorrect password").max(20).required()
    });

    const registerSchema = yup.object().shape({
        email: yup.string().email("Invalid format").required("Email required"),
        password: yup.string().min(4, "Must be at least 4 characters").max(20,"Must be less than 20 characters")
            .required("Password Required"),
        confirmPassword: yup.string().oneOf([yup.ref("password"),null], "Passwords Don't Match").required("Re-enter Password")
        });

    const schema = isLogin ? loginSchema : registerSchema;

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(isLogin? "Logging in: " : "Registering: ", data)
        reset()
    };

    return (
        <div className="login">
            <h1>{isLogin ? "Welcome Back!" : "Welcome!"}</h1>
            <div className="login-container">
                <h2>{isLogin ? "Login" : "Register"}</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="text" placeholder="ex@hotmail.com" {...register("email")}
                            className="form-input"/>
                        <p className="error">{errors.email?.message}</p>

                    </div>

                    <div className="form-group">
                        <div className="password-field">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type={showPassword ? "text" : "password"} 
                                placeholder="******" {...register("password")}
                                className="form-input"/>
                            
{/*
                            <button
                                type="button" 
                                onClick={() => {
                                    setShowPassword(!showPassword)
                                }} className="toggle-button"> {showPassword ? "Hide" : "Show"} 
                            </button>
*/}
                        </div>
                        <p className="error">{errors.password?.message}</p>
                        
                    </div>
                    

                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
                            <input type={showPassword ? "text" : "password"} placeholder="******"
                                {...register("confirmPassword")}
                                className="form-input"/>
                            <p className="error">{errors.confirmPassword?.message}</p>
                        </div>
                    )}
                     
                    <button type="submit" className="submit-btn">
                        {isLogin ? "Login":"Register"}
                    </button>
                    
                </form>

                <p className="switch-txt">
                    {isLogin ? "Don't have an account?": "Already have an account?"}
                    <button onClick={()=> {
                        setIsLogin(!isLogin);
                        setShowPassword(false);
                        reset();
                    }} className="switch-btn">
                        {isLogin ? "Register": "Login"}

                    </button>
                </p>

            </div>
        </div>
    );
}

export default Login;