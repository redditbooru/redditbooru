import * as React from 'react';

import { IPostData } from '../../interfaces/api';
import { generateThumbnailUrl } from '../../utils/thumbnail';

import './ImageList.scss';

export const ImageList = ({ images }: { images: Array<IPostData> }) => {
  return (
    <ul className="ImageList">
      {images.map(image => {
        const thumbnailUrl = generateThumbnailUrl(image.cdnUrl, 300, 300);
        return (
          <li
            className="ImageList__Item"
          >
            <div
              className="ImageItem__Wrap"
              style={{
                backgroundImage: `url(${thumbnailUrl})`
              }}
            >
              <img
                src={thumbnailUrl}
                alt={image.title}
                className="ImageItem__Image"
              />
              <span className="ImageItem__Score">
                {image.score}
              </span>
            </div>
            <h2 className="ImageItem__Title">
              {image.title}
            </h2>
          </li>
        );
      })}
    </ul>
  );
};
