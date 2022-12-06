import React, { useState } from 'react';
import { Col, Row } from 'antd';
import { Button, Tooltip, Modal } from 'antd';
import { Image, Avatar } from 'antd';
import { Rate } from 'antd';
import { Tag , Card  } from 'antd';
import { LeftOutlined, UserOutlined, HeartOutlined, HeartFilled, StarFilled } from '@ant-design/icons';
import styles from "./styles.module.scss";

const rate = [1,2,3,4,5];
function BookDetails() {
    const [rating] = useState(3);
    const [isRatingModelOpen, setIsRatingModalOpen] = useState(false);
    const showRatingModal = () => {
        setIsRatingModalOpen(true);
    };
    const handleRating = () => {
        setIsRatingModalOpen(false);
    };
    const handleRatingCancel = () => {
        setIsRatingModalOpen(false);
      };
    return (
        <Row  className={styles.container}>
            <Col span={18}>
                <Tooltip title="戻る">
                    <Button type="primary" shape="circle" icon={<LeftOutlined />} />
                </Tooltip>
                <div className='bookDetails'>
                    <Row style={{ paddingTop: '10px'}}>
                        <Col span={8} style={{ paddingRight: '10px'}}>
                            <Image
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            />
                        </Col>
                        <Col span={14}>
                            <h1 className={styles.bookName}>耳から覚える N3 語彙</h1>
                            <Rate allowHalf value={rating} />
                            {rating ? <span className={styles.ratingNumber}>{rate[rating - 1]}</span> : ''}
                            <div style={{marginTop: '25px'}}>
                                <Tag>Tag 1</Tag>
                                <Tag>Tag 2</Tag>
                                <Tag>Tag 3</Tag>
                            </div>
                            <div style={{marginTop: '10px'}}>
                                <h1>100.000</h1>
                            </div>
                            <Button shape="circle" icon={<HeartOutlined />} />
                            <Button shape="circle" icon={<HeartFilled />} />
                            <br/>
                            {/* disable if user already rate */}
                            <Button type="primary" style={{marginTop: '10px'}} onClick={showRatingModal}>レート</Button>
                            <Modal title="レート" open={isRatingModelOpen} onOk={handleRating} onCancel={handleRatingCancel}>
                                {/* user rate here */}
                                <Rate allowHalf value={rating} />
                            </Modal>
                        </Col>
                    </Row>
                    <Card className={styles.details}>
                        偉コタチ年95馬はどスょ年季フモセ部広謙レへリト遅上ノスク星24昌近声ワユ対年サラヒフ靴運童育川のちにご。順エ仲取べひ前分かげざょ百18認とろご驚枠ユケナリ負要れ賞型こクト任形らか約朝県キテミモ目兵リし息手ゃり関雇領ぶぱ。新覧地たぜ星込フ憲遅モナ沖神ハエ将速ある判投ソウネ時需今っめこは宗機ヲテヤ田可ヤキニセ震夏島テヤシ済順稲ラつせへ。
                    </Card>
                </div>
                <div className='Comment'>
                    <h2 className={styles.commentTitle}>コメント</h2>
                    <div className={styles.listComment}>
                        <Card className={styles.listCommentItem}>
                            <Row>
                                <Col span={4}>
                                    <Avatar size="large" icon={<UserOutlined />} />
                                </Col>
                                <Col span={20}>
                                    <h3>Nguyen Minh Hieu</h3>
                                    <p> This is a very nice book</p>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </div>
            </Col>
            <Col span={6}>
                <h3 className={styles.relatedBooksTitle}> 付属の本 </h3>
                <div className="site-card-border-less-wrapper">
                    <Card bordered={false} className={styles.relatedBook}>
                        <Image
                            width={100}
                            height={100}
                            className={styles.relatedBookImage}
                            src="error"
                            fallback="data:image/png;base64,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"
                        />
                        <br/>
                        <span>耳から覚える　N3 文法</span>
                        <StarFilled style={{color: '#FFFF00'}}/>
                        <span style={{ marginLeft: '5px'}}> 4.1 </span>
                    </Card>
                </div>
            </Col>
        </Row>
    )
}

export default BookDetails