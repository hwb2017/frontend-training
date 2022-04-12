import React from 'react';
import { Outlet } from 'react-router-dom';

function Singers() {
  return (
    <div>
      <div>Singers</div>
      <Outlet/>
    </div>
  )
}

export default React.memo(Singers);