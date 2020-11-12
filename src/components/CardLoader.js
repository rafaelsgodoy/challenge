import { Skeleton } from '@material-ui/lab';
import React from 'react';

const CardLoader = () => {
  return (
    <>
      <Skeleton style={{ float: 'right' }} variant="circle" width={60} height={60} />

      <Skeleton width="10%" />
      <Skeleton width="20%" height={30} animation={false} />
      <Skeleton width="20%" style={{ marginTop: '10px' }} animation="wave" />
      <Skeleton width="40%" animation="wave" />
    </>
  );
};

export default CardLoader;
