import React, {useEffect, useRef, useState} from 'react';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Form, message, notification, Upload} from 'antd';
import axios from 'axios';
import {API_PATHS} from '../../../config/api-paths';
import {useAuth} from '../../../hooks/useAuth';
import {Input} from "antd/es";

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};
const UserProfile = ({fetchProfile,setAvatar}) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [user, token, isAuth] = useAuth()
    const image = useRef()
    const config = {
        headers: {
            'content-type': 'application/json',
            'authorization': 'Bearer ' + token,
        }
    }

    const handleChange = async (info) => {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (url) => {
            setLoading(false);
            setImageUrl(url);
            setAvatar(url)
        });
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    const customRequest = async ({file, onSuccess}) => {
        console.log(imageUrl)
        const body = {
            image_url: imageUrl,
            phone: ""
        }

        console.log(body)
        const {data} = await axios.post(API_PATHS.updateProfile, body, config)
        onSuccess(data.message)

    }
    const handleUpdate = async (values) => {
        const body = {
            image_url: imageUrl,
            phone: values.phone,
            email:values.email
        }
        console.log(body)
        const {data} = await axios.post(API_PATHS.updateProfile, body, config)
        console.log(data)
        fetchProfile()
       openNotification()
    }

    const openNotification = () => {
        notification.info({
            message: `Notification`,
            description:"Update suceess",
            placement:"bottomLeft",
        });
    };
    return (
        <div>
            <Form
                onFinish={handleUpdate}
            >
                <Form.Item
                    name="phone"
                    label="Phone"
                    rules={[
                        {
                            required: false,
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: false,
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="profile"
                    label="Profile"
                    rules={[
                        {
                            required: false,
                        },
                    ]}
                >
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="avatar"
                                style={{
                                    width: '100%',
                                }}
                            />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                </Form.Item>
                            <Form.Item

                            >
                            <Button type="primary" htmlType="submit">
                            Submit
                            </Button>
                            </Form.Item>
            </Form>

        </div>

    );
};
export default UserProfile;