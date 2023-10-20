import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

export const useGetPosts = (userId) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const q = query(collection(db, "posts"), where("userId", "==", userId));
      onSnapshot(q, (doc) => {
        const postsList = doc.docs
          .map((post) => ({ ...post.data(), id: post.id }))
          .sort((a, b) => b.date - a.date);
        setPosts(postsList);
      });
    })();
  }, []);

  return [posts, setPosts];
};
