
// import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { FaFacebook } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import './SignInPage.css';

type Logo = {
    icon?: React.ReactNode,
    lable: string
}
const SignInPage = ({ url }: { url: string }) => {
    const SignInWith = ({ icon, lable }: Logo) => {
        return (
            <>
                <button className="SignInWith">
                    {lable}<p className="fgIcon">{icon}</p>
                </button>
            </>
        )
    };

    return (
        <div className="container_SignIn">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Sign In</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <form>
                <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/03/Logo-DH-Kien-Truc-Da-Nang-DAU.png" alt="" />
                <caption className="Dn">Đăng Nhập</caption>
                <div className="SignInName">
                    <div className="icon">
                        <FaUser />
                    </div>
                    <input type="text"
                        placeholder="Use Name"
                        required
                    />
                </div>
                <div className="SignInPasss">
                    <div className="icon">
                        <FaLock />
                    </div>
                    <input
                        type='password'
                        placeholder="Password"
                        required
                    />
                </div>
                <div className="Forgot">
                    <p className="Forgot_password">Forgot password?</p>
                </div>
                <div className="SignInWith">
                    <div className="facebook">
                        <SignInWith lable="Đăng nhập bằng" icon={<FaFacebook />} />
                    </div>
                    <div className="gmail">
                        <SignInWith lable="Đăng nhập bằng" icon={<SiGmail />} />
                    </div>
                </div>
                {/* <div className="already_In">
          <p>Bạn chưa có tài khoản? hãy </p>
          <Link to={`/Project/Login1/signup/`}> <LayOutSign label="Đăng kí"></LayOutSign> </Link>
          <p>ngay</p>
        </div> */}
            </form>
        </div>
    );
};

export default SignInPage
