import { useEffect, useState } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

export const useGetComments = (id) => {
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    (async () => {
      const addComment = doc(db, "posts", id);
      onSnapshot(collection(addComment, "comments"), (doc) => {
        const comments = doc.docs
          .map((comment) => ({
            ...comment.data(),
            id: comment.id,
          }))
          .sort((a, b) => a.date - b.date);

        setCommentsList(comments);
      });
    })();
  }, []);

  return [commentsList, setCommentsList];
};
