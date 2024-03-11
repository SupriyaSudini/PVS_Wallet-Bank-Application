import React, { useEffect } from 'react'
import { GetUserInfo } from '../apicalls/users';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SetUser, ReloadUser } from '../redux/usersSlice';
import { HideLoading, ShowLoading } from "../redux/loadersSlice";

import Layout from './Layout';



function ProtectedRoute(props) {

    // const [userData, setUserData] = React.useState(null);
    const { user, reloadUser } = useSelector(state => state.users);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetUserInfo();
            dispatch(HideLoading());
            if (response.success) {
                // setUserData(response.data);
                dispatch(SetUser(response.data));
            } else {
                message.error(response.message);
                navigate("/login");
            }
            dispatch(ReloadUser(false));
        } catch (error) {
            dispatch(HideLoading());
            navigate("/login");
            message.error(error.message);

        }
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            if (!user) {
                getData();
            }
        }
        else {
            navigate("/login");
        }
    }, []);

    useEffect(() =>{
     if(reloadUser){
       getData();
     }
    },[reloadUser]);

    return (

        user && 
        <div> 
            <Layout>
               {props.children}
            </Layout>
      
        </div>
    )
}
export default ProtectedRoute;
