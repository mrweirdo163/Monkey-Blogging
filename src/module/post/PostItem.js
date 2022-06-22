import { db } from "firebase-app/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostItemStyles = styled.div`
  padding: 1em;
  background-color: ${(props) => props.theme.grayF3};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
  .post {
    &-image {
      height: 202px;
      margin-bottom: 20px;
      display: block;
      width: 100%;
      border-radius: inherit;
    }
    &-category {
      margin-bottom: 10px;
    }
    &-title {
      margin-bottom: 20px;
    }
  }
  @media screen and (max-width: 1023.98px) {
    .post {
      &-image {
        aspect-ratio: 16/9;
        height: auto;
      }
    }
  }
`;

const PostItem = ({ data }) => {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategory() {
      const docRef = doc(db, "categories", data?.categoryId);
      const docSnap = await getDoc(docRef);
      if (docSnap?.data) setCategory(docSnap?.data());
    }
    fetchCategory();
  }, [data?.categoryId]);
  if (!data) return null;
  console.log(data);

  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <PostItemStyles onClick={() => navigate(`/${data?.userId}-${data?.slug}`)}>
      <PostImage url={data?.image} alt=""></PostImage>
      <PostCategory type="light">{category?.name}</PostCategory>
      <PostTitle to={data?.slug}>{data.title}</PostTitle>
      <PostMeta
        to={slugify(data.user?.username || "", { lower: true })}
        authorName={data.user?.fullname}
        date={formatDate}
      ></PostMeta>
    </PostItemStyles>
  );
};

export default PostItem;
