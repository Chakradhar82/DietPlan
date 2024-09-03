import React, {useState} from 'react';
import { Button, Checkbox, Col, Form, Select, Steps } from 'antd';
import { useNavigate } from 'react-router-dom';
import Title from 'antd/es/typography/Title';

const { Step } = Steps;
const { Option } = Select;

const UserInfoForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [checked, setChecked] = useState(false);

    const next = () => {
        form
            .validateFields()
            .then(() => {
                setCurrent(current + 1);
            })
            .catch((info) => {
                console.log('Validation Failed:', info);
            });
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const handleCheckbox = (e) => {
        setChecked(e.target.checked);

    }

    const onFinish = () => {
        console.log("hi");;

    }

    const steps = [
        {
            title: '1',
            content: (
                <div>
                    <div>Are you a vegeterian or not? </div>
                    <Checkbox checked={checked} onChange={handleCheckbox} >vegeterian</Checkbox>
                    <Checkbox  onChange={handleCheckbox} >no</Checkbox>
                </div>     
            ),
        },
        {
            title: '2',
            content: (
                <Col xs={24} md={24} >
                        <Form.Item
                            name="health_goals"
                            label="Health Goals"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select a Health Goal!',
                                },
                            ]}
                        >
                            <Select placeholder="select your health goal">
                                <Option value="weight_gain">Weight Gain</Option>
                                <Option value="weight_loss">Weight Loss</Option>
                                <Option value="muscle_gain">Muscle Gain</Option>
                                <Option value="health_maintenance">Health Maintenance</Option>
                            </Select>
                        </Form.Item>
                    </Col>
            ),
        },
        {
            title: '3',
            content: (
                <Col xs={24} md={24} >
                        <Form.Item
                            name="special_health_conditions"
                            label="Special Health Conditions"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select your health condition!',
                                },
                            ]}
                        >
                            <Select placeholder="select your health condition">
                                <Option value="diabetes">Diabetes</Option>
                                <Option value="blood_pressure">Blood Pressure</Option>
                                <Option value="heart_disease">Heart Disease</Option>
                                <Option value="cholestrol">Cholestrol</Option>
                                <Option value="none">None</Option>
                            </Select>
                        </Form.Item>
                    </Col>
            ),
        },
        {
            title: '4',
            content: (
                <div>
                    <div>Does your occupation involves any physical activities ? </div>
                    <Checkbox checked={checked}>yes</Checkbox>
                    <Checkbox checked={checked}>no</Checkbox>

                </div>     
            ),
        },
    ];
    return (
        <div className='container' style={{ width: "400px" }}>
            <Title type="primary" level={4} style={{ textAlign: 'center', marginBottom: '25px' }} >Health Information</Title>
                    <div>
                        <Steps current={current}>
                            {steps.map((item) => (
                                <Step key={item.title} />
                            ))}
                        </Steps>
                        <Form form={form} onFinish={onFinish}  layout="vertical" style={{ marginTop: '25px' }}>
                            <div style={{marginBottom: "25px" , textAlign:'center'}}>{steps[current].content}</div>
                            <div className="steps-action align-right" style={{textAlign:'right'}}>
                                {current < steps.length - 1 && (
                                    <Button type="primary" onClick={() => next()}>
                                        Next
                                    </Button>
                                )}
                                {current === steps.length - 1 && (
                                    <Button form={form}>
                                        {"Submit"}
                                    </Button>
                                )}
                                {current > 0 && (
                                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                        Previous
                                    </Button>
                                )}
                                {current === 0 && (
                                    <Button style={{ margin: '0 8px' }} onClick={() => navigate('/')}>
                                        Cancel
                                    </Button>
                                )}
                            </div>
                        </Form>
                    </div>
        </div>
    );
}

export default UserInfoForm;
