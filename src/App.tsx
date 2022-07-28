import React, { useEffect, useRef, useState } from 'react';
import useDocumentVisibility from './documentVisibilityHook';

function App() {
  const { count, visible, onVisibilityChange } = useDocumentVisibility();

  // addVisibleListener(() => {console.log("testing")});

  useEffect(() => {
    onVisibilityChange(() => {
      console.log('123');
    });
  }, []);

  return (
    <div>
      <span>
        <p>Вы покинули страницу: {count} раз</p>
        <p>Вкладка активна? {visible ? 'да' : 'нет'}</p>
      </span>
    </div>
  );
}

export default App;
