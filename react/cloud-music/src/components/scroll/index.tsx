import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle } from 'react';
import BScroll from '@better-scroll/core';
import type { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll';
import type { TranslaterPoint } from '@better-scroll/core/dist/types/translater';
import type { ReactElement } from 'react'; 
import ObserveDOM from '@better-scroll/observe-dom';
import PullUp from '@better-scroll/pull-up';
import PullDown from '@better-scroll/pull-down';
import ScrollContainer from './style';

BScroll.use(ObserveDOM);

interface ScrollProps {
  direction?: 'vertical' | 'horizontal',
  click?: boolean,
  onScroll?: Function | null,
  pullUp?: Function | null,
  pullDown?: Function | null,
  pullUpLoading?: boolean,
  pullDownLoading?: boolean,
  bounceTop?: boolean,
  bounceBottom?: boolean,
  children?: ReactElement
}

type ScrollHandler = {
  refresh: () => void,
  getScroll: () => BScrollConstructor | undefined
}

const Scroll = forwardRef<ScrollHandler, ScrollProps>((props, ref) => {
  // better-scroll 实例对象
  const [bScroll, setBScroll] = useState<BScrollConstructor | null>();
  // 指向初始化 bs 实例需要的 DOM 元素
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { direction, click, pullUpLoading, pullDownLoading, bounceTop, bounceBottom } = props;
  const { pullUp, pullDown, onScroll } = props;

  useEffect(() => {
    if (scrollContainerRef.current) {
      if (pullUpLoading) {
        BScroll.use(PullUp);
      }
      if (pullDownLoading) {
        BScroll.use(PullDown);
      }
      const scroll = new BScroll(scrollContainerRef.current, {
        scrollX: direction === 'horizontal',
        scrollY: direction === 'vertical',
        probeType: 3,
        click: click,
        bounce: {
          top: bounceTop,
          bottom: bounceBottom,
        },
        observeDOM: true,
      });
      setBScroll(scroll);
      return () => {
        setBScroll(null);
      }
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on('scroll', (scroll: TranslaterPoint) => {
      onScroll(scroll);
    })
    return () => {
      bScroll.off('scroll');
    }
  }, [bScroll, onScroll]);

  useEffect(() => {
    if (!bScroll || !pullUp) return;
    bScroll.on('pullingUp', async () => {
      await pullUp();
      bScroll?.finishPullUp();
    });
    return () => {
      bScroll.off('pullingUp');
    }
  }, [bScroll, pullUp]);

  useEffect(() => {
    if (!bScroll || !pullDown) return;
    bScroll.on('pullingDown', async () => {
      await pullDown();
      bScroll?.finishPullDown();
    })
    return () => {
      bScroll.off('pullingDown');
    }
  }, [bScroll, pullDown]);

  useImperativeHandle(ref, () => ({
    refresh: () => {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    getScroll: () => {
      if (bScroll) {
        return bScroll;
      }
    }
  }));

  return <ScrollContainer ref={scrollContainerRef}>
    {props.children}
  </ScrollContainer>
});

Scroll.defaultProps = {
  direction: 'vertical',
  click: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true, 
}

export default React.memo(Scroll);