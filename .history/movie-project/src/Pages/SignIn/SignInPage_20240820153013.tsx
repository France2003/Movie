// src/components/LoginForm.js
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { FaFacebook } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import './index.css';
// import { setTimeout } from "timers/promises";
// import {toast} from "sonner";

const SignInForm = () => {
  const [passwordType, setPasswordType] = useState('password');
  const [showpassword, setShowPassword] = useState('');
  const [usename, setUsename] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const username =usename;
  const showPass = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  }
  const handleShowPassword = (e:any) => {
    setShowPassword(e.target.value);
  };

  const {
    register,
    formState: { errors,  isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data:any) => console.log(data);
  type Logo = {
    icon?: React.ReactNode,
    lable: string
  }
  const SignInWith = ({ icon, lable }: Logo) => {
    return (
      <>
        <button className="SignInWith">
          {lable}<p className="fgIcon">{icon}</p>
        </button>
      </>
    )
  };

  const Submit = (e:any)=>{
    e.preventDefault()
    axios.post('http://localhost:3001/Project/Login/signin',{usename, password})
    .then(result=>{
      console.log(result);
      if(result.data === "Success"){
        alert("Đăng nhập thành công")
        {isSuccess && (
          <Loading/>
        )}
        history('/Project/',{state:{username}})

      }else{
        alert("Tên đăng nhập và mật khẩu không đúng đúng");
      }
    })
    .catch(err => {console.log(err)
      setIsSuccess(false);
    }
    
    )
  }


  return (
    <div className="container_SignIn">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sign In</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <form onSubmit={Submit}>
        <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/03/Logo-DH-Kien-Truc-Da-Nang-DAU.png" alt="" />
        <caption className="Dn">Đăng Nhập</caption>
        <div className="SignInName">
          <div className="icon">
            <FaUser />
          </div>
          <input type="text"
            placeholder="Use Name"
            required
            // value={name} 
            onChange={(e) => setUsename(e.target.value)}
          />
        </div>
        <div className="SignInPasss">
          <div className="icon">
            <FaLock />
          </div>
          <input
            type={passwordType}
            placeholder="Password"
            required
            value={showpassword}
            {...register("password")}
            onChange={(e) => { setPassword(e.target.value) }}
            onChange={handleShowPassword}
          />
        </div>
        <p className="error">{errors.password?.message}</p>
        <div className="showPass" style={{marginTop: "50px"}}>
          <input className="CheckPass" type="checkbox" name="" id="" onClick={showPass} />
          <p>Show PassWord</p>
        </div>
        <div className="Forgot">
          <p className="Forgot_password">Forgot password?</p>
        </div>
        <button type="submit" disabled={isSubmitting}> 
        {isSubmitting? "Đăng đăng nhập....":"Đăng nhập"} 
        </button>


        <div className="SignInWith">
          <div className="facebook">
            <SignInWith lable="Đăng nhập bằng" icon={<FaFacebook />} />
          </div>
          <div className="gmail">
            <SignInWith lable="Đăng nhập bằng" icon={<SiGmail />} />
          </div>
        </div>
        <div className="already_In">
          <p>Bạn chưa có tài khoản? hãy </p>
          <Link to={`/Project/Login1/signup/`}> <LayOutSign label="Đăng kí"></LayOutSign> </Link>
          <p>ngay</p>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;