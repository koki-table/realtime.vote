import React from "react";
import { useEffect } from 'react';
import { useRecoilState } from "recoil"
import { buttonLeftCountAtom } from "../../state/buttonLeftCount"
import { buttonRightCountAtom } from "../../state/buttonRightCount"
import { leftCountTotalAtom } from "../../state/leftCountTotal"
import { rightCountTotalAtom } from "../../state/rightCountTotal"

import { firebaseApp } from "../../firebase/firebase.config";
import { doc, setDoc, collection, onSnapshot, updateDoc, query, where, getDoc, getDocs } from "firebase/firestore";

const BothCount = () => {
    // ButtonState
    const [buttonLeftCount] = useRecoilState(buttonLeftCountAtom);
    const [buttonRightCount] = useRecoilState(buttonRightCountAtom);
    const [leftCcountTotal, setLeftCcountTotal] = useRecoilState(leftCountTotalAtom);
    const [rightCountTotal, setRightCountTotal] = useRecoilState(rightCountTotalAtom);

    // database(firestoreの参照)
    const firestoreData = collection(firebaseApp.firestore, 'users');

    const totalCount = async () => {
        const querySnapshot = await getDocs(firestoreData);
        let leftSum = 0;
        let rightSum = 0;
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data().leftCount + doc.data().rightCount);

            let leftCountTotal = doc.data().leftCount
            let rightCountTotal = doc.data().rightCount

            leftSum += leftCountTotal;
            rightSum += rightCountTotal;
        });

        setLeftCcountTotal(leftSum)
        setRightCountTotal(rightSum)
    };
    totalCount()

    return (
        <div className="total-count">
            <p className="total-count-detail">
                <span className="text">テナジー合計</span><br/>
                <span className="count-num">{leftCcountTotal}</span>票
            </p>
            <p className="total-count-detail">
                <span className="text">ディグニクス合計</span><br/>
                <span className="count-num">{rightCountTotal}</span>票
            </p>
        </div>
    );
};

export default BothCount;