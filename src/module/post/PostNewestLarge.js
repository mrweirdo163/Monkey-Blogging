import { db } from "firebase-app/firebase-config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostNewestLargeStyles = styled.div`
  .post {
    &-image {
      display: block;
      margin-bottom: 16px;
      height: 433px;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 10px;
    }
    &-title {
      margin-bottom: 10px;
    }
  }
`;

const POST_PER_PAGE = 1;

const PostNewestLarge = ({ userList = [] }) => {
  const randomNum = Math.floor(Math.random(0, 1) * 2);
  const user = userList[randomNum];
  const [posts, setPosts] = useState([]);
  const [filter] = useState("");
  const [, setLastDoc] = useState();
  const [, setTotal] = useState(0);
  const [category, setCategory] = useState("");

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "users", user?.id, "posts");
      const newRef = filter
        ? query(
            colRef,
            where("title", ">=", filter),
            where("title", "<=", filter + "utf8")
          )
        : query(colRef, limit(POST_PER_PAGE));
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });
      onSnapshot(newRef, (snapshot) => {
        const postInformation = [];
        snapshot.forEach((doc) => {
          const postData = {
            id: doc.id,
            ...doc.data(),
          };
          postInformation.push(postData);
        });
        setPosts(postInformation);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [filter, user?.id]);

  useEffect(() => {
    async function fetch() {
      const docRef = doc(db, "categories", posts[0]?.categoryId);
      const docSnap = await getDoc(docRef);
      setCategory(docSnap.data());
    }
    fetch();
  }, [posts]);

  const date = posts[0]?.createdAt?.seconds
    ? new Date(posts[0]?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");

  return (
    <PostNewestLargeStyles>
      <PostImage
        url={`${
          posts[0]?.image ||
          `https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2294&q=80`
        }`}
        alt=""
        to={`/${posts[0]?.userId}-${posts[0]?.slug}`}
      ></PostImage>
      <PostCategory>{category?.name}</PostCategory>
      <PostTitle size="large" className="post-title">
        {posts[0]?.title}
      </PostTitle>
      <PostMeta
        color="gray"
        authorName={user?.fullname}
        date={formatDate}
      ></PostMeta>
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
