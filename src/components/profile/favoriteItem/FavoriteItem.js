import {Card, Col, Rate} from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
const { Meta } = Card;
function FavoriteItem({book}) {

  const navigate = useNavigate();
  const rate = () => {
    return Math.round((book.star / book.rate_times))
  }
  const handleClick = ()=> {
    navigate(`/book-details/${book.id}`)
  }
  const bookDescription = () => {
      return (<p>
                <span>{book.author}</span>
                <span> - </span>
                <span>レベル: <b>{book.level}</b></span>
          <p>{book.category}</p>
          <Rate value={rate()} disabled />
      </p>)
  }
  return (
      <Card className={styles.favoriteItem}
          hoverable
          style={{
              width: 250,
          }}
          cover={<img alt="example" style={{height: 350}} src={book.image_url}/>}
          onClick={handleClick}
      >
          <Meta title={book.name} description={bookDescription()} />
      </Card>
    // <div className={styles.container}>
    //   <Col span={4} offset={3}>
    //     <div className={styles.img}>
    //       <img src={book.image_url} />
    //     </div>
    //   </Col>
    //
    //   <Col span={13} offset={1} className={styles.content}>
    //     <p style={{'fontSize':'18px','fontWeight':'bolder'}}>{book.name}</p>
    //     <div>
    //       <span>{book.author}</span>
    //       <span> - </span>
    //       <span>レベル: <b>{book.level}</b></span>
    //     </div>
    //     <p>{book.category}</p>
    //     <Rate value={rate()} disabled />
    //   </Col>
    // </div>
  );
}

export default FavoriteItem;
