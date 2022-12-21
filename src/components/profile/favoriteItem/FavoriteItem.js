import { Col, Rate } from "antd";
import React from "react";
import styles from "./styles.module.scss";

function FavoriteItem() {
  return (
    <div className={styles.container}>
      <Col span={4} offset={3}>
        <div className={styles.img}>
          <img src="./login/avatarDefault.jpg" />
        </div>
      </Col>

      <Col span={13} offset={1} className={styles.content}>
        <p>耳から覚える日本語能力試験N3</p>
        <div>
          <span>Tankobon Hardcover</span>
          <span> - </span>
          <span>March 1, 2010</span>
        </div>
        <p>by Sasaki Hitoko, Matsumoto Noriko</p>
        <Rate value={4} disabled />
      </Col>
    </div>
  );
}

export default FavoriteItem;
