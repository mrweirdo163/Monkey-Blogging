import Layout from "components/layout/Layout";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import PostCategory from "module/post/PostCategory";
import PostImage from "module/post/PostImage";
import PostMeta from "module/post/PostMeta";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PageNotFound from "./PageNotFound";
import parse from "html-react-parser";
import PostRelated from "module/post/PostRelated";
const PostDetailsPageStyles = styled.div`
  padding-bottom: 100px;

  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }
  .author {
    width: fit-content;
    margin-top: 40px;
    margin-bottom: 80px;
    display: flex;
    align-items: center;
    padding: 1em;
    border-radius: 20px;
    background-color: ${(props) => props.theme.grayF3};
    cursor: pointer;
    &-image {
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      border-radius: 100%;
      margin-right: 1em;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
    }
    &-name {
      font-weight: bold;
      font-size: calc(0.5em + 0.5vw);
    }
    &-desc {
      font-size: calc(0.3em + 0.5vw);
      line-height: 2;
    }
  }
  @media screen and (max-width: 1023.98px) {
    padding-bottom: 40px;
    .post {
      &-header {
        flex-direction: column;
      }
      &-feature {
        height: auto;
      }
      &-heading {
        font-size: 26px;
      }
      &-content {
        margin: 40px 0;
      }
    }
  }
`;

const PostDetailsPage = () => {
  const { slug } = useParams();
  const userId = slug?.substr(0, slug.indexOf("-"));
  const slugCopy = slug?.substr(userId.length + 1, slug.length);
  const [postInfo, setPostInfo] = useState({});
  const [user, setUser] = useState();
  const [category, setCategory] = useState();
  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;
      const colRef = query(
        collection(db, "users", userId, "posts"),
        where("slug", "==", slugCopy)
      );
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          doc.data() && setPostInfo(doc.data());
        });
      });
    }
    fetchPost();
  }, [userId, slugCopy, slug]);

  useEffect(() => {
    async function fetchUser() {
      const docRef = doc(db, "users", postInfo.userId);
      const docSnap = await getDoc(docRef);
      if (docSnap?.data) setUser(docSnap?.data());
    }

    fetchUser();
  }, [postInfo.userId]);

  useEffect(() => {
    async function fetchCategory() {
      const docRef = doc(db, "categories", postInfo.categoryId);
      const docSnap = await getDoc(docRef);
      if (docSnap?.data) setCategory(docSnap?.data());
    }

    fetchCategory();
  }, [postInfo.categoryId]);

  const date = postInfo?.createdAt?.seconds
    ? new Date(postInfo?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");

  if (!slugCopy || !postInfo.title) return <PageNotFound></PageNotFound>;

  return (
    <PostDetailsPageStyles>
      <Layout>
        <div className="container">
          <div className="post-header">
            <PostImage
              url={postInfo?.image}
              className="post-feature"
            ></PostImage>
            <div className="post-info">
              <PostCategory className="mb-6">{category?.name}</PostCategory>
              <h1 className="post-heading">{postInfo?.title}</h1>
              <PostMeta
                date={formatDate}
                authorName={user?.fullname}
              ></PostMeta>
            </div>
          </div>
          <div className="post-content">
            <div className="entry-content">
              {parse(postInfo?.content || "")}
            </div>
            <div className="author">
              <div className="author-image">
                <img src={user?.photoURL} alt="" />
              </div>
              <div className="author-content">
                <h3 className="author-name">{user?.fullname}</h3>
                <p className="author-desc">{user?.email}</p>
              </div>
            </div>
          </div>
          <PostRelated userId={userId} slug={postInfo?.slug}></PostRelated>
        </div>
      </Layout>
    </PostDetailsPageStyles>
  );
};

export default PostDetailsPage;
