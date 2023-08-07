import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import next from '../../assets/next.png';
import previous from '../../assets/previous.png';
import play from '../../assets/play.png';
import pause from '../../assets/pause.png';
import {BiPause, BiPlay, BiSkipNext, BiSkipPrevious} from "react-icons/bi";
import {RiRepeat2Line, RiRepeatOneLine} from "react-icons/ri";

export const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isRepeatActive, setIsRepeatActive] = useState(false);
    const [tracks, setTracks] = useState([
        { title: 'Track 1', file: '/music/WXY acoustic ver. 優里Tani Yuuki.mp3' },
        { title: 'Track 2', file: '/music/優里ベテルギウス ROCK IN JAPAN FESTIVAL 2022.mp3' },
        { title: 'Track 3', file: '/music/【LIVE】レオ feat.Tani Yuuki (100万人達成記念ツアー at パシフィコ横浜).mp3' },
    ]);
    const audioRef = useRef();
    // const inputRef = useRef();

    // const [selectedFile, setSelectedFile] = useState(null);
    const [showList, setShowList] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        // setSelectedFile(file);

        // 사용자가 열기 버튼을 눌렀을 때 파일을 tracks 배열에 추가
        // 이 부분에서 원하는 데이터를 추가하도록 수정해주세요.
        if (file) {
            const newTrack = {
                title: file.name,
                file: URL.createObjectURL(file),
            };

            // 중복 체크
            if (!isDuplicateTrack(newTrack)) {
                setTracks([...tracks, newTrack]);
            } else {
                alert('이미 추가된 곡입니다.');
            }
        }
    };

    const isDuplicateTrack = (newTrack) => {
        // 이미 추가된 곡들과 선택한 파일의 이름을 비교하여 중복 여부를 체크
        return tracks.some((track) => track.title === newTrack.title);
    };

    const playPause = () => {
        setIsPlaying((prevState) => !prevState);
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
    };

    const previousTrack = () => {
        if (currentTrackIndex > 0) {
            setCurrentTrackIndex((prevIndex) => prevIndex - 1);
        } else {
            setCurrentTrackIndex(tracks.length - 1);
        }
    };

    const nextTrack = () => {
        if (currentTrackIndex < tracks.length - 1) {
            setCurrentTrackIndex((prevIndex) => prevIndex + 1);
        } else {
            setCurrentTrackIndex(0);
        }
    };

    const playMusic = (index) => {
        setCurrentTrackIndex(index);
        setIsPlaying(true); // Start playing the selected music
    };

    const handleProgressChange = (e) => { // 음악 재생 바 재생 위치
        const newTime = e.target.value;
        setCurrentTime(newTime);
        audioRef.current.currentTime = newTime;
    };

    const toggleRepeat = () => {
        setIsRepeatActive((prevState) => !prevState);
    };

    useEffect(() => {
        audioRef.current.src = tracks[currentTrackIndex].file;
        if (isPlaying) {
            audioRef.current.play();
        }
    }, [currentTrackIndex]);

    useEffect(() => {
        const handleEnded = () => {
            if (isRepeatActive) {
                setCurrentTime(0);
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            } else {
                if (currentTrackIndex < tracks.length - 1) {
                    setCurrentTrackIndex((prevIndex) => prevIndex + 1);
                } else {
                    setCurrentTrackIndex(0);
                }
            }
        };

        audioRef.current.addEventListener('ended', handleEnded);

        return () => {
            if (audioRef.current !== null) {
                audioRef.current.removeEventListener('ended', handleEnded);
            }
        };
    }, [currentTrackIndex, tracks, isRepeatActive]);

    useEffect(() => {
        const handleTimeUpdate = () => {
            setCurrentTime(audioRef.current.currentTime);
        };

        const handleLoadedMetadata = () => {
            setDuration(audioRef.current.duration);
        };

        audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            if (audioRef.current !== null) {
                audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
                audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
            }
        };
    }, []);

    return (
        <PlayerContainer>
            <div>
                <AddButton htmlFor="music_upload" >
                    곡 추가 +
                </AddButton>
                <input id="music_upload" type="file" accept="audio/*" onChange={handleFileChange} style={{display:"none"}}/>
            </div>
            <RepeatButton onClick={toggleRepeat}>
                {isRepeatActive ? <RiRepeatOneLine size={20} color={"#fff"} /> : <RiRepeat2Line size={20} color={"#fff"} />}
            </RepeatButton>
            <RadioIconWrapper>
                <RadioIcon className={isPlaying ? 'playing' : ''} />
            </RadioIconWrapper>
            <TrackInfo>
                <TrackTitle>
                    {tracks[currentTrackIndex].title}
                </TrackTitle>
                <div style={{ cursor: "pointer" }}>
                    <MusicBar type="range" value={currentTime} max={duration} onChange={handleProgressChange} />
                </div>
            </TrackInfo>
            <Controls>
                <Button onClick={previousTrack}>
                    <BiSkipPrevious size={28} color={"#fff"} />
                </Button>
                <Button onClick={playPause}>
                    {isPlaying ? <BiPause size={28} color={"#fff"} /> : <BiPlay size={28} color={"#fff"} />}
                </Button>
                <Button onClick={nextTrack}>
                    <BiSkipNext size={28} color={"#fff"} />
                </Button>
            </Controls>
            <ListButton onClick={() => setShowList(!showList)}>Show List</ListButton>
            <Wrapper visible={showList}>
                {showList && (
                    <MusicList>
                        <ListHeader>My Playlist</ListHeader>
                        {tracks.map((track, index) => (
                            <ListItem key={index} selected={currentTrackIndex === index}
                                      onClick={() => playMusic(index)}>
                                {track.title}
                            </ListItem>
                        ))}
                    </MusicList>
                )}
            </Wrapper>
            <audio ref={audioRef} />
        </PlayerContainer>
    );
};

