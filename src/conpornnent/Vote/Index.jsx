import React from "react";
import LeftButton from './LeftCount'
import RightButton from './RightCount'
import TotalCount from './TotalCount'
import RegisterName from './RegisterName'
import BothCount from './BothCount'
import Chart from './Chart'
import Ranking from './PersonalData'
import AuthInit from '../../firebase/AuthInit'
import FirestoreInit from '../../firebase/FirestoreInit'

const Index = () => {
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
            <Ranking/>
        </div>
    );
};

export default Index;