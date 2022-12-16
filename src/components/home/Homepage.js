import { Button, Col, Divider, Layout, Menu, Pagination, Row } from "antd";
import styles from "./styles.module.scss";
import { getBooks } from "../book/service";
import { data } from "flickity";
import { useEffect, useState } from "react";
import { BOOK_API_PATH } from "../../config/api-paths";
import axios from "axios";
const { Header, Sider, Content } = Layout;

const BookItem = ({book}) => {
  console.log(book);
  return (
    <Col className={styles.bookItem} span={5}>
      <div className={styles.bookImg}>
        <img
          src={book.image_url!=null ? book.image_url :"https://vn-test-11.slatic.net/p/538a805a2f6398b432767118af9ccb66.jpg"}
          alt="book-item"
        ></img>
      </div>
      <Divider />
      <span>{book.name}</span>
    </Col>
  );
};

function Homepage() {
  const [books,setBooks] = useState([]);

  useEffect(() => {
    getBooks()
  },[])

  const getBooks =async (filter) => {
    await axios.get(BOOK_API_PATH.book)
        .then(data => data.data)
        .then(data => {
          setBooks(data.books)
        })
        .catch(err => console.log(err))
  }
 
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        style={{ width: 256, minWidth: 200, minHeight: "100vh" }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              label: "nav 1",
            },
            {
              key: "2",
              label: "nav 2",
            },
            {
              key: "3",
              label: "nav 3",
            },
          ]}
          style={{ width: 256, "min-width": 200, minHeight: "100vh" }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 50,
            minHeight: 280,
          }}
        >
          <div className={styles.intro}>
            <span className={styles.title}>本一覧</span>
            <span className={styles.content}>ホーム、本一覧</span>
          </div>
          <Button className={styles.btnFilter}>Filter</Button>
          {/* <Slider /> */}
          <p>Here, list of book</p>
          <Row className={styles.listBooks} gutter={20}>
            {
              books.length !=0 ? books.map(book => <BookItem book={book}/>) : <h1>Loading...</h1>
            }
          </Row>
          <Pagination
            className={styles.pagination}
            defaultCurrent={1}
            showQuickJumper
            pageSize={8}
            total={50}
            onChange={(page, pageSize) => {
              console.log(page, pageSize);
            }}
          />
        </Content>
      </Layout>
    </Layout>
  );
}
export default Homepage;
