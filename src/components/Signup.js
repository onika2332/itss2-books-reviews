import { Button, Divider, Form, Input } from "antd";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../config/paths";
import { testSignup } from "./login/service";
import styles from "./login/styles.module.scss";

function Signup() {
    const [account, setAccount] = useState({});
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const onFinish = (value) => {
        setAccount({ ...value });
        fetchAPIUser();
        console.log("Success:",value);
        setMessage("");
    }

    const onFinishFailed = (error) => {
        console.log("Failed : ", error);
        setMessage("間違ったメールまたはパスワード");
    }

    const fetchAPIUser = useCallback(
        () => {
            testSignup(account)
                .then(
                    (res) => {
                        console.log(res);
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                    }
                )
        },
        [account]
    );

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