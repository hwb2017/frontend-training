import React, { useEffect } from 'react';
import Slider from '../../components/slider';
import RecommendList from '../../components/list';
import Scroll from '../../components/scroll';
import { Content } from './style';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
  getBannerList,
  getRecommendList,
  selectBannerList,
  selectRecommendList,
  selectRecommendStatus,
} from './store/recommendSlice';
import Loading from '../../baseUI/loading';

function Recommend() {
  // mock数据
  // const bannerList = Array.from({ length: 4 }).map(item => {
  //   return { imageUrl: "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg" }
  // });
  // const recommendList = Array.from({ length: 10}).map(item => {
  //   return {
  //     id: 1,
  //     picUrl: "https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg",
  //     playCount: 17171122,
  //     name: "朴树、许巍、李健、郑钧、老狼、赵雷"
  //   }
  // });
  const bannerList = useAppSelector(selectBannerList);
  const recommendList = useAppSelector(selectRecommendList);
  const recommendStatus = useAppSelector(selectRecommendStatus);
  const isRecommendLoading = recommendStatus === 'loading';
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (bannerList.length == 0) {
      dispatch(getBannerList());
    }
    if (recommendList.length == 0) {
      dispatch(getRecommendList());
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Content>
      <Scroll>
        <div>
          <Slider bannerList={bannerList} />
          <RecommendList recommendList={recommendList} />
        </div>
      </Scroll>
      { isRecommendLoading ? <Loading /> : null }
    </Content>
  )
}

export default React.memo(Recommend);