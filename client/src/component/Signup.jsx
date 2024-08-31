import { Button, Form, Input, Row, Select, Col } from 'antd';
import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';

const { Option } = Select;


const Signup = () => {
    const [form] = Form.useForm();
    const onFinish = ({ first_name, last_name, password, age, phone, gender, email }) => {
        let body = {
            first_name, last_name, password, age, phone, gender, email
        }

        $.ajax(
            {
                url: 'http://localhost:4000/api/v1/user/signup',
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

    return (
        <div className='container'>
            <header>Sign up</header>
            <Form
                form={form}
                name="register"
                onFinish={onFinish}
                layout='vertical'
            >
                <Row gutter={10}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="first_name"
                            label="First Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your First Name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="last_name"
                            label="Last Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Last Name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={10}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="age"
                            label="Age"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your age!',
                                },
                            ]}
                        >
                            <Input type='number' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="gender"
                            label="Gender"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select gender!',
                                },
                            ]}
                        >
                            <Select placeholder="select your gender">
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                                <Option value="other">Other</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={10}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="phone"
                            label="Phone Number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone number!',
                                },
                            ]}
                        >
                            <Input
                                addonBefore="+91"
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={10}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item >
                    <div className='button'>
                        <Button style={{ width: '100px' }} type="primary" htmlType="submit">
                            Register
                        </Button>
                    </div>
                    <div className="footer">
                        <span>Already have an account?</span>
                        <Link to="/login">Sign In</Link>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};
export default Signup;