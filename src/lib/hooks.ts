import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { auth, firestore } from '@/lib/firebase';

export const useUserData = () => {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      if (user) {
        const userRef = doc(firestore, 'users', user.uid);

        onSnapshot(userRef, (userSnap) => {
          if (userSnap.exists()) {
            const userData = userSnap.data();
            console.log(userData);
            setUsername(userData?.username);
          }
        });

        // -----------
        // const usersRef = collection(firestore, 'users');
        // const q = query(usersRef);

        // const querySnapshot = await getDocs(q);
        // console.log(user.uid, usersRef, q, querySnapshot);
        // querySnapshot.forEach((doc) => {
        //   console.log(doc.id, ' => ', doc.data());
        // });
        // -----------
      } else {
        setUsername(null);
      }
    };

    getUser();
  }, [user]);

  return { user, username };
};
