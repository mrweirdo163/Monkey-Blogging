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
import PostFeatureItem from "./PostFeatureItem";
import { SwiperSlide } from "swiper/react";

const POST_PER_PAGE = 2;

const PostFeature = ({ filter = "", user }) => {
  const [posts, setPosts] = useState([]);
  const [, setLastDoc] = useState();
  const [, setTotal] = useState(0);

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

  return (
    <>
      {posts?.length > 0 &&
        posts?.map((post) => (
          <SwiperSlide>
            <PostFeatureItem key={post?.slug} post={post}></PostFeatureItem>
          </SwiperSlide>
        ))}
    </>
  );
};

export default PostFeature;
