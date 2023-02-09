import React, { useState } from "react";
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
    const [images,setImages] = useState([])
    const [loading,setLoading] = useState(true)

  
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
    const contentStyle2 = {
        height: '600px',
        color: '#000',
        textAlign: 'center',
        backgroundImage: `url("./61bbq8cyoql.-ac-us200-.jpg")`,
        paddingTop: '400px',
        backgroundPosition: 'center',
        backgroundSize: '500px 600px',
        backgroundRepeat: 'no-repeat',
    };
    const contentStyle3 = {
        height: '600px',
        color: '#000',
        textAlign: 'center',
        backgroundImage: `url("./speedmaster.jpeg")`,
        paddingTop: '400px',
        backgroundPosition: 'center',
        backgroundSize: '500px 600px',
        backgroundRepeat: 'no-repeat',
    };

    const topPageBackground = {
        backgroundImage: `url("./top_page_background.jpg")`,
        backgroundPosition: 'center',
        backgroundSize: '1030px 600px',
        width: '80%',
        margin: 'auto',
        marginTop: '30px',
        opacity: '0.8',
        position: 'relative',
    }
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
                <div style={topPageBackground} >
                    <div className={styles.description}>
                    日本語勉強人たちにとって、日本語教科書を選ぶことがとても大切です。ところが、現在では教科書がたくさんあります。耳から覚えるとか、新完全マスターとか、総まとめとか。。。ですから、教科書を選ぶことは困っています。どれを選べばいいのか全然わからないです。
この問題を解決するために、私たちのチームは、誰もが自分に合ったカリキュラムを参照して選択できるように、日本語の教科書をレビューするWebサイトを作成したいと考えています。
                    </div>
                </div>
                <Carousel autoplay className={styles.Carousel}>
                    <div>
                        <div style={contentStyle}></div>
                    </div>
                    <div>
                        <div style={contentStyle2}></div>
                    </div>
                    <div>
                        <div style={contentStyle3}></div>
                    </div>
                </Carousel>
            </Content>
            <Footer style={ {backgroundColor: '#001529', color: 'white', marginTop: '30px'}} >
                <h3>このウェブサイトはStatus_200_OK によって開発されました。</h3>
                <h3>使用途中で問題が発生される場合、私達とご連絡してください。</h3>
                <h4>チームリーダー: Nguyen Thanh Huyen</h4>
                <h4>電話番号: +84123456789</h4>
                
            </Footer>
        </Layout>
        
    )
}

export default TopPage;