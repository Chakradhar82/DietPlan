import React from 'react';
import { Button, Col, Form, Input } from 'antd';
import $ from 'jquery';
import { Link } from 'react-router-dom';

const onFinish = (values) => {
    let body = {
        "email": values.username,
        "password": values.password
    }

    $.ajax(
        {
            url: 'http://localhost:4000/api/v1/user/login',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(body)
        }
    ).then(
        (res) => {
            console.log(res);
        },
        (err) => {
            console.log(err);
        }
    )

};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const Login = () => (
    <div className='container' style={{ width: "300px" }}>
        <header>Login</header>
        <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout='vertical'
        >
            <Col xs={24}>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Col>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <div className='button'>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </div>
                <div className="footer">
                    <span>Don't have an account?</span>
                    <Link to="/signup">Sign Up</Link>
                </div>
            </Form.Item>
        </Form>
    </div>

);
export default Login;