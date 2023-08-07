import React, {useEffect, useState} from "react";
import styled, { keyframes } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {useUser} from "../UserContext";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(true);
    const { setUser, setNickNames } = useUser();

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        // 로컬 스토리지에서 사용자 정보 가져오기
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const { email: storedEmail, password: storedPassword } = JSON.parse(storedUser);
            if (email === storedEmail && password === storedPassword ) {
                // 로그인 성공 시 처리 로직 작성
                console.log("로그인 성공!");
                setUser({ email });

                // localStorage에서 nickname 가져오기

                navigate("/main");
            } else {
                setError("이메일과 비밀번호를 확인해주세요.");
            }
        } else {
            setError("회원가입을 먼저 진행해주세요.");
        }
    };

    // Ball properties
    const ballSize = 150;
    const [posX, setPosX] = useState(150); // Initial X position of the ball
    const [posY, setPosY] = useState(150); // Initial Y position of the ball
    const [velocityX, setVelocityX] = useState(5); // Initial X velocity of the ball
    const [velocityY, setVelocityY] = useState(5); // Initial Y velocity of the ball
    const bounceFactor = 1; // Adjust this value to control the bounce effect

    useEffect(() => {
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;

        const animateBall = () => {
            // Calculate new positions based on velocity
            let newX = posX + velocityX;
            let newY = posY + velocityY;

            // Check if the ball hits the horizontal edges
            if (newX < 0 || newX + ballSize > containerWidth) {
                // Reverse the X velocity to make the ball bounce back
                setVelocityX(-velocityX);
            }

            // Check if the ball hits the vertical edges
            if (newY < 0 || newY + ballSize > containerHeight) {
                // Reverse the Y velocity to make the ball bounce back
                setVelocityY(-velocityY);
            }

            // Update the position with the new values
            setPosX(newX);
            setPosY(newY);
        };

        // Start the animation loop
        const animationFrame = requestAnimationFrame(animateBall);

        return () => cancelAnimationFrame(animationFrame);
    }, [posX, posY, velocityX, velocityY, bounceFactor]);



    return (
        <Container>
            {/* Ball element */}
            <Ball posX={posX} posY={posY} ballSize={ballSize} ><Shadow/></Ball>
            <Curtain show={showForm}>
                <LoginFormContainer>
                    <LoginFormTitle>Login</LoginFormTitle>
                    <LoginForm onSubmit={handleSubmit}>
                        <FormField>
                            <InputLabel>Email</InputLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="이메일을 입력하세요"
                            />
                        </FormField>
                        <FormField>
                            <InputLabel>Password</InputLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="비밀번호를 입력하세요"
                            />
                        </FormField>
                        <LoginButton type="submit">로그인</LoginButton>
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                        <SignupLink to="/signup">회원가입</SignupLink>
                    </LoginForm>
                </LoginFormContainer>
            </Curtain>
        </Container>
    );
};

export default Login;

const Ball = styled.div`
  position: absolute;
  width: ${props => props.ballSize}px;
  height: ${props => props.ballSize}px;
  background: black;
  border-radius: 100%;
  border: 1px solid rgba(255, 255, 255, 0.32);
  top: ${props => props.posY}px;
  left: ${props => props.posX}px;
  display: block;
  margin: 0;
  background: radial-gradient(circle at 110px 90px, #E040FB, #209cff);
`;

const Shadow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0) 50%);
  transform: rotateX(90deg) translateZ(-150px);
  z-index: -1;
`;

const curtainOpen = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Curtain = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation:  ${curtainOpen} 2s ease forwards;
  pointer-events: ${props => (props.show ? "auto" : "none")};
`;

const Container = styled.div`
  width: 100%;
  height: 97.5vh;
  background: linear-gradient(to right, #82DFFF, #E040FB);
  border-radius: 8px;
  overflow: hidden;
`;

const LoginFormContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 25px;
  background-color: #f8f8f8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormField = styled.div`
  margin-bottom: 25px;
`;

const LoginFormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333333;
  font-size: 24px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 92.5%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #007bff;
  border-radius: 4px;
  color: #333333;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #0056b3;
  }

  &::placeholder {
    color: #999999;
  }
`;

const InputLabel = styled.label`
  font-size: 14px;
  color: #555555;
  margin-bottom: 5px;
`;

const LoginButton = styled.button`
  background-color: #2196F3; /* Blue */
  background-image: linear-gradient(315deg, #2196F3 0%, #75d2fc 74%);
  color: white;
  font-size: 16px;
  line-height: 40px;
  padding: 0;
  border: none;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 250px;
  height: 40px;
  margin: 0 auto;

  &:before,
  &:after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.9),
      -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
      inset -4px -4px 6px 0 rgba(255, 255, 255, 0.9),
    inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
    transition: all 0.3s ease;
  }

  &:before {
    height: 0;
    width: 1px;
  }

  &:after {
    width: 0;
    height: 1px;
  }

  &:hover {
    background-color: #0082ec; /* Teal */
    background-image: linear-gradient(315deg, #0082ec 0%, #71baff 74%);

    &:before {
      height: 100%;
    }

    &:after {
      width: 100%;
    }
  }

  span:before,
  span:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.9),
      -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
      inset -4px -4px 6px 0 rgba(255, 255, 255, 0.9),
    inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
    transition: all 0.3s ease;
  }

  span:before {
    width: 1px;
    height: 0;
  }

  span:after {
    width: 0;
    height: 1px;
  }

  span:hover:before {
    height: 100%;
  }

  span:hover:after {
    width: 100%;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  font-size: 14px;
`;

const SignupLink = styled(Link)`
  text-align: center;
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
