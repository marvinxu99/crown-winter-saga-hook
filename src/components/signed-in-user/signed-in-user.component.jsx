import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { 
  selectUserCurrentUser, 
  selectUserSignedInDateTime 
} from '../../redux/user/user.selectors';

import { SignedInUserContainer, UserName } from './signed-in-user.styles';

const SignedInUser = ({ currentUser, signedInDateTime }) => {
  const { displayName } = currentUser;
  const dt_tm = new Date(signedInDateTime).toLocaleString();
  return(
    <SignedInUserContainer>
      { `Signed in as: ` }
      <UserName>
        { `${displayName}` }
      </UserName>
      { `, since: ${dt_tm}` }
    </SignedInUserContainer> 
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectUserCurrentUser,
  signedInDateTime: selectUserSignedInDateTime
}); 

export default connect(mapStateToProps)(SignedInUser);