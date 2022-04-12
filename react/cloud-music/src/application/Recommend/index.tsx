import React from 'react';
import { Outlet } from 'react-router-dom';

function Recommend() {
  return (
    <div>
      <div>Recommend</div>
      <Outlet/>
    </div>
  )
}

export default React.memo(Recommend);