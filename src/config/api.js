import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

async function submitToCollection(collectionName, data) {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      status: "new",
    });
    return { success: true, id: docRef.id };
  } catch (err) {
    throw new Error(
      err.message || "Network error. Please try again."
    );
  }
}

export const feedbackAPI = {
  submit: (data) => submitToCollection("feedback", data),
};

export const contactAPI = {
  submit: (data) => submitToCollection("contact", data),
};
