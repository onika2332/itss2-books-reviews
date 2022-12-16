import { Button, Divider, Form, Input, notification } from "antd";
import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../config/api-paths";
import { PATHS } from "../config/paths";
import { testSignup } from "./login/service";
import styles from "./login/styles.module.scss";

function Signup() {
    const [account, setAccount] = useState({});
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const onFinish = async (value) => {
       
        console.log("Success:",value);
       
       
        let url = API_PATHS.signup;
       
        await axios.post(url,value,{
            headers: {
                // 'application/json' is the modern content-type for JSON, but some
                // older servers may use 'text/json'.
                // See: http://bit.ly/text-json
                'content-type': 'application/json'
              }
        }).then(res => {
            notification.success({
            message: " Signup success!",
            duration: 1.5
        })
            navigate("/login");
        }).catch(err => 
            {
                notification.error({
                    message: "Signup failed!",
                    duration: 1.5
                })
            })
    }

    const onFinishFailed = (error) => {
        console.log("Failed : ", error);
        setMessage("間違ったメールまたはパスワード");
    }


    return (
        <div className={styles.container}>
            <p>{message}</p>
            <Form
                className={styles.form}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <p className={styles.title}>サインアップ</p>
                <Divider />
                <Form.Item
                label="メールアドレス："
                labelAlign=""
                name="username"
                rules={[
                    {
                    required: true,
                    message: "Please input your username!",
                    },
                ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                label="パスワード："
                name="password"
                rules={[
                    {
                    required: true,
                    message: "Please input your password!",
                    },
                ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                >
                    <Button className={styles.btnSignUpPage} type="primary" htmlType="submit">
                        サインアップ
                    </Button>
                </Form.Item>
                
                <Divider style={{marginTop: '50px'}}/>
                <div>
                <span>アカウントを持っています？</span>
                <Button 
                    className={styles.btnSignUp} 
                    type="primary"
                    onClick={
                        () => {
                            navigate(PATHS.login);
                        }
                    }
                >
                    ログイン
                </Button>
                </div>
            </Form>
        </div>
    );
} 

export default Signup;