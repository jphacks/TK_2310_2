import { Box, Stack } from '@mui/material';
import { ReactNode, useEffect, useRef } from 'react';

type Props = {
  children: ReactNode[];
  pageIndex: number;
};

const Carousel = ({ children, pageIndex }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollTo(pageIndex);
  }, [pageIndex]);

  /**
   * 任意のindexのページまでスクロールする
   * @param index
   * @returns
   */
  const scrollTo = (index: number) => {
    const carouselWidth = wrapperRef.current?.clientWidth;

    if (!carouselWidth) return;
    const scrollPosition = carouselWidth * index;

    wrapperRef.current?.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
  };

  return (
    <Stack
      ref={wrapperRef}
      direction='row'
      sx={{
        overflowX: 'scroll',
        scrollSnapType: 'x mandatory',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        scrollbarWidth: 'none',
      }}
    >
      {children.map((child, index) => (
        <Box
          key={index}
          sx={{
            scrollSnapAlign: 'start',
            width: '100%',
            flexShrink: 0,
          }}
        >
          {child}
        </Box>
      ))}
    </Stack>
  );
};

export default Carousel;
