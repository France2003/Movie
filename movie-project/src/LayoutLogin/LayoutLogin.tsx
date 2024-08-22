import Login from "../Pages/SignIn/SignInPage";


const RouteSignIn = () => {
    console.log("RouteSignIn");
  return (
    <div>
        <div className='container mx-auto'>
            <Login url={`login`}/>
        </div>
    </div>
  )
}

export default RouteSignIn