import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar, Comment, Rate, Tooltip } from 'antd';
import React, { createElement, useEffect, useState } from 'react';
import { useAuth } from "../../hooks/useAuth";
import axios from 'axios'
import { API_PATHS, COMMENT_API_PATH } from "../../config/api-paths";

const CustomComment = ({ commentProp }) => {
    const [likes, setLikes] = useState(commentProp.like);
    const [dislikes, setDislikes] = useState(commentProp.dislike);
    const [action, setAction] = useState(null);
    const [user, token, isAuth] = useAuth()
    const [comment, setComment] = useState(commentProp)
    const [liked, setLiked] = useState(false)
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
        </Tooltip>
    ];
    return (
        <Comment
            actions={actions}
            author={<div><a>{comment.created_by}</a>
                <span style={{ 'marginLeft': '10px' }}>{hourAgo()} hours ago</span> <br />
                <Rate style={{ 'fontSize': '15px' }} allowHalf value={comment.star} disabled />
            </div>}
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
            content={
                <p style={{ 'padding': '5px' }}>
                    {comment.content}
                </p>
            }
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