import { Button, Divider, Form, Input } from "antd";
import { Anchor } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { test1 } from "./service";
import styles from "./styles.module.scss";

const { Link } = Anchor;
function Login() {
  const [account, setAccount] = useState({});

  const onFinish = (values) => {
    setAccount({ ...values });
    fetchAPIUser();
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const fetchAPIUser = useCallback(() => {
    // console.log(test1(account));
    test1(account)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  }, [account]);

  useEffect(() => {
    fetchAPIUser();
  }, [fetchAPIUser]);

  return (
    <div className={styles.container}>
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
        // title="ログイン"
      >
        <p className={styles.title}>ログイン</p>
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
          <Button className={styles.btnLogin} type="primary" htmlType="submit">
            ログイン
          </Button>
        </Form.Item>
        <Link type="primary" htmlType="submit">
          <a href="/">パスワードを忘れますか？</a>
        </Link>
        <Divider />
        <div>
          <span>新しいアカウント</span>
          <Button className={styles.btnSignUp} type="primary">
            登録
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Login;
