import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  GetAllUser,
  GetCountries,
  GetPosts,
  GetTimeZone,
} from "../apis/apiCall";
import { useLocation } from "react-router-dom";

export default function UserDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("id");
  const [countries, setCountries] = useState([]);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);
  const [time, setTime] = useState("00:00:00");
  const [selectedCountry, setSelectedCountry] = useState(0);
  const [isShowPost, setIsShowPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState([]);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    GetCountries()
      .then((res) => {
        setCountries(res.data);
      })
      .catch((err) => {});

    GetAllUser()
      .then((res) => {
        const filteredUsers = res.data.filter(
          (user) => user.id === parseInt(userId, 10)
        );
        setUser(filteredUsers);
      })
      .catch((err) => {});

    GetPosts()
      .then((response) => {
        const filteredPosts = response.data.filter(
          (post) => post.userId === parseInt(userId, 10)
        );
        // console.log(filteredPosts);
        setPosts(filteredPosts);
      })
      .catch((err) => {});
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [userId]);

  function handleChane(e) {
    const selectedValue = e.target.value;
    setSelectedCountry(selectedValue);
    if (intervalId) {
      clearInterval(intervalId);
    }
    if (selectedValue!=0) {
    GetTimeZone(selectedValue)
      .then((res) => {
        // console.log(res.data);
        // const formattedTime = convertTime(res.data.datetime);
        setTime(convertTime(res.data.datetime))
        startTimer(convertTime(res.data.datetime));
      })
      .catch(() => {});
    }else{
        setTime('00:00:00')
    }
  }

  function startTimer(initialTime) {
    let currentTime = initialTime;

    const timerInterval = setInterval(() => {
      const [hours, minutes, seconds] = currentTime.split(":").map(Number);

      let newSeconds = seconds + 1;
      let newMinutes = minutes;
      let newHours = hours;

      if (newSeconds === 60) {
        newSeconds = 0;
        newMinutes += 1;
      }

      if (newMinutes === 60) {
        newMinutes = 0;
        newHours += 1;
      }

      if (newHours === 24) {
        newHours = 0;
      }

      currentTime = `${String(newHours).padStart(2, "0")}:${String(
        newMinutes
      ).padStart(2, "0")}:${String(newSeconds).padStart(2, "0")}`;

      setTime(currentTime);
    }, 1000);
    // console.log(timerInterval);
    setIntervalId(timerInterval);
  }

  function startStopTimer() {
    if(intervalId){
        clearInterval(intervalId); // Stop the timer
        setIntervalId(null)
    }else{
        startTimer(time);
    }
  }

  function convertTime(inputTimeString) {
    const date = new Date(inputTimeString);

    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  }

  function openPostModal(postData) {
    setIsShowPost(true);
    setSelectedPost(postData);
    document.body.style.overflow = "hidden";
  }

  document.addEventListener("click", function handleClickOutsideBox(event) {
    const outsideBox = document.getElementById("post-modal");
    if (outsideBox) {
      if (outsideBox.contains(event.target)) {
        setIsShowPost(false);
        document.body.style.overflow = "auto";
      } else {
        return;
      }
    }
  });
  return (
    <>
      <div className="flex items-center justify-center p-2 md:p-12">
        <div className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 md:p-10 border border-gray-300">
          <div className="grid grid-cols-12 flex justify-between items-center">
            <div className="col-span-12 md:col-span-12 lg:col-span-6 mt-1.5">
              <div className="d-flex justify-content-start mx-1">
                <div className="text-decoration-none">
                <Link to='/'><span 
                    className="bg-sky-blue cursor-pointer px-4 rounded-lg py-2 border border-black"
                    // onClick={() => {
                    //   navigate(-1);
                    // }}
                  >
                    Back
                  </span> </Link>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-12 lg:col-span-6 mt-5 lg:mt-0 md:flex gap-2 lg:gap-5 md:justify-between lg:justify-end items-center">
              <div className="lg:mt-3">
                <select
                  onChange={handleChane}
                  className="w-full text-16 border border-transparent border-b-gray-200 font-normal placeholder-gray-200 outline-none focus:outline-none focus:ring-0 focus:border-transparent focus:border-b-gray-200 pb-2 md:p-2 mt-4"
                >
                  <option value={0}>All</option>
                  {countries.map((country, i) => (
                    <option key={i} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4 md:mt-0">
                <button className="w-full flex justify-center items-center bg-navy-blue lg:mt-4 mt-0 block px-8 py-3 text-[#98B8C3] font-medium mb-0 text-16 space-x-2 hover:opacity-90">
                  <p className="text-center">{time}</p>
                </button>
              </div>
              <div>
                <div className="mt-4 md:mt-0">
                  <button onClick={startStopTimer} className="w-full flex justify-center items-center bg-light-green lg:mt-4 mt-0 block px-4 py-3 text-black font-medium mb-0 text-16 space-x-2 hover:opacity-90">
                    <p className="text-center">Pause / Start</p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7">
            <div>
              <div className="text-center">
                <p className="text-24 font-semibold">User Profile</p>
              </div>

              <div className="border border-black rounded-xl mt-5">
                {user.map((res, i) => {
                  return (
                    <React.Fragment key={i}>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 md:gap-4 lg:gap-6 px-7 py-5 flex items-center">
                        <div className="w-full">
                          <div>
                            <p className="font-medium">{res.name}</p>
                          </div>
                          <div>
                            <span className="font-medium">
                              {res.username} | {res.company.catchPhrase}
                            </span>
                          </div>
                        </div>
                        <div className="w-full float-right flex justify-end mt-3 md:mt-0">
                          <div>
                            <div>
                              <p className="font-medium">
                                {res.address.street}, {res.address.city}{" "}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium">
                                {res.email} | {res.phone}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-7">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-5 xl:gap-x-36 gap-y-6">
              {posts.map((post, index) => (
                <React.Fragment key={index}>
                  <div
                    className="border border-black rounded-xl px-6 py-3 flex justify-center cursor-pointer"
                    onClick={() => {
                      openPostModal(post);
                    }}
                  >
                    <div>
                      <div>
                        <p className="text-18 font-bold">{post.title}</p>
                      </div>
                      <div className="mt-5">
                        <span className="text-16 text-slate-400">
                          {post.body}
                        </span>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isShowPost ? (
        <div>
          <div
            id="post-modal"
            className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center"
          >
            <div className="relative w-auto flex items-center justify-center h-screen">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-2/6 bg-white outline-none focus:outline-none">
                <div className="flex items-center justify-end p-3 border-b border-solid border-slate-200 rounded-t">
                  <button
                    onClick={() => {
                      setIsShowPost(false);
                      document.body.style.overflow = "auto";
                    }}
                    className="bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
                <div>
                  <div className="flex flex-col justify-center py-5 px-5 w-full">
                    <div>
                      <h2 className="text-2xl font-bold">
                        {selectedPost.title}
                      </h2>
                      <div className="mt-4">{selectedPost.body}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {isShowPost ? (
        <div
          className="opacity-80 fixed inset-0 z-40 bg-black"
          id="post-modal"
        ></div>
      ) : null}
    </>
  );
}
