import { useEffect } from 'react';

export default function useOutsideFocus(ref, cdFunc) {
  const handler = (e) => {
    if (
      !ref.current.contains(e.target) ||
      e.key === 'Escape' ||
      e.type === 'scroll'
    ) {
      cdFunc();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', handler);
    document.addEventListener('scroll', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', handler);
      document.removeEventListener('scroll', handler);
    };
  });
}
