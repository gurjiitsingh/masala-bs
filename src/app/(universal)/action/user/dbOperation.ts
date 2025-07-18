'use server'
import { hashPassword } from "@/lib/auth";
import { db } from "@/lib/firebaseConfig";
import {   TuserSchem, userType } from "@/lib/types/userType";

import { addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, setDoc, where } from "@firebase/firestore";


// export async function addUserDirect(formData: FormData) {
//  const email = formData.get("email") as string;
// const password = formData.get("password") as string;
// const firstName = formData.get("firstName") as string;
// const lastName = formData.get("lastName") as string;
// let username = (formData.get("username") || undefined) as string | undefined;
//   //const confirmPassword = formData.get("confirmPassword");
//   // const recievedData = {
//   //   email,
//   //   password,
//   //   username,
//   //   confirmPassword,
//   // };

//   const q = query(collection(db, "user"), where("email", "==", email));
//   const querySnapshot = await getDocs(q);
//   let recordId = undefined;
//   querySnapshot.forEach((doc) => {
//     recordId = doc.id;
//     // doc.data() is never undefined for query doc snapshots
//     //console.log("User allready exist ------", doc.id);
//     return doc.id;
//   });

//   if (recordId === undefined) {
//     // console.log("start adding user -----")
//     //also add data in user/cutomer table
//     if (username === undefined) {
//       username = firstName + " " + lastName;
//     }
//     let userDocRef = "" as string;

//     const date = new Date();
//     // toLocaleString, default format for language de
//    // console.log(date.toLocaleString('de',{timeZone:'Europe/Berlin', timeZoneName: 'long'}));
//     // DateTimeFormat.format with specific options
//     const f = new Intl.DateTimeFormat('de', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       hour12: false,
//       minute: '2-digit',
//       // timeZone: 'Europe/Berlin',
//       // timeZoneName: 'short'
//     });
//     const time = f.format(date)

//     try {
//       const hashedPassword = await hashPassword(password);
//       const newuser = {
//         username,
//         firstName,
//         lastName,
//         email,
//         hashedPassword,
//         role: "user",
//         isVerified: true,
//         isAdmin: false,
//         time,
//       };

//       userDocRef = (await addDoc(collection(db, "user"), newuser)).id ;
//       console.log("User added with ID: ", userDocRef);
//       recordId = userDocRef;
//       return userDocRef;
//       // Clear the form
//     } catch (e) {
//       console.error("Error adding document: ", e);
//     }
//   }

//   return recordId;
  
// } // end of add user


export async function addUserDirect(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  let username = (formData.get("username") || undefined) as string | undefined;

  const q = query(collection(db, "user"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  let recordId: string | undefined = undefined;

  querySnapshot.forEach((doc) => {
    recordId = doc.id;
    return;
  });

  if (recordId === undefined) {
    if (username === undefined) {
      username = `${firstName} ${lastName}`;
    }

    try {
      const hashedPassword = await hashPassword(password);

      const newuser = {
        username,
        firstName,
        lastName,
        email,
        hashedPassword,
        role: "user",
        isVerified: true,
        isAdmin: false,
        time: new Intl.DateTimeFormat("de", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          hour12: false,
          minute: "2-digit",
        }).format(new Date()),
        createdAt: serverTimestamp(), // ✅ Add server timestamp here
      };

      const userDocRef = await addDoc(collection(db, "user"), newuser);
      console.log("User added with ID: ", userDocRef.id);
      return userDocRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return recordId;
}


export async function searchUserById(id: string | undefined): Promise<TuserSchem> {
  //console.log("searchUserById -----------------", id);
  // if (id !== undefined) {
  //   const docRef = doc(db, "user", id);
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //     console.log("Document data inside user by id:", docSnap.data());
  //   } else {
  //     // docSnap.data() will be undefined in this case
  //     console.log("No such document!");
  //   }

  //   return docSnap.data();
  // }else{
  //   return {};
  // }
 let data = {} as TuserSchem;
  if (id !== undefined) {
    const q = query(collection(db, "user"), where("userId", "==", id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      data = doc.data() as TuserSchem;
    });
    return data;
  }else{
    return data;
  }





}



  // export async function fetchAllUsers(): Promise<userType[]>{


  //    const data = [] as userType[];
  //    const q = query(collection(db, "user"));
  //    const querySnapshot = await getDocs(q);
  //    querySnapshot.forEach((doc) => {
  //    const  userData = {id:doc.id, ...doc.data()} as userType;
  //    data.push(userData)
  //    });
  //    return data;
  //   }
  
 


export async function fetchAllUsers(): Promise<userType[]> {
  const data: userType[] = [];

  const q = query(collection(db, "user"));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    
    const userData: userType = {
      id: doc.id,
      email: docData.email || "",
      hashedPassword: docData.hashedPassword || "",
      isAdmin: docData.isAdmin ?? false,
      isVerfied: docData.isVerified ?? false,
      role: docData.role || "user",
      username: docData.username || "",
      time: docData.time || "",

      // ✅ convert Timestamp to string
      createdAt: docData.createdAt?.toDate().toISOString() || undefined,
    };

    data.push(userData);
  });

  return data;
}




  export async function deleteUser(id: string, oldImgageUrl: string) {
    const docRef = doc(db, "user", id);
    await deleteDoc(docRef);


      
    // const imageUrlArray = oldImgageUrl.split("/");
    // console.log(imageUrlArray[imageUrlArray.length - 1]);
    // const imageName =
    //   imageUrlArray[imageUrlArray.length - 2] +
    //   "/" +
    //   imageUrlArray[imageUrlArray.length - 1];
  
    // const image_public_id = imageName.split(".")[0];
    // console.log(image_public_id);
    // try {
    //   const deleteResult = await deleteImage(image_public_id);
    //   console.log("image delete data", deleteResult);
    // } catch (error) {
    //   console.log(error);
    //   return { errors: "Somthing went wrong, can not delete product picture" };
    // }
  
    return {
      message: { success: "ok" },
    };
    // }else{
    //   return {errors:"Somthing went wrong, can not delete product"}
    // }
  }


  
  export async function unsbscribeUser(email: string): Promise<boolean> {
  try {
    if (!email) return false;

    await setDoc(doc(db, "unsubscribedEmails", email), {
      email,
      unsubscribedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("❌ Failed to unsubscribe user:", error);
    return false;
  }
}