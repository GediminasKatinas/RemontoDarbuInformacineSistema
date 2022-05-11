import { useEffect, useState } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    signOut,
    getIdToken,
} from "firebase/auth";
import initializeFirebase from "../Firebase/firebase.init";
//paleidziamas firebase
initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    
    const [isAdmin, setIsAdmin] = useState(false);
    const [idToken, setIdToken] = useState("");
    const [isMeistras, setIsMeistras] = useState(false);
    const auth = getAuth();



    const signUpWithEmail = (Username, Password, Email, Role, history, location) => {
        setIsLoading(true);
        //firebase sukuria accounta
        createUserWithEmailAndPassword(auth, Email, Password)
            .then((userCredential) => {
                const user = userCredential.user;
                const newUser = {
                    Username: Username,
                    Password: Password,
                    Email: Email,
                    Role: Role
                }
                    setUser(user);
                    setErrorMessage("");
//papostinama i DB
                fetch("https://localhost:5001/api/Users", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        checkAdmin(Email);
                        checkMeistras(Email);
                            const redirect_uri = location?.state?.from || "/";
                            history.push(redirect_uri);
                    });
            })
            .catch((error) => {
                setErrorMessage(error.message);
            })
            .finally(() => setIsLoading(false));
    };



    // patikrinama admin role
    const checkAdmin =(Email) => {
        fetch(`https://localhost:5001/api/Users/${Email}/admin`)
            .then(res => res.json())
            .then(data => setIsAdmin(data));
    };
    //Prisijungimas
    const loginWithEmail = (Email, Password, history, location) => {
        setIsLoading(true);
        //firebase prisijungimas
        signInWithEmailAndPassword(auth, Email, Password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user);
                setErrorMessage("");
                //redirectina i skydelis
                checkAdmin(Email);
                checkMeistras(Email);
                const redirect_uri = location?.state?.from || "/";
                history.push(redirect_uri);
            })
            .catch((error) => {
                setErrorMessage(error.message);
            })
            .finally(() => setIsLoading(false));
    };
    // patikrinama mesitro role
    const checkMeistras =(Email) => {
        fetch(`https://localhost:5001/api/Users/${Email}/meistras`)
            .then(res => res.json())
            .then(data => setIsMeistras(data));
    };
    // perziurima user state
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                getIdToken(user)
                    .then(idToken => {
                        setIdToken(idToken);
                    });
            }
            else {
                setUser({});
            };

            setIsLoading(false);
        });

        return () => unsubscribed;
    }, []);

    const logout = (history) => {
        setIsLoading(true);
        signOut(auth)
            .then(() => {
                setUser({});
                setErrorMessage("");
                history.push("/prisijungimas");
            })
            .catch((error) => {
                setErrorMessage(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    return {
        user,
        loginWithEmail,
        signUpWithEmail,
        logout,
        errorMessage,
        isLoading,
        idToken,
        isAdmin,
        isMeistras
    };
};

export default useFirebase;