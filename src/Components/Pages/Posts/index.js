import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Wait from "../../common/Wait";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [totalpages, setTotalPages] = useState(0)
    const [currentPage, setcurrentPage] = useState(1)
    useEffect(() => {
        let url = `${process.env.REACT_APP_API_ROOT}/posts?lang=ar&per_page=16&page=${currentPage}`;
        axios.get(url).then((res) => {
            const { data, headers } = res;
            setTotalPages(headers['x-wp-totalpages'])
            setPosts(data)
        })
    }, [currentPage])
    return (
        <>
            <div className="w-4/5 py-10 m-auto flex justify-center items-center  align-middle flex-wrap gap-10">
                {
                    Object.keys(posts).length ? posts.map((post) => {
                        return (
                            <div key={post.id} className="card p-3 w-[330px] shadow-lg rounded-lg flex gab-5 flex-col">
                                <Link to={`/post/${post.id}`}>
                                    <img src={post.jetpack_featured_media_url} alt={post.title.rendered} className="w-61  h-41" />
                                    <h2 className="text-lg font-blod text-sky-400">{post.title.rendered}  </h2>
                                    <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                                </Link>
                            </div>
                        )
                    }) : (<Wait />)
                }
            </div>
            {/* pagination */}

            {
                Object.keys(posts).length > 0 && (
                    <div className="fixed bottom-0 w-full py-5 mx-auto flex justify-center items-center flex-wrap gap-10">
                        <div class="inline-block bg-white border border-solid border-white p-3 rounded-lg shadow-lg  flex justify-between items-center">
                            <button className=" but-primary inline-block px-7 py-3 m-3 
                        bg-blue-600 text-white font-medium text-sm leading-snug
                        uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg 
                        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 
                        active:bg-blue-800 active:shadow-lg transition duration-150 
                        ease-in-out w-50 disabled:bg-blue-500 disabled:text-slate-100 
                        disabled:opacity-50"
                                disabled={currentPage === 1}
                                onClick={() => setcurrentPage(currentPage - 1)}
                            >Previous</button>
                            <span className="text-lg font-bold">{currentPage} of {totalpages} </span>
                            <button className="but-primary inline-block px-7 py-3 bg-blue-600 
                        text-white font-medium text-sm leading-snug uppercase rounded shadow-md 
                        hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg
                        focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg
                        transition duration-150 ease-in-out w-50 disabled:bg-blue-500 m-3
                        disabled:text-slate-100 disabled:opacity-50"
                                disabled={currentPage == totalpages}
                                onClick={() => setcurrentPage(currentPage + 1)}
                            >Next</button>
                        </div>
                    </div>
                )
            }

        </>
    )
}

export default Posts;