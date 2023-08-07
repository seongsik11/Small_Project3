import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const LogoutButton = () => {
    const navigate = useNavigate();

    // 로그아웃 기능
    const handleLogout = () => {
        // console.log("delete!!")
        // localStorage.removeItem("user"); // 로컬 스토리지에서 사용자 정보 삭제
        navigate("/login"); // 로그인 페이지로 이동
    };

    return (
        <P onClick={handleLogout}>
            Logout
        </P>
    );
};

const P = styled.p`
  padding: 6px 0px;
  background: rgba(255, 255, 255, 0);
  
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f44336;
    color: #ffffff;
  }
`;

