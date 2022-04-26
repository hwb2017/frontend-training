import React, { useState } from 'react';
import HorizonItem from '../../components/horizon_item';
import Scroll from '../../components/scroll';
import { categoryTypes, alphaTypes } from '../../api/config';
import { 
  NavContainer,
  ListContainer,
  List,
  ListItem,
} from './style';

function Singers() {
  const [category, setCategory] = useState('');
  const [alpha, setAlpha] = useState('');

  const handleUpdateCategory = (val: string) => {
    setCategory(val);
  }
  const handleUpdateAlpha = (val: string) => {
    setAlpha(val);
  }

  const singerList = Array.from({ length: 12 }).map(() => {
    return {
      picUrl: "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
      name: "隔壁老樊",
      accountId: 277313426,
    }
  });
  const renderSingerList = () => {
    return (
      <List>
        {
          singerList.map((item, index) => {
            return (
              <ListItem key={`${item.accountId}${index}`}>
                <div className='img_wrapper'>
                  <img src={`${item.picUrl}?param=300x300`} alt="music" />
                </div>
                <span className='name'>{item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  } 
  return (
    <>
      <NavContainer>
        <HorizonItem 
          list={categoryTypes} 
          title="分类 (默认热门):"
          handleClick={handleUpdateCategory}
          oldVal={category}
        />
        <HorizonItem
          list={alphaTypes}
          title="首字母:"
          handleClick={handleUpdateAlpha}
          oldVal={alpha}
        />
      </NavContainer>
      <ListContainer>
        <Scroll>
          { renderSingerList() }
        </Scroll>
      </ListContainer>
    </>
  )
}

export default React.memo(Singers);