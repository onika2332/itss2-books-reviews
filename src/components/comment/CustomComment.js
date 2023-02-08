import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import {Avatar, Button, Comment, Rate, Tooltip} from 'antd';
import React, { createElement, useEffect, useState } from 'react';
import { useAuth } from "../../hooks/useAuth";
import axios from 'axios'
import { API_PATHS, COMMENT_API_PATH } from "../../config/api-paths";
import {Input} from "antd";
const {TextArea} = Input;

const CustomComment = ({ commentProp }) => {
    const [likes, setLikes] = useState(commentProp.like);
    const [dislikes, setDislikes] = useState(commentProp.dislike);
    const [action, setAction] = useState(null);
    const [user, token, isAuth] = useAuth()
    const [comment, setComment] = useState(commentProp)
    const [editComment, setEditComment] = useState(commentProp.content)
    const [liked, setLiked] = useState(false)
    const [isEdit,setIsEdit]= useState(false)
    const config = {
        headers: {
            'content-type': 'application/json',
            'authorization': 'Bearer ' + token,
        }
    }
    useEffect(() => {
        fetchLiked();
    }, [liked])

    const fetchLiked = async () => {
        const { data } = await axios.get(API_PATHS.likedComment + `?cmtId=${comment.id}`, config)
        if (data === "like") {
            setAction("liked")
        }
        else if (data === "dislike") {
            setAction("disliked")
        }
        else {
            setAction(null)
        }

    }
    const like = async () => {
        let body

        if (action === "liked") {
            body = {
                id: comment.id,
                type: 'unlike'
            }
            await axios.post(API_PATHS.reactComment, body, config)
        } else if (action === "disliked") {
            body = {
                id: comment.id,
                type: 'undislike'
            }
            await axios.post(API_PATHS.reactComment, body, config)

            let body2 =
            {
                id: comment.id,
                type: 'like'
            }
            await axios.post(API_PATHS.reactComment, body2, config)

        }
        else {
            body = {
                id: comment.id,
                type: 'like'
            }
            await axios.post(API_PATHS.reactComment, body, config)
        }


        const { data } = await axios.get(COMMENT_API_PATH.comment + `/${comment.id}`)

        try {
            setLikes(data.like);
            setDislikes(data.dislike);
            setComment(data);
            await fetchLiked()
        } catch (error) {
            console.log(error)
        }



    };
    const dislike = async () => {
        let body;

        if (action === "disliked") {
            body = {
                id: comment.id,
                type: 'undislike'
            }
            await axios.post(API_PATHS.reactComment, body, config)
        }else if (action === "liked")
        {
            body = {
                id: comment.id,
                type: 'unlike'
            }
            await axios.post(API_PATHS.reactComment, body, config)

            let body2 =
            {
                id: comment.id,
                type: 'dislike'
            }
            await axios.post(API_PATHS.reactComment, body2, config)
        }
         else {
            body = {
                id: comment.id,
                type: 'dislike'
            }
            await axios.post(API_PATHS.reactComment, body, config)
        }
       
        const { data } = await axios.get(COMMENT_API_PATH.comment + `/${comment.id}`)
        try {
            setLikes(data.like);
            setDislikes(data.dislike);
            setComment(data);
            setEditComment(data)
            await fetchLiked()

        } catch (error) {
            console.log(error)
        }
    };

    const hourAgo = () => {
        const now = Date.now()
        let amount = now - comment.created_at;
        let hour = amount / (1000 * 3600)
        return Math.ceil(hour)
    }
    const edit = () => {
        setIsEdit(true)
    }

    const actions = [
        <Tooltip key="comment-basic-like" >
            <span onClick={like}>
                {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                <span className="comment-action">{likes}</span>
            </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike">
            <span onClick={dislike}>
                {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
                <span className="comment-action">{dislikes}</span>
            </span>
        </Tooltip>,
        <Tooltip key="comment-basic-edit">
            <span onClick={edit}>
                <span className="comment-action">Edit</span>
            </span>
        </Tooltip>
    ];
    const handleCommentChange = (e) => {
        setEditComment(e.target.value)
    }
    const updateComment = async () => {
        const body= {
            "comment-id": comment.id,
            "content": editComment
        }

        try {
            const {data} = await axios.put(COMMENT_API_PATH.comment,body,config);
            console.log(data)
            setComment(data.comment)
            setIsEdit(false)
        }catch (e) {
            console.log(e)
        }
    }
    const onCancel = () => {
        setIsEdit(false)
    }
    const commentContent = () => {
        if(isEdit)
        {
            return  <div><TextArea
                    showCount
                    maxLength={200}
                    style={{ height: 70, resize: 'none' }}
                    onChange={handleCommentChange}
                    value={editComment}
                />
                <Button onClick={updateComment} style={{marginTop:'5px', marginRight:'5px'}} type={"primary"}>Update</Button>
                <Tooltip key="comment-basic-edit">
            <span onClick={onCancel}>
                <span className="comment-action">Cancel</span>
            </span>
                </Tooltip>

            </div>
        }else
        {
           return <p style={{ 'padding': '5px' }}>
                {comment.content}
            </p>
        }

    }
    return (
        <Comment
            actions={actions}
            author={<div><a>{comment.created_by}</a>
                <span style={{ 'marginLeft': '10px' }}>{hourAgo()} hours ago</span> <br />
                <Rate style={{ 'fontSize': '15px' }} allowHalf value={comment.star} disabled />
            </div>}
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
            content= {commentContent()}
            style={{
                'maxWidth': '50%',


            }}
        // datetime={
        //
        //     <Tooltip >
        //         <span>{hourAgo()} hours ago</span>
        //     </Tooltip>
        // }
        />
    );
};
export default CustomComment;