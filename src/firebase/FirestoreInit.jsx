import React from "react";
import { useEffect } from 'react';
import { useRecoilState } from "recoil"
import { currentUserAtom } from "../state/currentUser"
import { firebaseApp } from "./firebase.config";
import { doc, setDoc, collection, onSnapshot, updateDoc, query, where, getDoc, getDocs } from "firebase/firestore";
import { buttonLeftCountAtom } from "../state/buttonLeftCount"
import { buttonRightCountAtom } from "../state/buttonRightCount"

const FirestoreInit = () => {

    const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
    const [buttonLeftCount, setButtonLeftCount] = useRecoilState(buttonLeftCountAtom);
    const [buttonRightCount, setButtonRightCount] = useRecoilState(buttonRightCountAtom);

    // database(firestoreの参照)
    const firestoreData = collection(firebaseApp.firestore, 'users');

    // firestoreのドキュメントに登録
    const firestoreInit = async () => {
        await setDoc(doc(firestoreData, currentUser), {
            leftCount: buttonLeftCount,
            rightCount: buttonRightCount,
            name: '名無しさん',
            userId: `${currentUser}`,
        });
    };

    useEffect(() => {
        const initButtonState = async () => {
            onSnapshot(doc(firestoreData, currentUser), (doc) => {

                // firestoreに登録がない場合
                if(typeof doc.data() === 'undefined') {
                    firestoreInit()
                // firestoreに登録がある場合
                } else {
                    setButtonLeftCount(doc.data().leftCount)
                    setButtonRightCount(doc.data().rightCount)
                    console.log(buttonRightCount);
                }
            });
        };
        initButtonState();

        // currentUserが更新されたタイミングでuseeffectが実行
    }, [currentUser])

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