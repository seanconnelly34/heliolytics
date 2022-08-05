import React from "react";
import { Container } from "@mui/system";
import TMDBLogo from "../assets/tmdbLogo.svg";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  margin: 16px 0px;
  img {
    width: 200px;
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Container>
        <img src={TMDBLogo} alt='TMDB logo movie database' />
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
