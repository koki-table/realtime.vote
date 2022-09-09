import React from "react";
import { useEffect } from 'react';
import { useRecoilState } from "recoil"
import { currentUserAtom } from "../state/currentUser"
import { firebaseApp } from "../firebase/firebase.config";
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth'
import { doc, setDoc, collection, onSnapshot, updateDoc, query, where } from "firebase/firestore";


const AuthInit = () => {
    // UserState
    const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);

    // database(firestoreの参照)
    const firestoreData = collection(firebaseApp.firestore, 'users');

    const fetchSetUser = async () => {
        try {
            onAuthStateChanged(firebaseApp.fireauth, async (user) => {

                // 初回ログイン
                if (!user) {
                    signInAnonymously(firebaseApp.fireauth)
                    .then(async (e) => {
                        if (e.user) {
                            setCurrentUser(
                                user.uid,
                                // isAnonymus: e.user.isAnonymous,
                            )

                            console.log("初回ログイン");
                        }
                        // eslint-disable-next-line no-console
                    })
                    .catch(() => {
                        // console.log(error)
                    })

                // 2回目以降ログイン
                } else {
                    setCurrentUser(
                        user.uid,
                        // isAnonymus: user.isAnonymous,
                    )
                    console.log("2解");
                }
            })
        } catch {
            setCurrentUser(null)
        }
        console.log("03");
    }
    useEffect(() => {
        fetchSetUser()
    }, [])

    return null
};

export default AuthInit;