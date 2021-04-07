import React, { useState, useEffect } from 'react';
import {
  Backdrop,
  CircularProgress,
  Paper,
  Typography
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import { Redirect, useLocation } from 'react-router';
import webServiceProvider from 'helpers/webServiceProvider';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type TverificationStatus = 'success' | 'pending' | 'error';

const ConfirmPage = (): JSX.Element => {
  const classes = useStyles();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const [
    verificationStatus,
    setVerificationStatus
  ] = useState<TverificationStatus>('pending');

  const validateToken = async () => {
    try {
      await webServiceProvider.get(`user${location.pathname}`);
      enqueueSnackbar('confirmedSuccessfully', {
        variant: 'success'
      });
      setVerificationStatus('success');
    } catch (err) {
      setVerificationStatus('error');
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  if (verificationStatus === 'success') {
    return <Redirect to="/login" />;
  }

  if (verificationStatus === 'error') {
    return (
      <div>
        <h5>Error 404: User not found!</h5>
      </div>
    );
  }

  return (
    <Backdrop open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default ConfirmPage;
