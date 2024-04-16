import React, { useState, useEffect, useReducer } from 'react';

import classNames from 'classnames/bind';
import style from './Comment.module.scss';

import io from "socket.io-client";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import avatar from '~/assets/imgs/avatar_default.jpg'
import { HttpGet, HttpPost } from '~/pages/API/useAuth/auth.api';
import { toast } from 'react-toastify';
import moment from 'moment';
import useAuthStore from '~/hooks/useAuthStore';
const cx = classNames.bind(style);
function Comment({id}) {
    const user = useAuthStore((state) => state.user);
    console.log("check user",user)
    const [socket,setSocket] = useState(null)
    const [message,setMessage] = useState("")
    const [listComment,setListComment] = useState([])
    const callApi = async()=>{
        console.log('check id',id)

        const rs = await HttpGet(`/comment/get/?id=${id}`);
        if(rs.status == 200){
            setListComment(rs.data.data);
        }
    }
    useEffect(() => {
        callApi()
        console.log("daa chay den new Socket");
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket)
      
        return () => {
            newSocket.disconnect();
        };
        
      }, []);
      useEffect(()=>{
        callApi()
      },[id])
    useEffect(()=>{
        if(socket){
            socket.on('get_mess',(res)=>{
                setListComment((prev)=>[...prev,res])
            })
        }
    },[socket])
    const handleSendComment = async()=>{
        console.log("check commit",message)
        let data = {
            content:message,
            productId:id
        }
        console.log('dataaa',data)
        const rs = await HttpPost(`/comment/create`,data)
        if(rs.status ==200){
            toast.success("comment successfully")
            if(socket){
                socket.emit("send_message",rs.data.data)
            }
        }else{
            toast.err("comment unsuccessfully")

        }
       
    }
    console.log("check list",listComment)
    return (
        <div className={cx('comment_wrap')}>
        <h2>Some comment</h2>
        <div className={cx('send_comment')}>
            <img className={cx('avatar1')} src={avatar}/>
            <div className={cx('input_wrap')}>
                <input onChange={e=>{setMessage(e.target.value)}} className={cx('input')} placeholder='Enter your comment...'/>
            </div>
                <div  className={cx('action')} onClick={handleSendComment}>
                    <SendIcon/>
                </div>
        </div>
        {listComment.length > 0 ? listComment.map((item,index)=>{
            return   <div className={cx('comment')} key={index}>
                        <img className={cx('avatar')} src={avatar}/>
                        <div className={cx('right')}>
                            {item.user_Id._id===user.data.id ?
                                 <h4 className={cx('active')}>Me<span className={cx('time')}>{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span></h4>:
                                 <h4 className={cx('author')}>{item.user_Id.fullName} <span className={cx('time')}>{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span></h4>
                        }
                            <p className={cx('content')}>{item.content}</p>
                            <div className={cx('action')}>
                            <FavoriteBorderIcon/>
                            <span className={cx('num')}>{item.likes}</span>
                            </div>
                        </div>
                  </div>
        }) : ""}
    </div>
    )
}

export default Comment;
