import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserComponentStyle.css";
import { GetAllUser, GetPosts } from "../apis/apiCall";

export default function UserLists() {
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])
    const [postCountByUser, setPostCountByUser] = useState({});
    useEffect(() => {
        Promise.all([GetAllUser(), GetPosts()])
            .then(([usersRes, postsRes]) => {
                setUsers(usersRes.data);
                setPosts(postsRes.data);
                const countByUser = {};
                postsRes.data.forEach((post) => {
                    const userId = post.userId;
                    const user = usersRes.data.find((u) => u.id === userId);
                    if (user) {
                        countByUser[user.id] = (countByUser[user.id] || 0) + 1;
                    }
                });

                setPostCountByUser(countByUser);
            })
            .catch((err) => { });

    }, [])
    return (
        <>
            <div className="flex items-center justify-center p-2 md:p-12">
                <div className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 md:p-10 border border-gray-300">
                    <div className="text-center">
                        <div>
                            <p className="text-24 font-semibold">
                                Directory
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 items-center mt-5">
                        <div className="col-span-12">
                            <div className="mt-4 hidden lg:block">
                                <ul className="responsive-table">
                                    {
                                        users.map((res, i) => {
                                            return (
                                                <li key={i}
                                                    className="table-row alternate-bg space-x-5 border border-black rounded-xl mb-3 items-center">
                                                    <Link to={`/user/details?id=${res.id}`} className="w-full flex items-center h-[60px]">
                                                        <div className="col col-1 text-16 font-normal">
                                                            <span>Name:</span>
                                                            <span title={res.name}>&nbsp;{res.name}</span>
                                                        </div>
                                                        <div className="col col-2 text-16 font-normal text-end">
                                                            <span>Post: {postCountByUser[res.id] || 0}</span>
                                                        </div>
                                                    </Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>

                            <div className="block lg:hidden mt-7">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {users.map((res, i) => (
                                        <React.Fragment key={i}>
                                            <div className="w-full bg-sky-blue border border-black rounded-lg p-4 items-center">
                                                <div className="grid grid-cols-1 flex justify-between items-center mb-2">
                                                    <div>
                                                        <div>
                                                            Name:
                                                            <span className="ml-3" title={res.name}>{res.name}</span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3">
                                                        <div>
                                                            Post:
                                                            <span className="ml-3" >{postCountByUser[res.id] || 0}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}