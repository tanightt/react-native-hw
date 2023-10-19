import { nanoid } from "@reduxjs/toolkit";
import { storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const uploadImage = async ({ imageUri, folder }) => {
  const avatarId = nanoid();

  if (imageUri) {
    try {
      const response = await fetch(imageUri);

      const file = await response.blob();

      const imageRef = await ref(storage, `${folder}/${avatarId}`);

      await uploadBytes(imageRef, file);

      const downloadURL = await getDownloadURL(imageRef);

      return downloadURL;
    } catch (error) {
      console.warn("uploadImage: ", error);
    }
  }
};
