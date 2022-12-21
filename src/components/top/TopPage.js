import React from "react";
import { Layout } from 'antd';
import { Button } from 'antd';
import { Col, Row } from 'antd';
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../config/paths";
import { Carousel } from 'antd';
import styles from "./styles.module.scss";

const { Header, Footer, Content } = Layout;
function TopPage() {
    const navigate = useNavigate();
    const contentStyle = {
        height: '600px',
        color: '#000',
        textAlign: 'center',
        backgroundImage: `url("./N30007_tuvung.jpg")`,
        paddingTop: '400px',
        backgroundPosition: 'center',
        backgroundSize: '500px 600px',
        backgroundRepeat: 'no-repeat',
      };
    return ( 
        <Layout>
            <Header>
                <Row>
                    <Col span={22}>
                        <h1 style={{color: '#FFFFFF'}}>日本語教科書レビューウェブサイト</h1>
                    </Col>
                    <Col span={2}>
                        <Button type="primary" size='large' onClick={
                            () => {
                                navigate(PATHS.login);
                            }
                        }>ログイン</Button>
                    </Col>
                </Row>
            </Header>
            <Content>
            <Carousel autoplay className={styles.Carousel}>
                <div>
                    <div style={contentStyle}></div>
                </div>
                <div>
                    <div style={contentStyle}></div>
                </div>
                <div>
                    <div style={contentStyle}></div>
                </div>
            </Carousel>
            </Content>
            <Footer>
                Ten nhom phat trien
            </Footer>
        </Layout>
    )
}

export default TopPage;