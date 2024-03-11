// import "antd/dist/antd.css";
import React from "react";
import { Col, Form, Row, Input } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { LoginUser } from "../../apicalls/users";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";



function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await LoginUser(values);
      dispatch(HideLoading());

      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        // navigate("/"); instead of this use the down given 
        window.location.href="/";
      } else {
        message.error(response.message);
      }

    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  }



  return (
    <div className="bg-primary flex items-center justify-center h-screen">
      <div className="card w-400 p-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">PVS WALLET - LOGIN</h1>
        </div>
        <hr />
        <Form layout="vertical" onFinish={onFinish} >
          <Row gutter={16}>

            <Col span={24}>
              <Form.Item label="Email" name="email">
                <Input type="email" placeholder="email"
                  prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} />
              </Form.Item>
            </Col>


            <Col span={24}>
              <Form.Item label="Password" name="password">
                {/* <Input type="password" placeholder="password"/> */}
                <Input.Password prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password" placeholder="Password"
                />
              </Form.Item>
            </Col>


          </Row>

          <div style={{ textAlign: 'center' }}>
            <button className="bg-primary text-white text-lg h-40p w-400 " type="submit">
              LOGIN
            </button>

          </div>
          <h5 className="text-sm text-center underline"
            onClick={() => navigate('/register')}>
            Not a member, Register
          </h5>
        </Form>
      </div>
    </div>
  );
}

export default Login;

