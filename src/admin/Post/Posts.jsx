import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import pagenate from "../../utility/pagenate";

import PostHeader from "./PostHeader";
import Alert from "../../Components/Alert";
import Tabel from "./Tabel";

const Posts = () => {
  const api = "https://jsonplaceholder.typicode.com/posts";
  const [posts, setPosts] = useState([]);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
    isShow: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const getPosts = async () => {
    const { data: posts } = await axios.get(api);
    setPosts(posts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const filtered = posts;

  const handelPageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handelShowRows = useCallback((val) => {
    setPageSize(val);
  }, []);

  const handelUpdate = async (item) => {
    item.title = "Updated";
    const { data } = await axios.put(`${api}/${item.id}`, item);
    if (data) {
      const posts = [...filtered];
      const idx = posts.indexOf(item);
      posts[idx] = { ...item };
      setPosts(posts);
      setAlert({
        isShow: true,
        type: "warning",
        message: "Post update successfully.",
      });
    }
  };

  const handelAdd = async () => {
    const newPost = {
      title: "text 1",
      body: "text 1",
      userId: 1,
    };
    const { data: post } = await axios.post(api, newPost);
    const allPosts = filtered;
    const data = allPosts.concat([post]);
    setPosts(data);
    setAlert({
      isShow: true,
      type: "success",
      message: "Post added successfully.",
    });
  };

  const handelDelete = async (item) => {
    await axios.delete(`${api}/${item.id}`, item);
    const remPosts = filtered.filter((post) => {
      if (item.id !== post.id) {
        return post;
      }
      return null;
    });
    setPosts(remPosts);
    setAlert({
      isShow: true,
      type: "danger",
      message: "Post delete successfully.",
    });
  };

  const handelClose = useCallback(() => {
    setAlert({
      type: "",
      message: "",
      isShow: false,
    });
  }, []);

  const postList = pagenate(filtered, currentPage, pageSize);

  return (
    <>
      <div className="container mt-1">
        {alert.isShow && (
          <Alert
            type={alert.type}
            message={alert.message}
            OnClose={handelClose}
          />
        )}

        <PostHeader onClick={handelAdd} />

        <Tabel
          filtered={filtered}
          handelDelete={handelDelete}
          handelUpdate={handelUpdate}
          handelShowRows={handelShowRows}
          handelPageChange={handelPageChange}
          currentPage={currentPage}
          postList={postList}
          pageSize={pageSize}
        />
      </div>
    </>
  );
};

export default Posts;
