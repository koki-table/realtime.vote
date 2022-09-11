import React from "react";
import { useEffect } from 'react';
import { useRecoilState } from "recoil"
import { buttonLeftCountAtom } from "../../state/buttonLeftCount"
import { buttonRightCountAtom } from "../../state/buttonRightCount"
import { leftCountTotalAtom } from "../../state/leftCountTotal"
import { rightCountTotalAtom } from "../../state/rightCountTotal"
import { personalDataAtom } from "../../state/personalData"

import { firebaseApp } from "../../firebase/firebase.config";
import { doc, setDoc, collection, onSnapshot, updateDoc, query, where, getDoc, getDocs } from "firebase/firestore";
import { currentUserAtom } from "../../state/currentUser";

const PersonalData = () => {
    // ButtonState
    const [buttonLeftCount] = useRecoilState(buttonLeftCountAtom);
    const [buttonRightCount] = useRecoilState(buttonRightCountAtom);
    const [leftCcountTotal, setLeftCcountTotal] = useRecoilState(leftCountTotalAtom);
    const [rightCountTotal, setRightCountTotal] = useRecoilState(rightCountTotalAtom);
    const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
    const [personalData, setPersonalData] = useRecoilState(personalDataAtom);

    // database(firestoreの参照)
    const firestoreData = collection(firebaseApp.firestore, 'users');
    
    useEffect(() => {
        const dataUpdate = async () => {
            const querySnapshot = await getDocs(firestoreData);

            let dataDetail = []

            querySnapshot.forEach((doc) => {
                // let leftCountTotal = doc.data().leftCount
                // let rightCountTotal = doc.data().rightCount

                let firestorePersonalData = [{ name: `${doc.data().name}`, leftCount: doc.data().leftCount, rightCount: doc.data().rightCount, userId: `${doc.data().userId}` }]

                dataDetail = [...firestorePersonalData];
                // setPersonalData((data) => [...data, { name: `${doc.data().name}`, leftCount: doc.data().leftCount, rightCount: doc.data().rightCount, userId: `${doc.data().userId}` }])
            });

            console.log(dataDetail);
        };
        dataUpdate()

    },[]);

    console.log(personalData);


    return (
        <div className="personal-data">
            
        </div>
    );
};

export default PersonalData;