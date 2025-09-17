import { collection, getDocs } from 'firebase/firestore';
import { db } from "@/firebase/config";


export type Art = {
  id: string;
  title: string;
  description?: string;
  authorId: string;
  imageUrl: string;
  price?: number;
  height?: number;
  width?: number;
  exhibition?: string;
  forSale?: boolean;
  paints?: string[];
};

export const fetchArt = async (): Promise<Art[]> => {
  const querySnapshot = await getDocs(collection(db, 'arts'));
  const ArtList: Art[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Art, 'id'>)
  }));
  return ArtList;
};