
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import styled from "styled-components";

const UserMenu = ({user, nickNames, showUserMenu}) => {

    const navigate = useNavigate();

    // 로그아웃 기능
    const handleLogout = () => {
        // console.log("delete!!")
        // localStorage.removeItem("user"); // 로컬 스토리지에서 사용자 정보 삭제
        navigate("/login"); // 로그인 페이지로 이동
    };

    return (
        <MenuContainer visible={showUserMenu}>
            <NickItem>
                <p>{nickNames.nicks}</p>
            </NickItem>
            <EmailItem>
                <p style={{fontSize:"13px"}}><span style={{fontWeight:"bold"}}>E-mail:</span> {user.email}</p>
            </EmailItem>
            <MenuItem>
                <p style={{color:"white", fontSize:"12px"}}>setting</p>
            </MenuItem>
            <LogoutItem onClick={handleLogout}>
                Logout
            </LogoutItem>
            {/* 여기에 설정 등 다른 기능 추가 가능 */}
        </MenuContainer>
    );
};

const MenuContainer = styled.div`
  width: 210px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  padding: 0;
  position: absolute;
  top: 30px;
  right: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  opacity: ${({visible}) => (visible ? 1 : 0)};
  transition: opacity 1s;
`;

const EmailItem = styled.div`
  height: 35px;
  line-height: 35px;
  padding: 0 10px;
  cursor: pointer;
  font-weight: bold;
  color: #e9e9e9;
`;

const MenuItem = styled.div`
  height: 35px;
  line-height: 35px;
  padding: 0 10px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
  
  &:hover {
    background: rgba(0, 0, 0, 0.35);
  }
`;

const NickItem = styled.div`
  height: 35px;
  line-height: 35px;
  padding: 0 10px;
  cursor: pointer;
  color: #ffdc54;
  font-weight: bold;
  transition: background 0.3s;
`;

const LogoutItem = styled.p`
  margin: 0;
  height: 35px;
  line-height: 24px;
  padding: 5px 10px;
  background: rgba(255, 255, 255, 0);
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  transition: background-color 0.3s, border 0.3s;
  box-sizing: border-box;

  &:hover {
    border: 0.1px solid #fff;
    background-color: rgba(255, 58, 43, 0.71);
    color: #ffffff;
  }
`;


export default UserMenu;