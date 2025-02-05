import {useEffect} from "react";
import {useStore} from "../hooks/useStore.ts";
import styled from "@emotion/styled";
import {profilePicture} from "../utils/functions.ts";

export default function ChooseAvatar() {

    const getAvatar = useStore((state) => state.getAvatar);
    const avatarName = useStore((state) => state.avatarName);
    const setAvatar = useStore((state) => state.setAvatar);

    useEffect(() => {
        getAvatar();
    }, [getAvatar, avatarName]);

    const avatarNames = [
        "takato", "aiba", "arata", "eri", "haru", "hiro",
        "matt", "minoru", "rina", "saki", "tai", "takumi"
    ];

    function getAvatarIndex(avatarName: string) {
        return avatarNames.indexOf(avatarName);
    }

    function setNextAvatar(avatarName: string) {
        const currentIndex = getAvatarIndex(avatarName);
        const nextIndex = (currentIndex + 1) % avatarNames.length;
        setAvatar(avatarNames[nextIndex]);
    }

    function setPreviousAvatar(avatarName: string) {
        const currentIndex = getAvatarIndex(avatarName);
        const previousIndex = (currentIndex - 1 + avatarNames.length) % avatarNames.length;
        setAvatar(avatarNames[previousIndex]);
    }

    return (
        <Container>
            <StyledButton style={{padding:"0px 8px 6px 0px"}} onClick={() => setPreviousAvatar(avatarName)}>{`❮`}</StyledButton>
            <StyledImage alt="avatar" src={profilePicture(avatarName)}></StyledImage>
            <StyledButton style={{padding:"0px 0px 6px 8px"}} onClick={() => setNextAvatar(avatarName)}>{`❯`}</StyledButton>
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100vw;
  
    @media (max-width: 766px) {
      transform: scale(0.8)
    }
`;

const StyledImage = styled.img`
    border-radius: 50%;
`;

const StyledButton = styled.button`
  margin: 20px;
  font-size: 50px;
  height: 100px;
  color: ghostwhite;
  background: none;
  border: 1px solid ghostwhite;
  width: 100px;
  border-radius: 50%;
  transition: border 0.2s ease, filter 0.1s ease;

  :focus {
    outline: none;
  }

  :hover {
    cursor: pointer;
    border: 4px solid ghostwhite;
  }
  
  :active {
    border-width: 3px;
    filter: drop-shadow(0px 0px 2px ghostwhite);
  }

  @media (max-width: 766px) {
    border: none;
    padding: 0;
    margin: 0;
  }
`;