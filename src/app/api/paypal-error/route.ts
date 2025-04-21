import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseConfig";
import { addDoc, collection } from "@firebase/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { error, time = new Date().toISOString() } = body;
    const data = {
      error,
      time,
      createdAt: new Date(),
    };
    const docRef = await addDoc(collection(db, "paypalerror"), data);
    console.log("Document written with ID: ", docRef.id);
    return NextResponse.json({ message: "Error saved to Firestore" });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
