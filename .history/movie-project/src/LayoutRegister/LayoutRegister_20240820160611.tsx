import Register from "../Pages/Register/Register";

const RouteRegister = () => {
    console.log("RouteSignIn");
  return (
    <div>
        <div className='container mx-auto'>
            <Register url={`register`}/>
        </div>
    </div>
  )
}
export default RouteRegister