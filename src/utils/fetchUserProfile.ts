import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";

const fetchUserData = async (uid: string) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
             
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};
