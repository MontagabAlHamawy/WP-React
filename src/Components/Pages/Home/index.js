import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Wait from "../../common/Wait";
import Posts from "../Posts";

function Home() {
  const [posts, setPosts] = useState([]);
  const [totalpages, setTotalPages] = useState(0)
  const [currentPage, setcurrentPage] = useState(1)
  useEffect(() => {
    let url = `${process.env.REACT_APP_API_ROOT}/posts?lang=ar&per_page=1&page=${currentPage}`;
    axios.get(url).then((res) => {
      const { data, headers } = res;
      setTotalPages(headers['x-wp-totalpages'])
      setPosts(data)
    })
  }, [currentPage])
  return (
    <>
      {
        Object.keys(posts).length ? posts.map((post) => {
          return (
            <div>
              <img src='https://www.mutaz-blog.net/wp-content/uploads/2023/01/banner-blog-1.png' />
              <div className="w-4/5 py-10 m-auto flex justify-center items-center  align-middle flex-wrap gap-10">
                <div key={post.id} className="card w-full flex shadow-lg rounded-lg">
                  <Link to={`/post/${post.id}`} className="flex">
                    <img src={post.jetpack_featured_media_url} alt={post.title.rendered} className="w-1/3" />
                    <div className="p-3 flex flex-col justify-center">
                      <h2 className="text-lg font-bold text-center mb-2">{post.title.rendered}</h2>
                      <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                    </div>
                  </Link>
                </div>
                <Posts className='w-full' />
              </div>
            </div>

          )
        }) : (<Wait />)
      }
    </>
  )
}

export default Home