import Heading from "components/layout/Heading";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";

const PostRelated = ({ userId = "", slug = "" }) => {
  const [posts, setPosts] = useState([]);
  console.log(slug);
  useEffect(() => {
    const docRef = query(
      collection(db, "users", userId, "posts"),
      where("slug", "!=", slug)
    );
    onSnapshot(docRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(results);
    });
  }, [slug, userId]);

  console.log(posts);
  if (!slug || posts.length <= 0) return null;
  return (
    <div className="post-related">
      <Heading>Related Posts</Heading>
      <div className="grid-layout grid-layout--primary">
        {posts.map((item) => (
          <PostItem key={item.id} data={item}></PostItem>
        ))}
      </div>
    </div>
  );
};

export default PostRelated;
