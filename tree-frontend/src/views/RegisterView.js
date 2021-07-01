import React from "react";
import {Form, Input, Tooltip, Button, Upload, Modal,message} from 'antd';
import {checkUsername,addUser} from "../services/UserService";
import { QuestionCircleOutlined, PlusOutlined } from '@ant-design/icons';
import "../css/RegisterView.css";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

class RegisterView extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            fileList: [],
            previewVisible: false,
            previewImage: null,
        }
    }

    onFinish = values => {
        let ifexist;

        const callback2=(data)=>{
            localStorage.setItem("userId",data);
            message.success("账户创建成功，即将跳转至首页")
            setTimeout(()=>{
                this.props.history.push("/");
            },1000)
        }

        const callback=(data)=>{
            if(data === false )
                message.error("该用户名已存在，请修改");
            else
                addUser(values,callback2)
        }

        checkUsername(values.username,callback);
    };

    handlePreview=()=>{
        this.setState({
            previewVisible:true
        })
    }

    handleCancel=()=>{
        this.setState({previewVisible:false});
    }

    beforeUpload=(file)=>{
        const r = new FileReader();
        r.readAsDataURL(file);
        r.onload = e => {
            this.setState({
                fileList:[{
                    uid:'-1',
                    status: 'done',
                    url: e.target.result,
                }],
                previewImage:e.target.result
            })
        };
        return false;
    }

    render(){
        // const [form] = Form.useForm();
        return (
            <div className="register-background">
                <Form
                    {...formItemLayout}
                    name="register"
                    onFinish={this.onFinish}
                    initialValues={{
                        prefix: '86',
                    }}
                    scrollToFirstError
                    autocomplete="off"
                    className="register-form"
                >
                    <Form.Item
                        name="username"
                        label={
                            <span>
            用户名&nbsp;
                                <Tooltip title="挑选一个你喜欢的用户名吧">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
                        }
                        rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
                        autocomplete="off"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[
                            {
                                required: true,
                                message: '请输入你的密码!',
                            },
                        ]}
                        hasFeedback
                        autocomplete="off"
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="重复密码"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '请确认你的密码!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('你两次输入的密码不同!');
                                },
                            }),
                        ]}
                        autocomplete="off"
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout} >
                        <Button type="primary" htmlType="submit" className="register-submit">
                            注册
                        </Button>
                        <Button type="primary"
                                onClick={(e)=> this.props.history.push("/Login")}
                                style={{background:"#a1a1a1",border: "#a1a1a1",float:"left",marginLeft:20}}>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
};

export default RegisterView;
