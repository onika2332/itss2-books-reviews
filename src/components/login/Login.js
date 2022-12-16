import { Button, Divider, Form, Input } from "antd";
import { Anchor } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../config/paths";
import styles from "./styles.module.scss";
import axios from "axios";
import { API_PATHS } from "../../config/api-paths";

const { Link } = Anchor;
function Login() {

  const navigate = useNavigate();

  const onFinish = async (values) => {

    console.log('Success:', values);
    let url = API_PATHS.login;
   
    await axios.post(url,values,{
        headers: {
            // 'application/json' is the modern content-type for JSON, but some
            // older servers may use 'text/json'.
            // See: http://bit.ly/text-json
            'content-type': 'application/json'
          }
    })
    .then(res=>res.data)
    .then(data=>
        {
            console.log(data);
            localStorage.setItem("APP_TOKEN",data.access_token);
            localStorage.setItem("ACTIVE_USER",data.name);
            localStorage.setItem("IS_AUTH",true);
            navigate(PATHS.home)
            

        })
    .catch(err=>alert(err))

  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // const fetchAPIUser = useCallback(() => {
  //   // console.log(test1(account));
  //   test1(account)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((error) => console.log(error));
  // }, [account]);

  // useEffect(() => {
  //   fetchAPIUser();
  // }, [fetchAPIUser]);

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
          <Button 
            className={styles.btnSignUp}
            type="primary"
            onClick={
              () => {
                  navigate(PATHS.signup);
              }
            }
          >
            登録
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Login;
