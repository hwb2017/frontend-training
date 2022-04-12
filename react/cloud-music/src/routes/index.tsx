import { Navigate, useRoutes } from 'react-router-dom';
import Home from '../application/Home';
import Recommend from '../application/Recommend';
import Singers from '../application/Singers';
import Rank from '../application/Rank';

function Routes() {
  return useRoutes([
    {
      path: "/",
      element: <Home/>,
      children: [
        {
          path: "/recommend",
          element: <Recommend/>
        },
        {
          path: "/singers",
          element: <Singers/>
        },
        {
          path: "/rank",
          element: <Rank/>
        },
        {
          index: true,
          element: <Navigate to="/recommend" replace />
        }
      ]
    }
  ])
}

export default Routes;