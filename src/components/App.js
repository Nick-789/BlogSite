// import "./App.css";
import "../styles/App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { UserContextProvider } from "./usercontext";
import Createpost from "../pages/createpost";
import Postpages from "../pages/Postpages";


function App() {
    return (
        <UserContextProvider>

            <Routes>
                <Route path="/" element={<Layout />}>

                    <Route index element={
                        <Homepage />
                    } />
                    <Route path={'/register'} element={
                        <Register />

                    } />
                    <Route path={'/login'} element={
                        <Login />

                    } />
                    <Route path={'/create'} element={
                        <Createpost />

                    } />

                    <Route path={'/upload/:id'} element={
                        <Postpages/>

                    } />
              
     

                    </Route>
                </Routes>
                


        </UserContextProvider>



    );
}


export default App;
