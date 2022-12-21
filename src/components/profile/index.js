import {
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Button, Col, Divider, Layout, Menu, Row } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../config/paths";
import FavoriteItem from "./favoriteItem/FavoriteItem";
import Item from "./item";
import styles from "./styles.module.scss";
const { Header, Sider, Content } = Layout;

function Profile() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  function getItem(label, key, icon, url, children, type) {
    return {
      key,
      icon,
      url,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem("ホームページ", "1", <PieChartOutlined />, PATHS.home),
    getItem("プロファイル", "2", <DesktopOutlined />, PATHS.home),
    getItem("二つの本を比べる", "3", <ContainerOutlined />, PATHS.compare),
    getItem("模擬試験", "4", <ContainerOutlined />, PATHS.home),
  ];
  const handleSignout = () => {};
  const handleClick = () => {};

  return (
    <div className={styles.container}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div
            style={{
              height: 32,
              margin: 16,
              background: "rgba(255, 255, 255, 0.2)",
            }}
          />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            onSelect={(item) => {
              if (item.item.props.url === PATHS.home)
                window.location.reload(false);
              else navigate(item.item.props.url);
            }}
          />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {/* {user.length >= 25 && (
              <span className={styles.username}>
                こんにちは{user.slice(0, 25)}...
              </span>
            )}
            {user.length < 25 && (
              <span className={styles.username}>こんにちは{user}</span>
            )} */}
            <Button
              type="primary"
              className={styles.logoutButton}
              onClick={() => handleSignout()}
            >
              ログアウト
            </Button>
          </Header>
          <Content>
            <Row>
              <Col className={styles.avatarWrap} span={4} offset={2}>
                <div>
                  <img src="./login/avatarDefault.jpg" />
                </div>
                <span className={styles.name}>Hung</span>
              </Col>
              <Col className={styles.contact} span={12} offset={1}>
                <Row>
                  <span className={styles.labelContact}>メール:</span>
                  <span className={styles.text}> hung.nv281@gmail.com</span>
                </Row>
                <Row>
                  <span className={styles.labelContact}>電話番号:</span>
                  <span className={styles.text}> 0985589907</span>
                </Row>
              </Col>
              <Col className={styles.avatarWrap} span={2} offset={2}>
                <Button className={styles.btn} onClick={handleClick}>
                  支払い
                </Button>
              </Col>
            </Row>

            <Divider />

            <Row>
              <Col span={22} offset={2}>
                <p className={styles.label}>最近のテストのリスト</p>
              </Col>
            </Row>

            <Row>
              <Col span={6} offset={3}>
                <Item />
              </Col>
              <Col span={6}>
                <Item />
              </Col>
              <Col span={6}>
                <Item />
              </Col>
            </Row>

            <Divider />

            <Row>
              <Col span={22} offset={2}>
                <p className={styles.label}>興味の本のリスト</p>
              </Col>
            </Row>

            <Row>
              <FavoriteItem />
            </Row>
            <Row>
              <FavoriteItem />
            </Row>
            <Row>
              <FavoriteItem />
            </Row>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Profile;
