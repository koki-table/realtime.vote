import React from "react";
import { useRecoilState } from "recoil"
import { buttonRightCountAtom } from "../../state/buttonRightCount"
import { currentUserAtom } from "../../state/currentUser"
import { doc, updateDoc, collection } from "firebase/firestore";
import { firebaseApp } from "../../firebase/firebase.config";

const RightButton = () => {

    // database(firestoreの参照)
    const firestoreData = collection(firebaseApp.firestore, 'users');

    const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);

    // ButtonState
    const [buttonRightCount, setButtonRightCount] = useRecoilState(buttonRightCountAtom);
    const handleClick = async() => {
        setButtonRightCount(buttonRightCount + 1);

        // firestoreのcountを更新
        await updateDoc(doc(firestoreData, currentUser), {
            rightCount: buttonRightCount + 1,
        });
    };

    return (
        <div className="vote-area vote-area--right">
            <button className="btn btn--right" onClick={handleClick}>
                <span className="btn-text-main">ディグニクス</span><br/>に投票する
            </button>
            <span className="count"><span className="count-num count-num--small">{buttonRightCount}</span>票</span>
        </div>
    );
};

export default RightButton;
