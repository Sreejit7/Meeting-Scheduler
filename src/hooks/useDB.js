import {useEffect, useState} from 'react';
import {db} from '../firebase';

const useDB = (collection) => {

  const [docs, setDocs] = useState([]);
  useEffect(() => {
    const unsubscribe = db.collection(collection)
    .orderBy('createdAt', 'desc')
    .onSnapshot((snap) => {
      let documents = [];
      snap.forEach(doc => {
         documents.push({
           ...doc.data(),
           id: doc.id
         }); 
      });
      setDocs(documents);
    });

    return () => unsubscribe();
  },[collection]);

  return { docs };
}

export default useDB;