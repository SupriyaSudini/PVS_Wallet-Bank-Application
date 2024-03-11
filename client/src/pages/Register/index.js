import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {Col} from 'antd';
import {Form} from 'antd';
import {Row} from 'antd';
import {Input, Select} from 'antd';
import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import './../../stylesheets/custom-components.css';
import { RegisterUser } from "../../apicalls/users";
import { message } from 'antd';
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";


const { Option } = Select;

function Register(){
  /* for hover effect and click effect*/
    const [hoveredInput, setHoveredInput] = useState(null);
    const [clickedInput, setClickedInput] = useState(null);
  
    const handleMouseEnter = (input) => {
      setHoveredInput(input);
    };
  
    const handleMouseLeave = () => {
      setHoveredInput(null);
    };
  
    const handleClick = (input) => {
      setClickedInput(input === clickedInput ? null : input);
    };
  
    const getInputStyle = (input) => {
      const isHovered = input === hoveredInput;
      const isClicked = input === clickedInput;
  
      return {
        borderColor: isClicked ? '#3f8afc' : isHovered ? '#3f8afc' : 'gray',
      };
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const onFinish = async(values) => {
     try {
       dispatch(ShowLoading());
       const response = await RegisterUser(values);
       dispatch(HideLoading())
       if(response.success){
        message.success(response.message);
        navigate('/login');
       }else{
        message.error(response.message);
       }
     } catch (error) {
      dispatch(HideLoading())
       message.error(error.message);
     }
    }
 /* it ends here */

    return (
        <div className="m-5">
          <div className="flex items-center justify-between p-top50">
            <h1 className="text-2xl">PVS WALLET - REGISTER</h1>
    
            <h1 className="text-sm underline" onClick={() => navigate('/login')}>
              Already a member , Log in
            </h1>
          </div>
          <hr />
          <Form layout="vertical" onFinish={onFinish}>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item label="First Name" name="firstName">
                <Input
                    style={getInputStyle('input1')}
                    onMouseEnter={() => handleMouseEnter('input1')}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick('input1')}
                   type="text" placeholder="firstName" 
                   prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} 
                   />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Last Name" name="lastName">
                <Input
                    style={getInputStyle('input2')}
                    onMouseEnter={() => handleMouseEnter('input2')}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick('input2')}
                    type="text" placeholder="lastName" 
                    prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} 
                    />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Email" name="email">
                <Input
                    style={getInputStyle('input3')}
                    onMouseEnter={() => handleMouseEnter('input3')}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick('input3')}
                    type="text" placeholder="email"
                    prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} 
                    />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Mobile" name="phoneNumber">
                <Input
                    style={getInputStyle('input4')}
                    onMouseEnter={() => handleMouseEnter('input4')}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick('input4')}
                    type="text" placeholder="mobile"
                    prefix={<PhoneOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} 
                    />
                </Form.Item>
              </Col>
    
              <Col span={6}>
                <Form.Item label="Identification Type" name="identificationType">
                  {/* <Select> */}
                   <Select
                        style={getInputStyle('input8')}
                        onMouseEnter={() => handleMouseEnter('input8')}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick('input8')} >
                    <Option value="NATIONAL ID">National ID</Option>
                    <Option value="PASSPORT">Passport</Option>
                    <Option value="DRIVING LICENSE">Driving License</Option>
                    <Option value="SOCIAL CARD">Social Security Card (SSN)</Option>
                  </Select>
                </Form.Item>
              </Col>
    
              <Col span={6}>
                <Form.Item label="Identification Number" name="identificationNumber">
                <Input
                    style={getInputStyle('input5')}
                    onMouseEnter={() => handleMouseEnter('input5')}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick('input5')}
                     type="text" placeholder="Unique ID"/>
                </Form.Item>
              </Col>
    
              <Col span={24}>
                <Form.Item label="Address" name="address">
                <TextArea
                    style={getInputStyle('textarea')}
                    onMouseEnter={() => handleMouseEnter('textarea')}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick('textarea')} 
                    type="text"  placeholder="Permanent / Resident Address"/>
                </Form.Item>
              </Col>
    
              <Col span={6}>
                <Form.Item label="Password" name="password">
                <Input.Password
                    style={getInputStyle('input6')}
                    onMouseEnter={() => handleMouseEnter('input6')}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick('input6')}
                     type="password" placeholder="password" 
                     prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                     />
                </Form.Item>
              </Col>
    
              <Col span={6}>
                <Form.Item label="Confirm Password" name="confirmPassword">
                <Input.Password
                    style={getInputStyle('input7')}
                    onMouseEnter={() => handleMouseEnter('input7')}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick('input7')}
                     type="password" placeholder="confirm Password"
                     prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                     />
                </Form.Item>
              </Col>
            </Row>
    
            <div className="flex justify-end">
              <button className="primary-contained-btn" type="submit">
                Register
              </button>
            </div>
          </Form>
        </div>
      );
    }
    
    export default Register;

