import React from 'react';
import { Outlet } from 'react-router-dom';

function Rank() {
  return (
    <div>
      <div>Rank</div>
      <Outlet/>
    </div>
  )
}

export default React.memo(Rank);