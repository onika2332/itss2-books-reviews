import { Button, Image, Modal, Space } from 'antd';
import React, { useState } from 'react';
import UserProfile from './UserProfile';
import styles from "./styles.module.scss";
const AvatarPart = ({fetchProfile,image}) => {
  const [avatar, setAvatar] = useState(image);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (e) => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div>
        <Space size={12}>
          <Image
            style={{ width: 200, height: 200, borderRadius: 200 / 2, paddingTop:20 }}
            src={avatar}
            placeholder={
              <Image
                preview={true}
                src={avatar}
                width={200}
              />
            }
          />
        </Space>

        <div style={{'textAlign': 'right'}} >
          <img onClick={showModal} src={process.env.PUBLIC_URL + '/login/upload.png'} alt="Legend" style={{'width': '10%', 'height':'10%'}} />
        </div>
      </div>

      <Modal title="Upload Avatar" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <UserProfile fetchProfile={fetchProfile} setAvatar={setAvatar} />
      </Modal>
    </>
  );
};
export default AvatarPart;