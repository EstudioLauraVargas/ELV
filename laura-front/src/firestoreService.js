// src/firestoreService.js
import { db } from './firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const addUser = async (user) => {
  try {
    const docRef = await addDoc(collection(db, 'users'), user);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

const getUsers = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  const users = [];
  querySnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });
  return users;
};

export { addUser, getUsers };
