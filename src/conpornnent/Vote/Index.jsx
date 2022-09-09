import React from "react";
import LeftButton from './LeftButton'
import RightButton from './RightButton'
import Chart from './Chart'
import AuthInit from '../../firebase/AuthInit'
import FirestoreInit from '../../firebase/FirestoreInit'

import { useRecoilState } from "recoil"
import { currentUserAtom } from "../../state/currentUser"


const Index = () => {

    const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);

    return (
        <div className="container">
            <FirestoreInit/>
            <AuthInit/>
            <Chart/>
            <div className="vote">
                <LeftButton/>
                <RightButton/>
            </div>
        </div>
    );
};

export default Index;