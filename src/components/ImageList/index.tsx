import * as React from 'react';
import { useState, createRef } from 'react';

import { IPostData } from '../../interfaces/api';
import { generateThumbnailUrl } from '../../utils/thumbnail';

import './ImageList.scss';

const AVERAGE_COLUMN_WIDTH = 300;

function calculateImageWidths(listWidth: number, images: Array<IPostData>): Array<number> {
  let retVal: Array<number> = [];
  let row: Array<IPostData> = [];

  const columnCount = Math.floor(listWidth / AVERAGE_COLUMN_WIDTH);
  images.forEach(image => {
    if (row.length === columnCount) {
      const imageRatios: Array<number> = [];
      const widthRatioSum = row.reduce((widthRatio, image) => {
        const ratio = (image.width + 16) / image.height;
        imageRatios.push(ratio);
        return widthRatio + ratio;
      }, 0);

      const rowColumnWidths = imageRatios.map(ratio =>
          Math.round(ratio / widthRatioSum * 10000) / 100
      );

      retVal = [ ...retVal, ...rowColumnWidths ];
      row = [];
    }

    row.push(image);
  });

  return retVal;
}

export const ImageList = ({ images }: { images: Array<IPostData> }) => {
  const [ listWidth, setListWidth ] = useState(0);

  const listRef = createRef<HTMLUListElement>();
  let columnSizes: Array<number> = [];

  // If we haven't calculated the list width yet, do that async and then
  // calculate the columns. We'll then actually render the content
  if (!listWidth) {
    setTimeout(() => {
      const dimensions = listRef.current.getBoundingClientRect();
      setListWidth(dimensions.width);
    }, 0);
  } else {
    columnSizes = calculateImageWidths(listWidth, images);
  }

  return (
    <ul className="ImageList" ref={listRef}>
      {columnSizes.length && columnSizes.map((displaySize, index) => {
        const image = images[index];
        const thumbnailUrl = generateThumbnailUrl(image.cdnUrl, 300, 300);
        return (
          <li
            className="ImageList__Item"
            style={{
              width: `${displaySize}%`
            }}
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
            <h2
              className="ImageItem__Title"
              dangerouslySetInnerHTML={{
                __html: image.title
              }}
            />
          </li>
        );
      })}
    </ul>
  );
};
