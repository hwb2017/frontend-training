import React from 'react';
import Scroll from '../scroll';
import { List, ListItem } from './style';

export interface HorizonItem {
  key: string,
  name: string,
}

interface HorizonProps {
  list: HorizonItem[],
  oldVal?: string,
  title: string,
  handleClick?: Function,
}

const Horizon: React.FC<HorizonProps> = (props) => {
  const { list, oldVal, title, handleClick } = props;
  return (
    <Scroll direction='horizontal'>
      <div style={{ display: 'inline-block'}}>
        <List>
          <span>{title}</span>
          {
            list.map(item => {
              return (
                <ListItem
                  key={item.key}
                  className={oldVal === item.key ? 'selected' : ''}
                  onClick={() => handleClick?.(item.key)}
                >
                  {item.name}
                </ListItem>
              )
            })
          }
        </List>
      </div>
    </Scroll>
  )
}

Horizon.defaultProps = {
  list: [],
  oldVal: '',
  title: '',
  handleClick: () => {}
}

export default React.memo(Horizon);