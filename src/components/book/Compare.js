import { React, useState, useEffect } from 'react';
import { Layout, Menu } from "antd";
import {
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { createSearchParams, useNavigate } from "react-router-dom";
import { PATHS } from "../../config/paths";
import { Select, Button } from 'antd';
import axios from "axios";
import { BOOK_API_PATH } from "../../config/api-paths";

const { Header, Sider, Content } = Layout;
function Compare() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [books,setBooks] = useState([]);
  const [book1, setBook1] = useState();
  const [book2, setBook2] = useState();
  useEffect(() => {
    getBooks(0, 25)
  },[])

  const getBooks = async (page, size, level, category, text, minPrice, maxPrice ) => {
    await axios.get(BOOK_API_PATH.book, { 
      params:{
        page: page,
        size: size,
        level: level,
        category: category,
        text: text,
        minPrice: minPrice,
        maxPrice: maxPrice,
      }
    })
        .then(data => data.data)
        .then(data => {
          let list_option = []
          for (const item of data.books) {
            list_option.push({
              label: item.name,
              value: item.id
            })
          }
          setBooks(list_option)
        })
        .catch(err => console.log(err))
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
    getItem('ホームページ', '1', <PieChartOutlined />, PATHS.home),
    getItem('プロファイル', '2', <DesktopOutlined />, PATHS.home),
    getItem('二つの本を比べる', '3', <ContainerOutlined />, PATHS.compare),
    getItem('模擬試験', '4', <ContainerOutlined />, PATHS.home),
  ]

  

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />
        <Menu theme="dark" defaultSelectedKeys={['3']} mode="inline" items={items} onSelect={(item) => {
          navigate(item.item.props.url)
        }} />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content
          className="site-layout-background"
          style={{
            margin: "0px 16px",
            padding: "10px",
            minHeight: 280,
          }}
        >
          <Select
            style={{ width: 500 }}
            onChange={ (value) => {
                setBook1(value)
              }
            }
            placeholder="本１"
            options={books}
          />
          <Select
            style={{ width: 500 }}
            onChange={(value) => {setBook2(value)}}
            placeholder="本2"
            options={books}
          />
          <Button disabled={book1 === undefined || book2 === undefined} onClick={() => {
            navigate({
              pathname: PATHS.comparingBooks, 
              search: createSearchParams({ book1: book1, book2: book2}).toString()})
          }}>比べる</Button>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Compare