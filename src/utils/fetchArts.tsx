// utils/fetchArts.ts
import { db } from "@/firebase/config";
import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";

export type Art = {
  id: string;
  title: string;
  imageUrl: string;
  authorUsername?: string;
  width?: number;
  height?: number;
  createdAt?: any;
};

export async function fetchArt({
  limitNum = 20,
  cursor = null,
}: {
  limitNum?: number;
  cursor?: any;
} = {}): Promise<{ items: Art[]; nextCursor: any; hasMore: boolean }> {
  const colRef = collection(db, "arts");
  let q = query(colRef, orderBy("createdAt", "desc"), limit(limitNum));

  if (cursor) q = query(colRef, orderBy("createdAt", "desc"), startAfter(cursor), limit(limitNum));

  const snap = await getDocs(q);
  const items: Art[] = snap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Art, "id">),
  }));

  const lastDoc = snap.docs[snap.docs.length - 1];
  return {
    items,
    nextCursor: lastDoc ?? null,
    hasMore: items.length === limitNum,
  };
}
