import React from "react";

const PostHeader = ({ onClick }) => {
  return (
    <div className="title">
      <div className="h5 ">All Posts</div>
      <div className="add-btn">
        <button type="button" className="btn btn-primary" onClick={onClick}>
          Add Post
        </button>
      </div>
    </div>
  );
};

export default PostHeader;
