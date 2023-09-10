import axios from "axios";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Wait from "../../common/Wait";

const Post = () => {
    const [post, setPost] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        let url = `${process.env.REACT_APP_API_ROOT}/posts/${id}`;
        axios.get(url).then(res => {
            console.log('res', res);
            setPost(res.data)
        }).catch(err => {
            console.log('reeor', err.message);
        })
    }, [])
    return (
        <>
            {Object.keys(post).length ? (
                <div className="p-5">
                    <img src={post.jetpack_featured_media_url} alt={post.title.rendered} className="w-61  h-41" />
                    <h2 className="text-2xl font-blod text-sky-400">{post.title.rendered}  </h2>
                    <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                </div>
            ) : (<Wait/>)}
        </>
    )
}


export default Post