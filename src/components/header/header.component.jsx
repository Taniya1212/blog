import React from 'react';
import {connect} from 'react-redux';
import {ReactComponent as Logo} from '../../assets/original.svg'
import {auth} from '../../firebase/firebase.utils';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../../redux/user/user.selector';
import { LogoContainer,OptionLink,OptionsContainer,HeaderContainer,LogoNameContainer } from './header.styles.jsx';


const Header = ({currentUser}) => (

<HeaderContainer>
<LogoContainer to = "/">
    <Logo className='logo'></Logo>
</LogoContainer>

<LogoNameContainer> 
   BLOGGERS POINT
</LogoNameContainer>

<OptionsContainer>
    <OptionLink to = "/">
    SUBSCRIBE
    </OptionLink>
    <OptionLink to = "/write">
    WRITE
    </OptionLink>
    {
        
        currentUser ? 
        <OptionLink onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
        :
        <OptionLink as= 'div' to = "/signin">SIGN IN</OptionLink>
    }

</OptionsContainer>

</HeaderContainer>
);

const mapStateToProps = createStructuredSelector ({
    currentUser : selectCurrentUser,

})


export default connect(mapStateToProps)(Header);
