import React, { useEffect, useRef, useCallback } from "react";

/*
  Credit to github.com/okonet/react-scroll-sync
*/

const useScrollSync = () => {
  let panes = useRef([]);

  const registerPane = useCallback((ref) => {
    panes.current.push(ref);
  }, []);

  const unregisterPane = (ref) => {
    panes.current.pop(ref);
  };

  const syncScrollPosition = (scrolledPane, pane) => {
    const { scrollTop, scrollHeight, clientHeight } = scrolledPane;

    const scrollTopOffset = scrollHeight - clientHeight;

    const paneHeight = pane.scrollHeight - pane.clientHeight;

    pane.scrollTop = (paneHeight * scrollTop) / scrollTopOffset;
  };

  const syncScrollPositions = (scrolledPane) => {
    panes.current.forEach((element) => {
      if (scrolledPane !== element.current) {
        syncScrollPosition(scrolledPane, element.current);
      }
    });
  };

  const onScrollHandler = (e) => {
    syncScrollPositions(e.target);
  };

  return { registerPane, unregisterPane, onScrollHandler };
};

export default useScrollSync;
