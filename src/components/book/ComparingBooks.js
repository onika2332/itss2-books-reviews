import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { Button, Tooltip } from 'antd';
import { Image, Avatar } from 'antd';
import { Rate } from 'antd';
import { Card  } from 'antd';
import { LeftOutlined, UserOutlined, StarFilled} from '@ant-design/icons';
import { Table } from 'antd';
import styles from "./styles.module.scss";
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { BOOK_API_PATH, COMMENT_API_PATH } from '../../config/api-paths';
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../config/paths";

function ComparingBooks() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [books,setBooks]= useState([])
    const [comments,setComments]= useState([])
    const bookId1= searchParams.get("book1")
    const bookId2= searchParams.get("book2")
    const navigate = useNavigate();

    useEffect(()=>{
        fetchData();

    }, [])

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
          title: 'Tiêu đề',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Giá',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'Thời gian học',
          dataIndex: 'time',
          key: 'time',
        },
        {
            title: 'Thể loại',
            dataIndex: 'category',
            key: 'category',
          },
      ];
    return (
        <div>
            {books.length !== 0 ?
            <div className={styles.container}>
            <Row className='Book'>
                <Col span={12}>
                    <Tooltip title="Quay lại">
                        <Button type="primary" shape="circle" icon={<LeftOutlined />} onClick={
                            () => {
                                navigate(PATHS.home);
                            }
                        }/>
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
                            <Rate value={Math.round((books[0].star / books[0].rate_times))} disabled/>
                            { books[0].rate_times === 0 &&
                                <span> 0</span>
                            }
                            { books[0].rate_times !== 0 &&
                                <span> {Math.round((books[0].star / books[0].rate_times))} </span>
                            }
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
                            <Rate value={Math.round((books[1].star / books[1].rate_times))} disabled/>
                            {/* <h3> {Math.round((books[1].star / books[1].rate_times))} </h3> */}
                            { books[1].rate_times === 0 &&
                                <span>    0</span>
                            }
                            { books[1].rate_times !== 0 &&
                                <span> {Math.round((books[1].star / books[1].rate_times))} </span>
                            }
                        </Card>
                    </div>
                </Col>
            </Row>
            <Table dataSource={dataSource} columns={columns} className={styles.CompareTable} />
            <h1 className={styles.CompareCommentTitle}>Bình luận</h1>
           {
            comments.length !== 0 ?
            <Row>
            <Col span={12}>
                <div className='Comment'>
                    <div className={styles.CompareListComment}>
                        <Card className={styles.CompareListCommentItem}>
                           {comments[0].length !== 0 ? comments[0].map((comment,index) =>
                            <Row key={index}>
                                <Col span={4}>
                                    <Avatar size="large" icon={<UserOutlined />} />
                                </Col>
                                <Col span={20}>
                                    <h3 style={{color: 'white'}}>{comment.created_by}</h3>
                                    <p> {comment.content}</p>
                                </Col>
                            </Row>): <h1> Chưa có bình luận cho sách này.</h1>}
                        </Card>
                    </div>
                </div>
            </Col>
            <Col span={12}>
                <div className='Comment'>
                    <div className={styles.CompareListComment}>
                        <Card className={styles.CompareListCommentItem}>
                            {comments[1].length !== 0 ? comments[1].map((comment,index)=>
                                <Row key={index}>
                                <Col span={4}>
                                    <Avatar size="large" icon={<UserOutlined />} />
                                </Col>
                                <Col span={20}>
                                    <h3 style={{color: 'white'}}>{comment.created_by}</h3>
                                    <p> {comment.content}</p>
                                </Col>
                            </Row>): <h1>Chưa có bình luận cho sách này.</h1>
                            }
                        </Card>
                    </div>
                </div>
            </Col>
        </Row> :
        <h1>Đang tải bình luận....</h1>
           }

        </div>: <h1>Đang tải bình luận....</h1>}
        </div>

    )
}

export default ComparingBooks

