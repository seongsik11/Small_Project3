import React, {useEffect, useState} from "react";
import styled, {css, keyframes} from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {useUser} from "../UserContext";

const SignUpPage = () => {
    const [email, setEmail] = useState(""); // 이메일 상태
    const [password, setPassword] = useState(""); // 비밀번호 상태
    const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인
    const [nicks, setNicks] = useState(""); // 닉네임 상태
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(true);
    const [showNicknameForm, setShowNicknameForm] = useState(false); // 추가: 닉네임 폼을 보여줄지 여부
    const { setNickNames } = useUser();

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleNicknameChange = (e) => {
        setNicks(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!email) {
            setError("이메일을 입력해주세요.");
            return;
        }else if (!password) {
            setError("비밀번호를 입력해주세요.");
            return;
        }else if (!confirmPassword) {
            setError("비밀번호 확인을 입력해주세요.");
            return;
        }else if (password !== confirmPassword) {
            setError("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            return;
        }

        // 회원가입 성공 시 로컬 스토리지에 계정 정보 저장
        const user = { email, password };
        localStorage.setItem("user", JSON.stringify(user));
        // 회원가입 성공 시 처리 로직 작성
        // 예: 회원가입이 성공적으로 이루어졌다는 알림 표시 등


        // 회원가입 성공 시 닉네임 폼 보여주기
        setShowNicknameForm(true);
    };

    const handleNicknameSubmit = () => {
        // 여기에 닉네임 설정에 대한 로직을 구현합니다.
        if (!nicks) {
            setError("닉네임을 입력해주세요.");
            return;
        }

        // 닉네임 설정 성공 시 처리 로직 작성
        // 예: 닉네임 설정이 성공적으로 이루어졌다는 알림 표시 등
        console.log("닉네임 설정이 완료되었습니다!");
        // 로컬 스토리지에 닉네임 저장
        const nick = {nicks};
        localStorage.setItem("nickname", JSON.stringify(nick)); // 이렇게 닉네임을 로컬 스토리지에 저장할 때 이 값을
        setNickNames({ nicks }); // 여기 useContext에 있는 setNickNames에 해당 값을 저장하여 데이터를 업데이트 시킨다.

        // 닉네임 설정 완료 후 로그인 페이지로 이동
        navigate("/login");
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
                {showNicknameForm ? ( // 닉네임 폼 보여주기
                    <NicknameFormContainer>
                        <SignupFormTitle>NickName</SignupFormTitle>
                        <SignupForm onSubmit={handleNicknameSubmit}>
                            {/* 닉네임 입력 input */}
                            <NicknameInput
                                type="text"
                                value={nicks}
                                onChange={handleNicknameChange}
                                placeholder="닉네임을 입력하세요"
                            />
                            {/* 닉네임 설정 버튼 */}
                            <NicknameButton type="submit">
                                <span>Nickname</span>
                            </NicknameButton>
                        </SignupForm>
                    </NicknameFormContainer>
                ) : (
                    // 회원가입 폼 보여주기
                    <SignupFormContainer>
                        <SignupFormTitle>Sign Up</SignupFormTitle>
                        <SignupForm onSubmit={handleSubmit}>
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
                            <FormField>
                                <InputLabel>Confirm Password</InputLabel>
                                <Input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    placeholder="비밀번호를 다시 입력하세요"
                                />
                            </FormField>
                            <SignupButton type="submit">
                                <span>회원가입</span>
                            </SignupButton>
                            {error && <ErrorMessage>{error}</ErrorMessage>}
                            <LoginLink to="/login">로그인</LoginLink>
                        </SignupForm>
                    </SignupFormContainer>
                )}
            </Curtain>
        </Container>
    );
};

export default SignUpPage;

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

const SignupFormContainer = styled.div`
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

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormField = styled.div`
  margin-bottom: 25px;
`;

const SignupFormTitle = styled.h2`
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

const SignupButton = styled.button`
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

const LoginLink = styled(Link)`
  text-align: center;
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const NicknameFormContainer = styled.div`
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

const NicknameInput = styled.input`
  width: 92.5%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #007bff;
  border-radius: 4px;
  color: #333333;
  outline: none;
  transition: border-color 0.3s;
  margin-bottom: 10px;

  &:focus {
    border-color: #0056b3;
  }

  &::placeholder {
    color: #999999;
  }
`;

const NicknameButton = styled.button`
  background-color: #2196f3; /* Blue */
  background-image: linear-gradient(315deg, #2196f3 0%, #75d2fc 74%);
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

