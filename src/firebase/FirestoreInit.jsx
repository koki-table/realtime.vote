import React from "react";
import { useEffect } from 'react';
import { useRecoilState } from "recoil"
import { currentUserAtom } from "../state/currentUser"
import { firebaseApp } from "./firebase.config";
import { doc, setDoc, collection, onSnapshot, updateDoc, query, where, getDoc, getDocs } from "firebase/firestore";
import { buttonLeftCountAtom } from "../state/buttonLeftCount"
import { buttonRightCountAtom } from "../state/buttonRightCount"
import { nameAtom } from "../state/name"

const FirestoreInit = () => {

    const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
    const [buttonLeftCount, setButtonLeftCount] = useRecoilState(buttonLeftCountAtom);
    const [buttonRightCount, setButtonRightCount] = useRecoilState(buttonRightCountAtom);
    const [name, setName] = useRecoilState(nameAtom);


    // database(firestoreの参照)
    const firestoreData = collection(firebaseApp.firestore, 'users');

    // firestoreのドキュメントに登録
    const firestoreInit = async () => {
        await setDoc(doc(firestoreData, '0aSHzf7EWNYI5rkKF2S07hb02DM2'), {
            leftCount: buttonLeftCount,
            rightCount: buttonRightCount,
            name: name,
            userId: `${currentUser}`,
        });
    };

    useEffect(() => {
        const initButtonState = async () => {
            onSnapshot(doc(firestoreData, '0aSHzf7EWNYI5rkKF2S07hb02DM2'), (doc) => {

                // firestoreに登録がない場合
                if(typeof doc.data() === 'undefined') {
                    firestoreInit()

                    console.log("firestoreなし");
                // firestoreに登録がある場合
                } else {
                    setButtonLeftCount(doc.data().leftCount)
                    setButtonRightCount(doc.data().rightCount)
                    setName(doc.data().name)
                    console.log("firestoreあり");
                }
            });
        };
        initButtonState();

        console.log(currentUser);

        // currentUserが更新されたタイミングでuseeffectが実行
    }, [])

    useEffect(() => {
        firestoreInit()

        // buttonRightCountが更新されたタイミングでuseeffectが実行
    }, [buttonRightCount])

    useEffect(() => {
        firestoreInit()

        // buttonLeftCountが更新されたタイミングでuseeffectが実行
    }, [buttonLeftCount])

    return null
};

export default FirestoreInit;