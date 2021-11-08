import { useEffect, useState } from "react";
import initializeFirebase from "../Pages/Login/Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, updateProfile, signInWithEmailAndPassword } from "firebase/auth";

// initialize firebase app 
initializeFirebase();

const useFirebase = () => {

    // user state 
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const auth = getAuth();
    const googleAuthProvider = new GoogleAuthProvider();

    // Register user by email and password
    const registerUser = (email, password, name, history) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                setAuthError('');
                history.push('/');
                const newUser = { email, displayName: name };
                setUser(newUser);
                // send name to Firebase
                updateProfile(auth.currentUser, {
                    displayName: name,
                }).then(() => {
                    setAuthError('');
                }).catch((error) => {
                    setAuthError(error.message);
                });
            })
            .catch((error) => {
                setAuthError(error.message);
                // ..
            })
            .finally(() => setIsLoading(false));
    }

    // login user 
    const loginUser = (email, password, location, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/';
                history.push(destination);

                // Signed in 
                setAuthError('');
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    const signInWithGoogle = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, googleAuthProvider)
            .then((result) => {
                const destination = location?.state?.from || '/';
                history.push(destination);
                setAuthError('');

            }).catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    // User observer 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                //const uid = user.uid;
                setUser(user);
            } else {
                // User is signed out
                setUser({});
            }
            setIsLoading(false);
        });
        return () => unsubscribe;
    }, [auth]);

    // User signout 
    const logout = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        })
            .finally(() => setIsLoading(false));
    }

    // return as object 
    return {
        user,
        isLoading,
        authError,
        registerUser,
        signInWithGoogle,
        loginUser,
        logout,
    }
}

export default useFirebase;