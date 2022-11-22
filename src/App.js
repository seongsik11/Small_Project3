import TodoListTemplate from "./components/TodoListTemplate";
import Form from "./components/Form";
import TodoItemList from "./components/TodoItemList";
import React, {Component} from "react";
import Weather from "./components/Weather";
import styled from "styled-components";
import "./App.css";
import Img1 from './SVG/hd-wallpaper-g84ec5a380_1920_adobe_express.svg';
import Img2 from './SVG/panoramic-g9d542d7d1_1920.jpg';
import Img3 from './SVG/nature-g07fba8fd6_1920.jpg';
import Clock from "./components/Clock/Clock";
// import Tetris from "./components/TetrisGame/components/Testris";



    const backgroundArr = [Img1, Img2, Img3];

    const randomIndex = Math.floor(Math.random() * backgroundArr.length);

    const backgroundImg = backgroundArr[randomIndex];

class App extends Component {

    id = 3

    state = {
        input: '',
        todos: [
            {id: 0, text: '일찍 일어나기 -필수', checked: false},
            {id: 1, text: '공부하기 - 필수', checked: false},
            {id: 2, text: '잠자기 - 필수', checked: false}
        ]
    }

    handleChange = (e) => {
        this.setState({
            input: e.target.value // input 의 다음 바뀔 값
        });
    }

    handleCreate = () => {
        const {input, todos} = this.state;

        if (input !== "") {
            this.setState({
                input: '', // 인풋 비우고
                // concat 을 사용하여 배열에 추가
                todos: todos.concat({
                    id: this.id++,
                    text: input,
                    checked: false
                })
            });
        } else {
            window.alert("Please enter the content")
        }
    }

    handleKeyPress = (e) => {
        // 눌려진 키가 Enter 면 handleCreate 호출
        if(e.key === 'Enter') {
            this.handleCreate();
        }
    }

    handleToggle = (id) => {
        const {todos} = this.state;

        // 파라미터로 받은 id를 가지고 몇 번째 아이템인지 찾습니다.
        const index = todos.findIndex(todo => todo.id === id);
        const selected = todos[index]; // 선택한 객체

        const nextTodos = [...todos]; // 배열을 복사

        // 기존의 값들을 복사하고, checked 값을 덮어쓰기
        nextTodos[index] = {
            ...selected,
            checked: !selected.checked
        };

        this.setState({
            todos: nextTodos
        });
    }

    handleRemove = (id) => {
        const {todos} = this.state;
        this.setState({
            todos: todos.filter(todo => todo.id !== id)
        });
    }

    render() {
        const {input, todos} = this.state;
        const {
            handleChange,
            handleCreate,
            handleKeyPress,
            handleToggle,
            handleRemove
        } = this;

        return (
            <div>
                <img src={backgroundImg} style={{opacity:"0.7"}}/>

                <ClockBox>
                    <Clock/>
                </ClockBox>

                <WeatherBox>
                    <Weather/>
                </WeatherBox>

                    <TodoListTemplate form={(
                        <Form
                            value={input}
                            onKeyPress={handleKeyPress}
                            onChange={handleChange}
                            onCreate={handleCreate}
                        />
                    )}>
                        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
                    </TodoListTemplate>
            </div>
        );
    }
}

const WeatherBox = styled.div`
    position: absolute;
    height:81px;
    top: 143%;
    right: 1%;
    
    
`;

const ClockBox = styled.div`
    position:absolute;
    top:40%;
    left: 50%;
    
    transform: translate(-50%, -50%);
    
    width: 511px;
    height: 250px;
    line-height: 280px;
    
    text-align: center;
    
    @media screen and (max-width: 2000px) {
        top:30%;
        left: 50%; 
    }
}
`;


export default App;
