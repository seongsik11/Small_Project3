// UserContext.js

import React, {createContext, useState, useContext, useEffect} from "react";

const UserContext = createContext();

export const useUser = () => {
    // 이걸 통해 커스텀 훅을 사용할 수 있음 provider에 있는 value값을 지정하여 setUser로 커스텀 훅을 사용하면 해당 상태관리 변수에 값이 저장되거나 불러올 수 있음.
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // user라는 키를 가지고 있는 이메일, 비밀번호를 user에 저장
    const [nickNames, setNickNames] = useState(null); // // nickname 키를 가지고 있는 닉네임을 nickNames에 저장

    // 로컬 스토리지에서 사용자 정보 가져오기
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const storedNickName = localStorage.getItem("nickname"); // 추가
        if (storedNickName) { // 추가
            setNickNames(JSON.parse(storedNickName)); // 추가
        }
    }, []);

    return (
        // 이걸 통해서 useUser라는 커스텀훅을 이용해서 해당 값을 가져올 수도, 지정하여 값을 변경할 수 있음.
        <UserContext.Provider value={{ user, setUser, nickNames, setNickNames }}> {/* nickName 추가 */}
            {children}
        </UserContext.Provider>
    );
};