import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { Button, Tooltip } from 'antd';
import { Image, Avatar } from 'antd';
import { Rate } from 'antd';
import { Card  } from 'antd';
import { LeftOutlined, UserOutlined} from '@ant-design/icons';
import { Table } from 'antd';
import styles from "./styles.module.scss";
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { API_PATHS, BOOK_API_PATH, COMMENT_API_PATH } from '../../config/api-paths';

function ComparingBooks() {
    const [rating] = useState(3);
    const [searchParams, setSearchParams] = useSearchParams()
    const [books,setBooks]= useState([])
    const [comments,setComments]= useState([])
    const bookId1= searchParams.get("book1")
    const bookId2= searchParams.get("book2")

    useEffect(()=>{
        fetchData();
      
    },[])

    const fetchData = async () =>
    {
        await axios.get(BOOK_API_PATH.compare+"?book1="+bookId1+"&book2="+bookId2)
        .then(data => data.data)
        .then(data => { 
             console.log(data);
             setBooks([data.book_1,data.book_2])
        }).catch(error => console.log(error))

        console.log("TO heare");
        let endpoints = [
            COMMENT_API_PATH.comment+"?bookId="+bookId1,
            COMMENT_API_PATH.comment+"?bookId="+bookId2
          ];

         axios.all(endpoints.map(async (endpoint) => await axios.get(endpoint).then(data=>data.data).then(data => data.comments))).then(
            (data) => {
                console.log(data);
                setComments(data)}
          );
    }
    
    const dataSource = books.map((book,index) => {
        return {
            key: index,
            name: book.name,
            price: book.price+" 円",
            time: book.time_to_learn + "ヶ月    ",
            category: book.category
        }
     })
      
      const columns = [
        {
          title: '本タイトル',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '値段',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: '勉強時間',
          dataIndex: 'time',
          key: 'time',
        },
        {
            title: '分類形式',
            dataIndex: 'category',
            key: 'category',
          },
      ];
    return (
        <div>
            {books.length != 0 ? 
            <div className={styles.container}>
            <Row className='Book'>
                <Col span={12}>
                    <Tooltip title="戻る">
                        <Button type="primary" shape="circle" icon={<LeftOutlined />} />
                    </Tooltip>
                    <div className="site-card-border-less-wrapper">
                        <Card bordered={false} className={styles.CompareBook}>
                            <Image
                                width={200}
                                height={200}
                                className={styles.CompareBookImage}
                                src="error"
                                fallback={books[0].image_url}
                            />
                            <br/>
                            <h2 className={styles.ComparebookTitle}>{books[0].name}</h2>
                            <Rate value={books[0].star} disabled/>
                            <h3> {books[0].star} </h3>
                        </Card>
                    </div>
                </Col>
                <Col span={12}>
                    <div className="site-card-border-less-wrapper" style={{marginTop: '32px'}}>
                        <Card bordered={false} className={styles.CompareBook}>
                            <Image
                                width={200}
                                height={200}
                                className={styles.CompareBookImage}
                                src="error"
                                fallback={books[1].image_url}
                            />
                            <br/>
                            <h2 className={styles.ComparebookTitle}>{books[1].name}</h2>
                            <Rate value={books[1].star} disabled/>
                            <h3> {books[1].star} </h3>
                        </Card>
                    </div>
                </Col>
            </Row>
            <Table dataSource={dataSource} columns={columns} className={styles.CompareTable} />;
            <h1 className={styles.CompareCommentTitle}>コメント</h1>
           {
            comments.length != 0 ? 
            <Row>
            <Col span={12}>
                <div className='Comment'>
                    <div className={styles.CompareListComment}>
                        <Card className={styles.CompareListCommentItem}>
                           {comments[0].length != 0 ? comments[0].map((comment,index) =>  
                            <Row key={index}>
                                <Col span={4}>
                                    <Avatar size="large" icon={<UserOutlined />} />
                                </Col>
                                <Col span={20}>
                                    <h3>{comment.created_by}</h3>
                                    <p> {comment.content}</p>
                                </Col>
                            </Row>): <h1> No comment available!</h1>}
                        </Card>
                    </div>
                </div>
            </Col>
            <Col span={12}>
                <div className='Comment'>
                    <div className={styles.CompareListComment}>
                        <Card className={styles.CompareListCommentItem}>
                            {comments[1].length != 0 ? comments[1].map((comment,index)=>
                                <Row key={index}>
                                <Col span={4}>
                                    <Avatar size="large" icon={<UserOutlined />} />
                                </Col>
                                <Col span={20}>
                                    <h3>{comment.created_by}</h3>
                                    <p> {comment.content}</p>
                                </Col>
                            </Row>): <h1>No comment available!</h1>
                            }
                        </Card>
                    </div>
                </div>
            </Col>
        </Row> :
        <h1>Loading comment....</h1>
           }

        </div>: <h1>Loading...</h1>}
        </div>
        
    )
}

export default ComparingBooks

