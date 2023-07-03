import { useEffect } from 'react';

const ScrollDetector = ({ onScrollToBottom }) => {
  useEffect(() => {
    const handleScroll = () => {
      const isScrollAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 30;

      if (isScrollAtBottom) {
        onScrollToBottom();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onScrollToBottom]);

  return null;
};

export default ScrollDetector;
