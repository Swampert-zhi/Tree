import React from "react";
import {login} from "../services/UserService"
import { Form, Input, Button, message} from 'antd';
import "../css/LoginView.css";

class LoginView extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            login:false,
        }
    }

    layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 0 },
    };
    tailLayout = {
        wrapperCol: { offset: 0, span: 0 },
    };

    onFinish = values => {
        const callback = (data) => {
            localStorage.setItem("userId",data.userId);
            if(data.userId>0)
                this.props.history.push("/");
        }
        login(values,callback);
    };

    onFinishFailed = errorInfo => {
        // console.log('Failed:', errorInfo);
    };

    render(){

        return (
            <div className="background">
                <Form
                    {...this.layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    className="form"
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: '请输入你的用户名!' }]}
                    >
                        <Input style={{width:'200px'}}/>
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入你的密码!' }]}
                    >
                        <Input.Password style={{width:'200px'}}/>
                    </Form.Item>

                    <Form.Item {...this.tailLayout}>
                        <Button type="primary" htmlType="submit">
                            登 录
                        </Button>
                        <Button type="primary"
                                onClick={(e)=> this.props.history.push("/register")}
                                style={{background:"#a1a1a1",border: "#a1a1a1",marginLeft:20}}>
                            注 册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }

};

export default LoginView;
