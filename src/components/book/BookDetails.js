import React, { useEffect, useState } from 'react';
import { Col, Row, Button, Tooltip, Modal, Input, Image, Avatar, Rate, Card, notification } from 'antd';
import { LeftOutlined, UserOutlined, HeartOutlined, HeartFilled, StarFilled, DeleteOutlined } from '@ant-design/icons';
import styles from "./styles.module.scss";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_PATHS, BOOK_API_PATH, COMMENT_API_PATH } from '../../config/api-paths';
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../config/paths";
import { useAuth } from "../../hooks/useAuth"
import CustomComment from "../comment/CustomComment";
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../../firebase/firebase';
function BookDetails() {

  const navigate = useNavigate();
  const { TextArea } = Input;
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(null);
  const [isRated, setIsRated] = useState(null);
  const [rateInput, setRateInput] = useState(null);
  const [commentContent, setCommentContent] = useState(null);
  const [isRatingModelOpen, setIsRatingModalOpen] = useState(false);
  const [book, setBook] = useState(null)
  const [relatedBook, setRelatedBook] = useState([])
  const [comments, setComments] = useState([])
  const [user, token, isAuth] = useAuth()
  const [isFavorite, setIsFavorite] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  let { bookId } = useParams();
  const [isFavorited, setIsFavorited] = useState(false);
  const rate = [1, 2, 3, 4, 5]
  const config = {
    headers: {
      'content-type': 'application/json',
      'authorization': 'Bearer ' + token,
    }

  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    await fetchBook()
    await fetchComment()
    await fetchIsRated()
    await fetUserProfile()
    //checkIsFavorited()

  }
  const fetchImage = async (folderRef) => {
    const { items } = await listAll(folderRef)

    items.forEach(async (item) => {
      const data = await getDownloadURL(item)
      console.log(data);
      setImages(images => [...images, data])
    })

    setLoading(false)


  }
  const showRatingModal = () => {
    setIsRatingModalOpen(true);
  };

  const setFavorite = async () => {
    setIsFavorite(true);
    await axios.post(API_PATHS.favorite, bookId, config)
      .then(() => {
        fetchBook()
        fetchIsRated()
        fetchComment()
        fetUserProfile()
      })

      openNotification("bottomLeft")
  }
  const openNotification = (placement) => {
    notification.info({
      message: `お知らせ`,
      description:
        '気になる本のリストに追加しました。',
      placement,
    });
  }
  const handleRating = async () => {
    const params = {
      "book-id": bookId,
      "content": commentContent,
      "star": rateInput
    };
    await axios.post(COMMENT_API_PATH.comment, params, config)
      .then(() => {
        fetchBook()
        fetchIsRated()
        fetchComment()

      })
    setIsRatingModalOpen(false);
  };
  const handleRatingCancel = () => {
    setIsRatingModalOpen(false);
  };

  const fetchBook = async () => {
    const { data } = await axios.get(BOOK_API_PATH.book + "?id=" + bookId)
    console.log(data);
    setBook(data.books[0])
    if (data.books[0].rate_times !== 0)
      setRating(Math.round((data.books[0].star / data.books[0].rate_times)))
    else setRating(0)
    fetchRelatedBook(data.books[0].category);

    let url = `uploads/books/previews/${data.books[0].name}/`;
    const gsReference = ref(storage, url);
    await fetchImage(gsReference)

  }
  console.log(images);
  const fetchComment = async () => {
    await axios.get(COMMENT_API_PATH.comment + "?bookId=" + bookId)
      .then(data => data.data)
      .then(data => {
        setComments(data.comments)
      })
      .catch(err => console.log(err))

  }
  const fetchRelatedBook = async (category) => {
    await axios.get(BOOK_API_PATH.book + "?category=" + category)
      .then(data => data.data)
      .then(data => {
        setRelatedBook(data.books)
      })
      .catch(err => console.log(err))

  }
  const fetchIsRated = async () => {
    await axios.get(BOOK_API_PATH.rated + "?bookId=" + bookId, config)
      .then(data => data.data)
      .then(data => {
        setIsRated(data)
      })
  }

  const fetUserProfile = async () => {
    const { data } = await axios.get(API_PATHS.profile, config)
    setUserProfile(data['user-info']);
    setFavoriteBooks(data.favorite_books);
    console.log(data);
    data.favorite_books.forEach(favoriteItem => {
      console.log(favoriteItem, bookId);

      if (favoriteItem.id === parseInt(bookId)) {
        console.log("Oke");
        setIsFavorited(true)
        return;
      };
    });
  }

  // const checkIsFavorited = () => {

  //   favoriteBooks.forEach(favoriteItem => {
  //     if(favoriteItem.id === bookId) {
  //         setIsFavorited(true)

  //         return;
  //     };
  //   });
  // }

  const deleteComment = async (commentId) => {
    await axios.delete(`${COMMENT_API_PATH.comment}/${commentId}`, {
      headers: {
        'content-type': 'application/json',
        'authorization': 'Bearer ' + token,
      },
    })
      .then(() =>
        fetchComment()
      )
  }
  console.log(images);
  return (
    <>{!loading ? <Row className={styles.container}>
      {book !== null ? <Col span={18}>
        <Tooltip title="戻る">
          <Button type="primary" shape="circle" icon={<LeftOutlined />} onClick={() => { navigate(PATHS.home); }} />
        </Tooltip>
        <div className='bookDetails'>
          <Row style={{ paddingTop: '10px' }}>
            <Col span={8} style={{ paddingRight: '10px' }}>
              <Image
                src={book.image_url !== null ? book.image_url : "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}
              />
              <div style={{ padding: '10px' }}>
                <Image.PreviewGroup>
                  <Image width={100}
                  style={{ padding: '5px' }}
                   src={images[0]} />
                  <Image
                  style={{ padding: '5px' }}
                    width={100}
                    src={images[1]}
                  />
                </Image.PreviewGroup>
                <img
                  onClick={() => setOpen(true)}
                  width={100}
                  style={{ padding: '5px' }}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL8AW9Ph1P2j8Ibr2vhsiuwo9NRSuPle2I9Hm_Zp8N0Q&s"
                />

                <Modal
                  title="読んでみる"
                  centered
                  open={open}
                  onOk={() => setOpen(false)}
                  onCancel={() => setOpen(false)}
                  width={1000}
                >
                  <Image.PreviewGroup>
                    {images.map((image, idx) =>{
                      console.log(image);
                      return  (<Image
                      width={100}
                      src={image}
                    />)
                    })}
                  </Image.PreviewGroup>

                </Modal>

              </div>
            </Col>
            <Col span={14}>
              <h1 className={styles.bookName}>{book.name}</h1>
              <Rate allowHalf value={rating} disabled />
              {rating ? <span className={styles.ratingNumber}>{rate[rating - 1]}</span> : ''}
              <p>
                <span>{book.rate_times} rated</span>
              </p>
              <div style={{ marginTop: '10px' }}>
                <h1>{book.price} 円</h1>
              </div>
              {/* {isFavorite ? <HeartOutlined /> : <HeartFilled />} */}
              {!isFavorited ? <Button onClick={setFavorite} shape="circle" icon={<HeartOutlined />} /> : <Button shape="circle" icon={<HeartFilled />} />}
              {/* { !isFavorited ? <Button shape="circle" icon={<HeartFilled />} /> : ''} */}
              {/* <Button shape="circle" icon={<HeartFilled />} /> */}
              <br />
              {/* disable if user already rate */}
              <Button type="primary" style={{ marginTop: '10px' }} onClick={showRatingModal} disabled={isRated}>レーティング</Button>
              <Modal title="レーティング" open={isRatingModelOpen} onOk={handleRating} onCancel={handleRatingCancel}>
                {/* user rate here */}
                <div style={{ 'padding': '5px' }}>
                  <label>Star:</label><br />
                  <Rate value={rateInput} onChange={(e) => setRateInput(e)} />
                </div>
                <label>Comment:</label>
                <TextArea value={commentContent} onChange={(e) => setCommentContent(e.target.value)}></TextArea>
              </Modal>
            </Col>
          </Row>
          <Card className={styles.details}>
            <p>{book.description}</p>
          </Card>
        </div>
        <div className='Comment'>
          <h2 className={styles.commentTitle}>コメント</h2>
          {/*<TextArea rows={4} className={styles.inputComment} placeholder="コメントを入力してください" value={commentInput} onChange={(e) => setCommentInput(e.target.value)} />*/}
          {/*<Button type="primary" className={styles.commentSubmit} onClick={postComment}>コメント</Button>*/}
          <div className={styles.listComment}>
            {comments.map((comment, idx) => <Card key={idx} className={styles.listCommentItem}>
              <Row>
                <CustomComment commentProp={comment} />
              </Row>
            </Card>)}
          </div>
        </div>
      </Col> : <h1>読み込んでいます...</h1>}
      <Col span={6}>
        <h3 className={styles.relatedBooksTitle}> 付属の本 </h3>
        <div className="site-card-border-less-wrapper">
          {relatedBook.length !== 0 ? relatedBook.map((book, idex) => <Card key={idex} bordered={false} className={styles.relatedBook}>
            <Image
              width={100}
              height={100}
              className={styles.relatedBookImage}
              src="error"
              fallback={book.image_url !== null ? book.image_url : "data:image/png;base64,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"}
            />
            <br />
            <span>{book.name}</span><br></br>
            <StarFilled style={{ color: '#FFFF00', paddingLeft: '60px' }} />
            {book.rate_times === 0 &&
              <span style={{ marginLeft: '5px' }}>    0</span>
            }
            {book.rate_times !== 0 &&
              <span style={{ marginLeft: '5px' }}> {Math.round((book.star / book.rate_times))} </span>
            }
          </Card>) : <h1>付属の本がない</h1>
          }
        </div>
      </Col>
    </Row> : <h1>Loading </h1>}</>

  )
}

export default BookDetails