const Img = styled.img`
    width: 12px;
    height: 12px;
`;

const AddButton = styled.label`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 40px;
  text-align: center;
  line-height: 15px;
  height: 15px;
  font-size: 11px;
  font-weight: bold;
  color: #00f7ff;

  &:hover {
    color: #07d3d3;
    transition: color 0.3s ease-in-out;
  }
`;

const MusicList = styled.div`
  max-width: 140px;
  width: 140px;
  margin-top: 16px;
  border: 1px solid rgba(12, 12, 12, 0.21);
  border-radius: 8px;
`;

const ListHeader = styled.h3`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  padding: 8px;
  margin: 0;
  background-color: #00e1e1;
  color: #fff;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
`;

const ListItem = styled.div`
  padding: 8px;
  background-color: ${(props) => (props.selected ? '#00e1e1' : 'transparent')};
  border: 1px solid ${(props) => (props.selected ? '#fff' : 'transparent')};
  color: ${(props) => (props.selected ? '#fff' : '#000')};
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: #00e1e1;
    border: 1px solid #fff;
    color: #fff;
    transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out;
  }
`;

const PlayerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 16px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
`;

const RadioIconWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border: 4px solid #333;
  border-radius: 50%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RadioIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #333;

  &.playing {
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const TrackInfo = styled.div`
  margin-top: 16px;
`;

const TrackTitle = styled.h3`
  font-size: 20px;
  margin: 0;
  text-align: center;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 130px; /* Adjust this value according to your preference */
`;

const Controls = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center; // 수정된 부분
`;

const Button = styled.button`
  width: 32px;
  height: 32px;
  background: none;
  padding: 0;
  margin: 0 8px;
  cursor: pointer;
  outline: none;
  text-align: center;
  font-size: 16px;
  border-radius: 30px;
  border: 1.5px solid #fff;

  &:hover {
    background: #07d3d3;
    transition: background 0.3s ease-in-out;
  }
`;

const RepeatButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  outline: none;
`;

const MusicBar = styled.input`
  width: 100%;
  height: 10px;
  appearance: none;
  background-color: rgba(12, 12, 12, 0.5);
  outline: none;
  border-radius: 5px;

  ::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    background-color: #ffffff;
    border-radius: 50%;
  }
  
`;

const ListButton = styled.div`
  margin-top: 15px;
  width: 100px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  background: none;
  border-radius: 8px;
  border: 1.5px solid #333;
  color: #333;
  font-size: 12px;
  font-weight: bold;
  
  &:hover {
    border: 1.5px solid #fff;
    color: #fff;
    background: #00e1e1;
    transition: border 0.3s ease-in-out, color 0.3s ease-in-out, background 0.3s ease-in-out;
  }
`;

const Wrapper = styled.div`
  opacity: ${({visible}) => (visible ? 1 : 0)};
  transition: opacity 4s;
`;




