import * as React from 'react';
import { useState } from 'react';

import { ImageList } from '../../components/ImageList';
import { IPostData } from '../../interfaces/api';

export const Home = () => {
  const [ imageList, setImageList ] = useState<Array<IPostData> | undefined>();

  fetch('//redditbooru.com/images/?sources=1', { mode: 'cors' })
    .then(response => response.json())
    .then(images => setImageList(images));

  return (
    <div id="home">
      {
        (imageList && imageList.length) ? (
          <ImageList images={imageList} />
        ) : (
          <h2>Loading...</h2>
        )
      }
    </div>
  );

};
