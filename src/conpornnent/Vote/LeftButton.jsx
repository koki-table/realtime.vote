import React from "react";
import { useRecoilState } from "recoil"
import { buttonLeftCountAtom } from "../../state/buttonLeftCount"

// import { deleteDoc, doc, updateDoc, collection } from "firebase/firestore";
// import { firebaseApp } from "../../firebase/firebase.config";

const LeftButton = () => {

    // ButtonState
    const [buttonLeftCount, setButtonLeftCount] = useRecoilState(buttonLeftCountAtom);
    const handleClick = () => {
        setButtonLeftCount(buttonLeftCount + 1);
    };

    return (
        <span className="likeButton" onClick={handleClick}>
            ♥ {buttonLeftCount}
        </span>
    );
};

export default LeftButton;
