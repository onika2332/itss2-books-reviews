import {
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Button, Col, Divider, Layout, Menu, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../../config/api-paths";
import { PATHS } from "../../config/paths";
import { useAuth } from "../../hooks/useAuth";
import FavoriteItem from "./favoriteItem/FavoriteItem";
import Item from "./item";
import AvatarPart from "./item/AvatarPart";
import styles from "./styles.module.scss";
const { Header, Sider, Content } = Layout;

function Profile() {
  const [collapsed, setCollapsed] = useState(false);
  const [userInfo, setUserInfo] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [user, token, isAuth] = useAuth()
  const config = {
    headers: {
      'content-type': 'application/json',
      'authorization': 'Bearer ' + token,
    }
  }
  useEffect(() => {
    fetchProfile()
  }, [])
  const fetchProfile = async () => {
    const { data } = await axios.get(API_PATHS.profile, config)
    console.log(data);
    setLoading(false)
    setUserInfo(data["user_info"])
    setFavorites(data["favorite_books"]);
  }

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
    getItem("Trang chủ", "1", <PieChartOutlined />, PATHS.home),
    getItem("Profile", "2", <DesktopOutlined />, PATHS.profile),
    getItem("Compare Books", "3", <ContainerOutlined />, PATHS.compare),
  ];


  const favoriteBooks = () => {
    if (loading) {
      return <div>Loading</div>
    }
    if (favorites.length == 0) {
      return <div>No favorite Books</div>
    }

   return favorites.map((book, idx) => {
      return (
        <FavoriteItem book={book} />
      )
    })
  }
  const handleSignout = () => {
    localStorage.removeItem("APP_TOKEN");
    localStorage.removeItem("ACTIVE_USER");
    localStorage.removeItem("IS_AUTH");
    navigate(PATHS.topPage)
  }
  const handleClick = () => { };

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
            defaultSelectedKeys={["2"]}
            mode="inline"
            items={items}
            onSelect={(item) => {
              navigate(item.item.props.url)
            }}
          />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <Button
              type="primary"
              className={styles.logoutButton}
              onClick={() => handleSignout()}
            >
              Đăng xuất
            </Button>
          </Header>
          <Content>
            {userInfo != null ? <Row>
              <Col className={styles.avatarWrap} span={4} offset={2}>
                <AvatarPart fetchProfile={fetchProfile} image={userInfo.profile_image} />
                <span className={styles.name}>{userInfo.name}</span>
              </Col>
              <Col className={styles.contact} span={12} offset={1}>
                <Row>
                  <span className={styles.labelContact}>Email: </span>
                  <span className={styles.text}> {userInfo.email}</span>
                </Row>
                <Row>
                  <span className={styles.labelContact}>Số điện thoại: </span>
                  <span className={styles.text}>  {userInfo.phone}</span>
                </Row>
              </Col>
              {/* <Col className={styles.avatarWrap} span={2} offset={2}>
                <Button className={styles.btn} onClick={handleClick}>
                  支払い
                </Button>
              </Col> */}
            </Row> : <h5>Loading</h5>}

            <Divider />

            {/* <Row>
              <Col span={22} offset={2}>
                <p className={styles.label}>最近のテストのリスト</p>
              </Col>
            </Row>

            <Row>
           
              <Item/>
            </Row> */}

            <Divider />

            <Row>
              <Col span={22} offset={2}>
                <p className={styles.label}>Danh sách sách yêu thích</p>
              </Col>
            </Row>
            <div className={styles.favoritesBook}>
                {favoriteBooks()}
            </div>

            
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Profile;
