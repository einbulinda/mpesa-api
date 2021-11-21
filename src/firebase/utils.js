import { addDoc, collection } from "@firebase/firestore";
import { mpesaDb } from "./config";

export const saveOrder = async (order) => {
  try {
    const docRef = await addDoc(collection(mpesaDb, "orders"), order);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.log("Error adding document: ", error);
  }
};

// export const sendOrder = (order) => {
//   // Get Order ref
//   const receiveOrder = httpsCallable(functions, "receiveOrder");
//   receiveOrder(order).then((result) => {
//     return result;
//   });
// };
