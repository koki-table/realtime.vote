import React from "react";
import { useRecoilState } from "recoil"
import { buttonLeftCountAtom } from "../../state/buttonLeftCount"
import { currentUserAtom } from "../../state/currentUser"
import { doc, updateDoc, collection } from "firebase/firestore";
import { firebaseApp } from "../../firebase/firebase.config";

const LeftCount = () => {

    // database(firestoreの参照)
    const firestoreData = collection(firebaseApp.firestore, 'users');
    const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);

    // ButtonState
    const [buttonLeftCount, setButtonLeftCount] = useRecoilState(buttonLeftCountAtom);
    const handleClick = async() => {
        setButtonLeftCount(buttonLeftCount + 1);

         // firestoreのcountを更新
        await updateDoc(doc(firestoreData, currentUser), {
            leftCount: buttonLeftCount + 1,
        });
    };

    return (
        <div className="vote-area vote-area--left">
            <button className="btn btn--left" onClick={handleClick}>
                <span className="btn-text-main">テナジー</span><br/>に投票する
            </button>
            <span className="count"><span className="count-num count-num--small">{buttonLeftCount}</span>票</span>
        </div>
    );
};

export default LeftCount;
