import { collection, getDocs } from 'firebase/firestore';
import { db } from "@/app/firebase/config";


type Art = {
  id: string;
  name: string;
  description?: string;
  image: string;
  photoPath: string;
};

export const fetchArt = async (): Promise<Art[]> => {
  const querySnapshot = await getDocs(collection(db, 'Art'));
  const ArtList: Art[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Art, 'id'>)
  }));
  return ArtList;
};