import React, { useCallback, useEffect, useState } from "react";
import pagenate from "../../utility/pagenate";
import httpServices from "../../Services/httpServices";
import PostHeader from "./PostHeader";
import Tabel from "./Tabel";
import config from "../../config.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const getPosts = async () => {
    const { data: posts } = await httpServices.get(config.api);
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
    const oldPosts = filtered;
    item.title = "Updated";
    const posts = [...filtered];
    const idx = posts.indexOf(item);
    posts[idx] = { ...item };
    setPosts(posts);

    try {
      const { data } = await httpServices.put(`${config.api}/${item.id}`, item);
      if (data) {
        toast.success(`Post update successfully.`);
      }
    } catch (error) {
      toast.error(`Something went wrong. ${error.message}.`);
    }
    setPosts(oldPosts);
  };

  const handelAdd = async () => {
    const newPost = {
      title: "text 1",
      body: "text 1",
      userId: 1,
    };
    const allPosts = filtered;
    try {
      const { data: post } = await httpServices.post(config.api, newPost);
      const data = allPosts.concat([post]);
      setPosts(data);
      toast.success(`Post added successfully.`);
    } catch (error) {
      toast.error(`Something went wrong. ${error.message}.`);
      setPosts(allPosts);
    }
  };

  const handelDelete = async (item) => {
    const oldPosts = filtered;

    const remPosts = filtered.filter((post) => {
      if (item.id !== post.id) {
        return post;
      }
      return null;
    });
    setPosts(remPosts);

    try {
      await httpServices.delete(`${config.api}/${item.id}`, item);
      toast.success("Post delete successfully.");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("The post already has been deleted.");
      }

      setPosts(oldPosts);
    }
  };

  const postList = pagenate(filtered, currentPage, pageSize);

  return (
    <>
      <div className="container mt-1">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

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
