import React from "react";
import { useRecoilState } from "recoil"
import { buttonRightCountAtom } from "../../state/buttonRightCount"

// import { deleteDoc, doc, updateDoc, collection } from "firebase/firestore";
// import { firebaseApp } from "../../firebase/firebase.config";

const RightButton = () => {

    // ButtonState
    const [buttonRightCount, setButtonRightCount] = useRecoilState(buttonRightCountAtom);
    const handleClick = () => {
        setButtonRightCount(buttonRightCount + 1);
    };

    return (
        <span className="likeButton" onClick={handleClick}>
            ♥ {buttonRightCount}
        </span>
    );
};

export default RightButton;
