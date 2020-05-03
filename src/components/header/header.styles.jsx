import styled from 'styled-components';
import {Link} from 'react-router-dom';



export const HeaderContainer = styled.div`
height: 70px;
width: 100%;
display: flex;
justify-content: space-between;
margin-bottom: 25px;
background-color: #E1E5EA;
`;

export const LogoContainer = styled(Link)`
      height: 100%;
      width: 70px;
      padding: 25px;
      `;

export const LogoNameContainer = styled.div`
      padding: 24px;
      font-size: 23px;
      font-family: cursive;
      font-weight: bold;
      padding-top: 29px;
      margin-left: -240px
      `;

export const OptionsContainer = styled.div`
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      `;


export const OptionLink = styled(Link)`
padding: 10px 15px;
cursor: pointer;
`;
