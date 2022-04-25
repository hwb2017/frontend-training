import React, { useState } from 'react';
import HorizonItem from '../../components/horizon_item';
import { categoryTypes, alphaTypes } from '../../api/config';
import { NavContainer } from './style';

function Singers() {
  const [category, setCategory] = useState('');
  const [alpha, setAlpha] = useState('');

  const handleUpdateCategory = (val: string) => {
    setCategory(val);
  }
  const handleUpdateAlpha = (val: string) => {
    setAlpha(val);
  }
  return (
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
  )
}

export default React.memo(Singers);