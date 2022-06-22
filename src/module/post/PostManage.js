import React, { useEffect, useState } from "react";
import { Button } from "components/button";
import { Dropdown } from "components/dropdown";
import { Table } from "components/table";
import { useAuth } from "contexts/auth-context";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { debounce } from "lodash";
import DashboardHeading from "module/dashboard/DashboardHeading";
import PostTable from "./PostTable";
import styled from "styled-components";

const POST_PER_PAGE = 2;

const PostManageStyles = styled.div`
  @media screen and (max-width: 800px) {
    .dropdown {
      display: none;
    }
  }
  @media screen and (max-width: 593px) {
    .search-post {
      display: none;
    }
    .heading {
      margin-bottom: 3.5em;
    }
  }
`;

const PostManage = () => {
  const { userInfo } = useAuth();
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("");
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "users", userInfo?.uid, "posts");
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
  }, [filter, userInfo?.uid]);

  const handleSearchPost = debounce((e) => {
    setFilter(e.target.value);
  }, 250);

  const handleLoadMorePost = async () => {
    const nextRef = query(
      collection(db, "users", userInfo?.uid, "posts"),
      startAfter(lastDoc || 0),
      limit(POST_PER_PAGE)
    );

    onSnapshot(nextRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts([...posts, ...results]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };

  console.log(posts);

  return (
    <PostManageStyles>
      <div className="heading">
        <DashboardHeading
          title="All posts"
          desc="Manage all your posts easily here"
          responsive={true}
        ></DashboardHeading>
      </div>
      <div className="flex justify-end gap-5 mb-10">
        <div className="w-full max-w-[200px] dropdown">
          <Dropdown>
            <Dropdown.Select placeholder="Category"></Dropdown.Select>
          </Dropdown>
        </div>
        <div className="w-full max-w-[300px] search-post">
          <input
            type="text"
            className="w-full p-4 border border-gray-300 border-solid rounded-lg"
            placeholder="Search post..."
            onChange={handleSearchPost}
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 &&
            posts.map((post) => (
              <tr>
                <PostTable key={post.categoryId} post={post}></PostTable>
              </tr>
            ))}
        </tbody>
      </Table>
      {total > posts.length && (
        <div className="mt-10 text-center">
          <Button
            kind="ghost"
            className="mx-auto w-[200px]"
            onClick={handleLoadMorePost}
          >
            See more +
          </Button>
        </div>
      )}
    </PostManageStyles>
  );
};

export default PostManage;
