import { Button, Col, Divider, Layout, Menu, Pagination, Row, Select, Input } from "antd";
import {
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { BOOK_API_PATH } from "../../config/api-paths";
import axios from "axios";
import { generatePath, useNavigate } from "react-router-dom";
import { PATHS } from "../../config/paths";
import { useAuth } from "../../hooks/useAuth"

const { Header, Sider, Content } = Layout;

const BookItem = ({book}) => {
  const navigate = useNavigate();
  const routeChange = (bookId) => {
    const path = generatePath(PATHS.bookDetails, { bookId });
    navigate(path);
  };
  return (
    <Col className={styles.bookItem} span={5}>
      <div className={styles.bookImg} onClick={
          () => {
            routeChange(book.id);
          }
      }>
        <img
          src={book.image_url !== null ? book.image_url :"https://vn-test-11.slatic.net/p/538a805a2f6398b432767118af9ccb66.jpg"}
          alt="book-item"
        ></img>
      </div>
      <Divider />
      <span>{book.name}</span>
      {/* <span>{book.price}円 ー {book.star / book.rate_times}</span> */}
    </Col>
  );
};

function Homepage() {
  const navigate = useNavigate();
  const [books,setBooks] = useState([]);
  const [total,setTotal] = useState([]);
  const [text,setText] = useState([]);
  const [category,setCategory] = useState([]);
  const [level,setLevel] = useState([]);
  const [minPrice,setminPrice] = useState([]);
  const [maxPrice,setmaxPrice] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [user,token,isAuth] = useAuth()
  useEffect(() => {
    getBooks(0, 8)
  },[])

  const handleSignout = () => {
    localStorage.removeItem("APP_TOKEN");
    localStorage.removeItem("ACTIVE_USER");
    localStorage.removeItem("IS_AUTH");
    navigate(PATHS.topPage)
  }

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
          setBooks(data.books)
          setTotal(data.count)
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
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onSelect={(item) => {
          if (item.item.props.url === PATHS.home)
            window.location.reload(false);
          else
            navigate(item.item.props.url)
        }}/>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <span className={styles.username}>こんにちは{user}</span>
          <Button type="primary" className={styles.logoutButton} onClick={() => handleSignout()}>ログアウト</Button>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "0px 16px",
            padding: "10px",
            minHeight: 280,
          }}
        >
          <div className={styles.intro}>
            <span className={styles.title}>本一覧</span>
          </div>
          <Input style={{ width: 150 }} placeholder="テキスト" value={text} onChange={ (e) => {
            setText(e.target.value)
          }}/>
          <Select
            style={{ width: 150 }}
            onChange={ (value) => setLevel(value)}
            placeholder="レベル"
            allowClear
            options={[
              {
                value: 'N1',
                label: 'N1',
              },
              {
                value: 'N2',
                label: 'N2',
              },
              {
                value: 'N3',
                label: 'N3',
              },
              {
                value: 'N4',
                label: 'N4',
              },
              {
                value: 'N5',
                label: 'N5',
              },
            ]}
          />
          <Select
            style={{ width: 150 }}
            onChange={(value) => {setCategory(value)}}
            placeholder="スキル"
            allowClear
            options={[
              {
                value: '文法',
                label: '文法',
              },
              {
                value: '読解',
                label: '読解',
              },
              {
                value: '漢字',
                label: '漢字',
              },
              {
                value: '語彙',
                label: '語彙',
              },
              {
                value: '聴解',
                label: '聴解',
              },
            ]}
          />
          <Input style={{ width: 150 }} placeholder="最低価格" value={minPrice} onChange={ (e) => setminPrice(e.target.value)}/>
          <Input style={{ width: 150 }} placeholder="最大価格" value={maxPrice} onChange={ (e) => setmaxPrice(e.target.value)}/>
          <Button type="primary" onClick={() => {
            getBooks(0, 8, level, category, text, minPrice, maxPrice)
          }}>フィルター</Button>
          <Row className={styles.listBooks} gutter={20}>
            {
              books.length !== 0 ? books.map(book => <BookItem book={book} />) : <span className={styles.notFound}>見つかりません</span>
            }
          </Row>
          <Pagination
            className={styles.pagination}
            defaultCurrent={1}
            pageSize={8}
            total={total}
            onChange={(page, pageSize) => {
              getBooks(page-1, pageSize, level, category, text, minPrice, maxPrice)
            }}
          />
        </Content>
      </Layout>
    </Layout>
  );
}
export default Homepage;
