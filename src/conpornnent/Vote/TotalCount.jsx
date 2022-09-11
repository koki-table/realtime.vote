import React from "react";
import { useEffect } from 'react';
import { useRecoilState } from "recoil"
import { buttonLeftCountAtom } from "../../state/buttonLeftCount"
import { buttonRightCountAtom } from "../../state/buttonRightCount"
import { buttonTotalCountAtom } from "../../state/buttonTotalCount"

import { firebaseApp } from "../../firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";

const TotalCount = () => {
    // ButtonState
    const [buttonLeftCount] = useRecoilState(buttonLeftCountAtom);
    const [buttonRightCount] = useRecoilState(buttonRightCountAtom);
    const [buttonTotalCount, setButtonTotalCount] = useRecoilState(buttonTotalCountAtom);

    // database(firestoreの参照)
    const firestoreData = collection(firebaseApp.firestore, 'users');

    useEffect(() => {
        const totalCount = async () => {
            const querySnapshot = await getDocs(firestoreData);
            let sum = 0;
            querySnapshot.forEach((doc) => {
                let totalIdCount = doc.data().leftCount + doc.data().rightCount
                sum += totalIdCount;
            });
            setButtonTotalCount(sum)
        };
        totalCount()
    },[buttonLeftCount,buttonRightCount]);

    return (
        <div className="total-count total-count--main">
            <p>総投票数<span className="count-num count-num--large">{buttonTotalCount}</span>票</p>
        </div>
    );
};

export default TotalCount;