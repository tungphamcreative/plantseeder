import React from 'react';
import Button from '@material-ui/core/Button';
import { withFirebase } from './Firebase';

const SignOutButton = ({ firebase }) => (
  <Button variant="contained" fullWidth color="primary" onClick={firebase.doSignOut}>
    Sign Out
  </Button>
);

export default withFirebase(SignOutButton);