import React from "react";
import { useRecoilState } from "recoil"
import { doc, updateDoc, collection, where, query, getDocs  } from "firebase/firestore";
import { firebaseApp } from "../../firebase/firebase.config";
import { currentUserAtom } from "../../state/currentUser"
import { nameAtom } from "../../state/name"
import { detailNameAtom } from "../../state/detailName"

const RegisterName = () => {

    // database(firestoreの参照)
    const firestoreData = collection(firebaseApp.firestore, 'users');

    const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
    const [name, setName] = useRecoilState(nameAtom);
    const [detailName, setDetailName] = useRecoilState(detailNameAtom);
    
    const Register = async () => {
        const q = query(firestoreData, where("userId", "==", `${currentUser}`));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data().name);
            setName(doc.data().name)
        });
    };

    Register()

    const handleNewName = (event) => {
        console.log(event.target.value);
        setDetailName(event.target.value);
    };

    const handleSubmit = async(event) => { 
        event.preventDefault();

        if (detailName === '') {
            alert('入力必須');
            return;
        }; 

        console.log(detailName);

        setName(detailName)

        const nameRef = doc(firestoreData, currentUser);

        console.log(`${detailName}`);

        await updateDoc(nameRef, {
            "name" : `${detailName}`
        });

        setDetailName('');
    };

    return (
        <div className="register-name">
            投票者：{name}

            <form className="register-name-inner" onSubmit={handleSubmit}>
                {/* <label>name</label> */}
                <input className='register-input' value={detailName} placeholder="名前を入力してください。" 
                    onChange={handleNewName}/>
                <button className='btn register-btn' onChange={handleNewName}>更新</button>
            </form>
        </div>
        
    );
};

export default RegisterName;
