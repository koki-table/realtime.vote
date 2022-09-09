import React from "react";
import LeftButton from './LeftButton'
import RightButton from './RightButton'
import TotalCount from './TotalCount'
import RegisterName from './RegisterName'
import BothCount from './BothCount'
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
            <TotalCount/>
            <Chart/>
            <div className="both-count">
                <BothCount/>
            </div>
            <RegisterName/>
            <div className="vote">
                <LeftButton/>
                <RightButton/>
            </div>
        </div>
    );
};

export default Index;