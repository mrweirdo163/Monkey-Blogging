import { db } from "firebase-app/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const PostMetaStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: calc(0.5em + 0.5vw);
  font-weight: 600;
  ${(props) =>
    props.color === "gray" &&
    css`
      color: ${(props) => props.theme.gray6B};
    `};
  ${(props) =>
    props.gray === "inherit" &&
    css`
      color: inherit;
    `};
  .post {
    &-dot {
      display: inline-block;
      width: 5px;
      height: 5px;
      background-color: currentColor;
      border-radius: 100rem;
    }
  }
`;

const PostMeta = ({
  date = "",
  authorName,
  className = "",
  color = "gray",
  userId = "",
  post = {},
}) => {
  const [user, setUser] = useState();
  useEffect(() => {
    async function fetchUser() {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap?.data) setUser(docSnap?.data());
    }
    fetchUser();
  }, [userId]);

  const date1 = post?.createdAt?.seconds
    ? new Date(post?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date1).toLocaleDateString("vi-VI");
  return (
    <PostMetaStyles className={className} color={color}>
      <span className="post-time">{date || formatDate}</span>
      <span className="post-dot"></span>
      <span className="post-author">{authorName || user?.fullname}</span>
    </PostMetaStyles>
  );
};

export default PostMeta;
