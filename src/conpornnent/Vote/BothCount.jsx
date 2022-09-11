import React from "react";
import { useRecoilState } from "recoil"
import { leftCountTotalAtom } from "../../state/leftCountTotal"
import { rightCountTotalAtom } from "../../state/rightCountTotal"

import { firebaseApp } from "../../firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";

const BothCount = () => {
    // ButtonState
    const [leftCountTotal, setLeftCountTotal] = useRecoilState(leftCountTotalAtom);
    const [rightCountTotal, setRightCountTotal] = useRecoilState(rightCountTotalAtom);

    // database(firestoreの参照)
    const firestoreData = collection(firebaseApp.firestore, 'users');

    const totalCount = async () => {
        const querySnapshot = await getDocs(firestoreData);
        let leftSum = 0;
        let rightSum = 0;
        querySnapshot.forEach((doc) => {

            let leftCountTotal = doc.data().leftCount
            let rightCountTotal = doc.data().rightCount

            leftSum += leftCountTotal;
            rightSum += rightCountTotal;
        });

        setLeftCountTotal(leftSum)
        setRightCountTotal(rightSum)
    };
    totalCount()

    return (
        <div className="total-count">
            <p className="total-count-detail">
                <span className="text">テナジー合計</span><br/>
                <span className="count-num count-num--small">{leftCountTotal}</span>票
            </p>
            <p className="total-count-detail">
                <span className="text">ディグニクス合計</span><br/>
                <span className="count-num count-num--small">{rightCountTotal}</span>票
            </p>
        </div>
    );
};

export default BothCount;