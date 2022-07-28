import React, { useEffect, useState } from 'react';

import useDocumentVisibility from '@yuyushka/react-document-visibility';
import MediaQuery, { useMediaQuery } from '@yuyushka/react-responsive'; // eslint-disable-line

import Stack from 'react-bootstrap/Stack';
import { Card } from 'react-bootstrap';

const App: React.FC = () => {
  const { count, isVisible, onVisibilityChange } = useDocumentVisibility();
  const [objArray, setObjArray] = useState<number[]>([15]);

  useEffect(() => {
    onVisibilityChange((isVisible) => {
      console.log('first handler', isVisible); // eslint-disable-line
    });
    onVisibilityChange((isVisible) => {
      console.log('second handler', isVisible); // eslint-disable-line
    });
  }, []); // eslint-disable-line

  useEffect(() => {
    if (isVisible) {
      setObjArray((prevState) => {
        return [...prevState, 15];
      });
    }
  }, [isVisible]);

  const renderObjArray = () => {
    return objArray.reduce((a, b) => {
      return a + b;
    });
  };

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  });
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });

  return (
    <Stack gap={3} className={'col-md-5 mx-auto'}>
      <Card>
        <p>Вы покинули страницу: {count} раз</p>
        <p>Вкладка активна? {isVisible ? 'да' : 'нет'}</p>
        {renderObjArray()}
      </Card>
      <Card>
        {isDesktopOrLaptop && <p>You are a desktop or laptop</p>}
        {isBigScreen && <p>You have a huge screen</p>}
        {isTabletOrMobile && <p>You are a tablet or mobile phone</p>}
        <p>Your are in {isPortrait ? 'portrait' : 'landscape'} orientation</p>
        {isRetina && <p>You are retina</p>}
      </Card>
      <Card>
        <MediaQuery minWidth={1000} maxWidth={1500}>
          <p>{'1000px < width < 1500px !'}</p>
        </MediaQuery>
        <MediaQuery maxWidth={1000}>
          <p>{'width < 1000px !'}</p>
        </MediaQuery>
        <MediaQuery minHeight={500}>
          <p>{'height > 500px !'}</p>
        </MediaQuery>
        <MediaQuery orientation={'landscape'}>
          <p>{'landscape!'}</p>
        </MediaQuery>
        <MediaQuery orientation={'portrait'}>
          <p>{'portrait!'}</p>
        </MediaQuery>
        <MediaQuery maxResolution={2}>
          <p>{'low res!'}</p>
        </MediaQuery>
        <MediaQuery minResolution={2}>
          <p>{'high res!'}</p>
        </MediaQuery>
      </Card>
    </Stack>
  );
};

export default App;
