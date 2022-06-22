import { db } from "firebase-app/firebase-config";
import {
  collection,
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

const PostNewestItemStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #ccc;
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }
  .post {
    &-image {
      display: block;
      flex-shrink: 0;
      width: 180px;
      height: 130px;
      border-radius: 12px;
    }
    &-category {
      margin-bottom: 10px;
    }
    &-title {
      margin-bottom: 8px;
    }
  }
  @media screen and (max-width: 1023.98px) {
    margin-bottom: 14px;
    padding-bottom: 14px;
    .post {
      &-image {
        width: 140px;
        height: 100px;
      }
    }
  }
`;

const POST_PER_PAGE = 1;

const PostNewestItem = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [, setLastDoc] = useState();
  const [, setTotal] = useState(0);
  const filter = "";

  useEffect(() => {
    if (filter) {
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
    } else {
      const colRef = collection(db, "users", user?.id, "posts");
      onSnapshot(colRef, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          results.push({
            ...doc.data(),
          });
        });
        setPosts(results);
      });
    }
  }, [filter, user?.id]);

  console.log(posts);

  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => (
          <PostNewestItemStyles>
            <PostImage
              url={`${
                post?.image ||
                `https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2294&q=80`
              }`}
              alt=""
              to={`/${post?.userId}-${post?.slug}`}
            ></PostImage>
            <div className="post-content">
              <PostCategory
                type="secondary"
                categoryId={post?.categoryId}
              ></PostCategory>
              <PostTitle size="normal">{post.title}</PostTitle>
              <PostMeta
                userId={post.userId}
                post={post}
                color="gray"
              ></PostMeta>
            </div>
          </PostNewestItemStyles>
        ))}
    </>
  );
};

export default PostNewestItem;
