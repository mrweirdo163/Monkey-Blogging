import { db } from "firebase-app/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import styled from "styled-components";

const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 269px;
  .post {
    &-image {
      display: block;
      width: 100%;
      height: 269px;
      border-radius: 16px;
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background: linear-gradient(
        179.77deg,
        #6b6b6b 36.45%,
        rgba(163, 163, 163, 0.622265) 63.98%,
        rgba(255, 255, 255, 0) 99.8%
      );
      mix-blend-mode: multiply;
      opacity: 0.6;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  }
  @media screen and (min-width: 1024px) {
    height: 272px;
  }
`;

const PostFeatureItem = ({ post }) => {
  const [category, setCategory] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    async function fetchCategory() {
      const docRef = doc(db, "categories", post?.categoryId);
      const docSnap = await getDoc(docRef);
      if (docSnap?.data) setCategory(docSnap?.data());
    }
    fetchCategory();
  }, [post?.categoryId]);

  useEffect(() => {
    async function fetchUser() {
      if (post.userId) {
        const docRef = doc(db, "users", post?.userId);
        const docSnap = await getDoc(docRef);
        if (docSnap?.data) setUser(docSnap?.data());
      }
    }
    fetchUser();
  }, [post?.userId]);

  const date = post?.createdAt?.seconds
    ? new Date(post?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");

  return (
    <PostFeatureItemStyles>
      <PostImage url={post?.image} alt="unsplash" to="/"></PostImage>
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          {post?.categoryId ? (
            <PostCategory>{category?.name}</PostCategory>
          ) : (
            <PostCategory>Kiến thức</PostCategory>
          )}
          <PostMeta
            color="inherit"
            authorName={user?.fullname}
            date={formatDate}
          ></PostMeta>
        </div>
        <PostTitle to={`/${post.userId}-${post.slug}`} size="large">
          {post.title}
        </PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
