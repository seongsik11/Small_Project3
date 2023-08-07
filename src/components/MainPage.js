import React, {useEffect, useState} from "react";
import moment from "moment/moment";
import Swal from "sweetalert2";
import {MusicPlayer} from "./templates/MusicPlayerTemplate";
import {FaCalculator} from "react-icons/fa";
import MemoTemplate from "./templates/MemoTemplate";
import Calculator from "./templates/CalculatorTemplate";
import Clock from "./Clock/Clock";
import TodoListTemplate from "./TodoListTemplate";
import Form from "./Form";
import TodoItemList from "./TodoItemList";
import Weather from "./Weather";
import styled from "styled-components";
import {animated} from "react-spring";
import "../App.css";
import {useNavigate} from "react-router-dom";
import {UserProvider, useUser} from "../UserContext";
import {LogoutButton} from "./atoms/LogoutButton";
import UserMenu from "../UserMenu";
import UserProfile from "../assets/user.png"

export default function MainPage() {
    const {user, nickNames} = useUser();
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState([]);
    const [showEmptyMessage, setShowEmptyMessage] = useState(true);
    const [showButtons, setShowButtons] = useState(false);
    const [selectedAll, setSelectedAll] = useState(false);
    const [isTodoListVisible, setIsTodoListVisible] = useState(false);
    const [isWeatherVisible, setIsWeatherVisible] = useState(false);
    const [isMusicVisible, setIsMusicVisible] = useState(false);
    const [icon, setIcon] = useState(false);
    const [backgroundStyle, setBackgroundStyle] = useState({
        background: "linear-gradient(135deg, #FFB2A7, #FFD9A7, #E3FFA7)",
        // animation: "gradientAnimation 5s infinite",
    });
    const [memo, setMemo] = useState(false);
    const [close, setClose] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            const currentTime = moment();
            if (
                currentTime.isBetween(
                    moment("05:00", "HH:mm"),
                    moment("11:59", "HH:mm")
                )
            ) {
                setBackgroundStyle({
                    background: "linear-gradient(135deg, #FFB2A7, #FFD9A7, #E3FFA7)",
                    // animation: `${gradientAnimation} 5s infinite`,
                });
            } else if (
                currentTime.isBetween(
                    moment("12:00", "HH:mm"),
                    moment("17:59", "HH:mm")
                )
            ) {
                setBackgroundStyle({
                    background:
                        "linear-gradient(135deg, #D7ECFF, #B3D6FF, #9AD9FF, #76CFFF, #53B8FF, #309FFF)",
                    // animation: `${gradientAnimation} 5s infinite`,
                });
            } else {
                setBackgroundStyle({
                    background: "linear-gradient(135deg, #D8B2FF, #FFB2E1, #FFB2A7)",
                    // animation: `${gradientAnimation} 5s infinite`,
                });
            }
        }, 0);

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTodoListVisible(true);
            setIsWeatherVisible(true);
            setIsMusicVisible(true);
            setIcon(true);
        }, 1000);

        return () => {
            clearTimeout(timer);
            setIsTodoListVisible(false);
            setIsWeatherVisible(false);
            setIsMusicVisible(false);
            setIcon(false);
        };
    }, []);

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleCreate = () => {
        if (input !== "") {
            setTodos((prevTodos) => [
                ...prevTodos,
                {id: prevTodos.length, text: input, checked: false},
            ]);
            setInput("");
            setShowEmptyMessage(false);
        } else {
            window.alert("Please enter the content");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleCreate();
        }
    };

    const handleToggle = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? {...todo, checked: !todo.checked} : todo
            )
        );
    };

    const handleRemove = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        setShowEmptyMessage(todos.length === 1);
    };

    const handleToggleAll = () => {
        setSelectedAll((prevSelectedAll) => !prevSelectedAll);
        const allChecked = todos.every((todo) => todo.checked);
        setTodos((prevTodos) =>
            prevTodos.map((todo) => ({
                ...todo,
                checked: !allChecked,
            }))
        );
    };

    const handleRemoveAll = () => {
        Swal.fire({
            title: "할 일 목록 삭제",
            text: "정말로 전체 삭제하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#9dacb6",
            confirmButtonText: "삭제",
            cancelButtonText: "취소",
        }).then((result) => {
            if (result.isConfirmed) {
                if (todos.length !== 0) {
                    setTodos([]);
                    Swal.fire("Deleted!", "삭제되었습니다.", "success");
                } else {
                    Swal.fire("warning", "삭제할 목록이 없습니다.", "question");
                }
            }
        });
    };

    const [clicks, setClicks] = useState([]);

    const handlePointerClick = (e) => {
        const {clientX, clientY} = e;
        const click = {
            x: clientX,
            y: clientY,
            id: new Date().getTime(),
            timer: null,
        };

        setClicks((prevClicks) => [...prevClicks, click]);

        click.timer = setTimeout(() => {
            setClicks((prevClicks) => prevClicks.filter((c) => c.id !== click.id));
        }, 1000);
    };


    const handleUserIconClick = () => {
        setShowUserMenu(!showUserMenu);
    };




    return (
            <AppContainer id="App" style={backgroundStyle} onClick={handlePointerClick}>
                {clicks &&
                    clicks.map((click) => (
                        <div
                            key={click.id}
                            className="pointer"
                            style={{left: click.x, top: click.y}}
                        ></div>
                    ))}
                <MusicWrapper>
                    <AnimatedMusicBox visible={isMusicVisible}>
                        <MusicPlayer />
                    </AnimatedMusicBox>
                </MusicWrapper>
                <CalIcon visible={icon} onClick={() => setClose(true)}>
                    <FaCalculator size={25}/>
                </CalIcon>
                <UserWrapper visible={showUserMenu}>{showUserMenu && <UserMenu user={user} nickNames={nickNames} showUserMenu={showUserMenu} setShowUserMenu={setShowUserMenu} />}</UserWrapper>
                <UserIcon visible={icon} onClick={handleUserIconClick}>
                    <img src={UserProfile} alt="user" style={{width: 38, height:38}} draggable={false}/>
                </UserIcon>
                <MemoWrapper>
                    <AnimatedMemoTemplate visible={memo}>
                        {memo && <MemoTemplate memo={memo} setMemo={setMemo}/>}
                    </AnimatedMemoTemplate>
                </MemoWrapper>
                <CalculatorWrapper visible={close}>
                    {close && <Calculator setClose={setClose}/>}
                </CalculatorWrapper>
                <ContentWrapper>
                    <ClockBox>
                        <Clock/>
                    </ClockBox>
                    <TodoListWrapper>
                        <TodoListContainer>
                            <AnimatedTodoListTemplate visible={isTodoListVisible}>
                                <TodoListTemplate
                                    form={
                                        <Form
                                            value={input}
                                            onKeyPress={handleKeyPress}
                                            onChange={handleChange}
                                            onCreate={handleCreate}
                                        />
                                    }
                                    onAllToggle={handleToggleAll}
                                    onAllRemove={handleRemoveAll}
                                    showButtons={showButtons}
                                    setShowButtons={setShowButtons}
                                    memo={memo}
                                    setMemo={setMemo}
                                >
                                    {showEmptyMessage ? (
                                        <Warn>오늘 할 일을 리스트로 작성해보세요</Warn>
                                    ) : (
                                        <TodoItemList
                                            todos={todos}
                                            onToggle={handleToggle}
                                            onRemove={handleRemove}
                                            onAllToggle={handleToggleAll}
                                            onAllRemove={handleRemoveAll}
                                        />
                                    )}
                                </TodoListTemplate>
                            </AnimatedTodoListTemplate>
                        </TodoListContainer>
                    </TodoListWrapper>
                </ContentWrapper>

                <WeatherBox>
                    <AnimatedWeatherBox visible={isWeatherVisible}>
                        <Weather/>
                    </AnimatedWeatherBox>
                </WeatherBox>
            </AppContainer>
    );
}

const AppContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 97.5vh;
  user-select: none;
  border-radius: 8px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MemoWrapper = styled.div`
  position: fixed;
  left: 34vw;
  top: 40vh;
  z-index: 9999;
`;

const CalculatorWrapper = styled.div`
  position: fixed;
  right: 15vw;
  z-index: 9999;
  opacity: ${({visible}) => (visible ? 1 : 0)};
  transition: opacity 1s;

  @media screen and (max-width: 2500px) {
    right: 5vw;
  }
`;

const ClockBox = styled.div`
  width: 511px;
  height: 250px;
  line-height: 250px;
  text-align: center;
  margin-bottom: 250px;
`;

const TodoListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TodoListContainer = styled.div`
  width: 400px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);
`;

const WeatherBox = styled.div`
  position: fixed;
  bottom: -305px;
  right: 10px;

`;

const Warn = styled.p`
  line-height: 120px;
  text-align: center;
  color: #e1e1e1;
`;

const AnimatedMemoTemplate = animated(styled.div`
  opacity: ${({visible}) => (visible ? 1 : 0)};
  transition: opacity 1s;
`);

const AnimatedTodoListTemplate = animated(styled.div`
  opacity: ${({visible}) => (visible ? 1 : 0)};
  transition: opacity 2s;
`);

const AnimatedWeatherBox = animated(styled.div`
  opacity: ${({visible}) => (visible ? 1 : 0)};
  transition: opacity 2s;
`);

const AnimatedMusicBox = animated(styled.div`
  opacity: ${({visible}) => (visible ? 1 : 0)};
  transition: opacity 2s;
`);

const CalIcon = styled.div`
  position: fixed;
  top: 29px;
  left: 210px;
  z-index: 9998;
  cursor: pointer;
  color: white;
  opacity: ${({visible}) => (visible ? 1 : 0)};
  transition: opacity 2s;

  &:hover {
    color: #c9c9c9;
    transition: color 0.3s ease-in-out;
  }
`;


const UserIcon = styled.div`
  position: fixed;
  top: 32px;
  right: 45px;
  font-size: 24px;
  cursor: pointer;
  z-index: 9999;
  opacity: ${({visible}) => (visible ? 1 : 0)};
  transition: opacity 2s;
`;

const UserWrapper = styled.div`
  position: fixed;
  top:-10px;
  right: 10px;
  opacity: ${({visible}) => (visible ? 1 : 0)};
  transition: opacity 1s;
  z-index: 9999;
`;

const MusicWrapper = styled.div`
  position: fixed;
  top: 20px;
  left: 30px;
  z-index: 9998;
`;


