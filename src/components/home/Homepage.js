import {Button, Col, Divider, Layout, Menu, Pagination, Row, Select, Input, Card, notification} from "antd";
import {
    ContainerOutlined,
    DesktopOutlined, HeartFilled,
    PieChartOutlined,
} from '@ant-design/icons';
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import {API_PATHS, BOOK_API_PATH} from "../../config/api-paths";
import axios from "axios";
import { generatePath, useNavigate } from "react-router-dom";
import { PATHS } from "../../config/paths";
import { useAuth } from "../../hooks/useAuth"
import Meta from "antd/es/card/Meta";
import { getStorage, ref } from "firebase/storage";

const { Header, Sider, Content } = Layout;

const BookItem = ({book}) => {
  const navigate = useNavigate();
    const [user,token,isAuth] = useAuth()
    const config = {
        headers: {
            'content-type': 'application/json',
            'authorization': 'Bearer ' + token,
        }
    }
  const routeChange = (bookId) => {
    const path = generatePath(PATHS.bookDetails, { bookId });
    navigate(path);
  };
  const addToFavorite =async () =>{
    const body = {
        book_id: book.id
    }

    try
    {
        const {data} = await  axios.post(API_PATHS.favorite,body,config)
        openNotification()
    }catch (e) {
        console.log(e)
    }
  }
    const openNotification = () => {
        notification.info({
            message: `Add To Favorite`,
            description:"Add success",
            placement:"bottomLeft",
        });
    };
  return (
    <Col className={styles.bookItem} span={5}>
      <div className={styles.bookImg} onClick={
          () => {
            routeChange(book.id);
          }
      }>
        <Card
            hoverable
            style={{
                width: 240,
            }}
            cover={<img alt="example" src={book.image_url} height='300px'/>}
        >
            <Meta style={{
              fontWeight:'bold',
              height: '80px',
            }} 
              title={<div style={{ width: '180px', wordWrap: 'break-word', whiteSpace: 'break-spaces', textAlign: 'center' }}>{book.name}</div>}
            />
        </Card>

      </div>
      <HeartFilled onClick={addToFavorite} style={{fontSize:'30px'}} className={styles.favorites}/>
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
    getItem('HomePage', '1', <PieChartOutlined />, PATHS.home),
    getItem('Profile', '2', <DesktopOutlined />, PATHS.profile),
    getItem('Compare Books', '3', <ContainerOutlined />, PATHS.compare),
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
          {user.length >= 25 &&
              <span className={styles.username}>Xin chào {user.slice(0,25)}...</span>
          }
          {user.length < 25 &&
              <span className={styles.username}>Xin chào {user}</span>
          }
          <Button type="primary" className={styles.logoutButton} onClick={() => handleSignout()}>Đăng xuất</Button>
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
            <span className={styles.title}>Danh sách Sách</span>
          </div>
          <Input style={{ width: 150, marginRight: 10 }} placeholder="Tên sách" value={text} onChange={ (e) => {
            setText(e.target.value)
          }}/>
          <Select
            style={{ width: 150, paddingRight: 10 }}
            onChange={ (value) => setLevel(value)}
            placeholder="Trình độ"
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
            style={{ width: 150, paddingRight: 10 }}
            onChange={(value) => {setCategory(value)}}
            placeholder="Kỹ năng"
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
          <Input style={{ width: 150, marginRight: 10 }} placeholder="Giá thấp nhất" value={minPrice} onChange={ (e) => setminPrice(e.target.value)}/>
          <Input style={{ width: 150, marginRight: 10 }} placeholder="Giá cao nhất" value={maxPrice} onChange={ (e) => setmaxPrice(e.target.value)}/>
          <Button type="primary" onClick={() => {
            getBooks(0, 8, level, category, text, minPrice, maxPrice)
          }}>Lọc</Button>
          <Row className={styles.listBooks} gutter={20}>
            {
              books.length !== 0 ? books.map((book,idx) => <BookItem key={idx} book={book} />) : <span className={styles.notFound}>見つかりません</span>
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
