import { Button, Rate } from "antd";
import React from "react";
import styles from "./styles.module.scss";

function Item() {
  return (
    <div className={styles.container}>
      <div className={styles.img}>
        <img src="./login/avatarDefault.jpg" />
      </div>

      <Rate value={4} disabled className={styles.rate} />
      <Button className={styles.btn} type="primary">
        詳細
      </Button>
    </div>
  );
}

export default Item;
