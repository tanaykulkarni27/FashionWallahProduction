import React from 'react';
import {FaStar} from 'react-icons/fa6';
import {FaStarHalfAlt} from 'react-icons/fa';
import {IoMdStar} from 'react-icons/io';
import {IoStarHalfSharp} from 'react-icons/io5';

export default function RatingFeed({
  RatingObject,
  rateSize,
  fontStyle,
}: {
  RatingObject: {
    id: number;
    rating: number;
    feedBack: string;
    sender: string;
  };
  rateSize: number;
  fontStyle: {
    color: string;
    fontSize: string;
  };
}) {
  return (
    <div className="flex flex-col justify-center items-center">
      <Rating
        rating={RatingObject.rating}
        isHalfRatingsAllowed={true}
        size={rateSize}
      />
      <p style={fontStyle} className="m-2 text-center text-xl">
        {RatingObject.feedBack}
      </p>
      <p style={{color: fontStyle.color}} className="text-base">
        {RatingObject.sender}
      </p>
    </div>
  );
}

export const Rating = ({
  rating,
  size,
  isHalfRatingsAllowed = false,
}: {
  rating: number;
  size: number;
  isHalfRatingsAllowed: boolean;
}): React.JSX.Element => {
  return (
    <div className="flex flex-row items-center">
      {[1, 2, 3, 4, 5].map((num) => (
        <div key={num} className="mr-1">
          {rating >= num ? (
            <IoMdStar className={`text-yellow-400`} size={size} />
          ) : rating === num - 0.5 && isHalfRatingsAllowed ? (
            <IoStarHalfSharp className={`text-yellow-400`} size={size} />
          ) : (
            <IoMdStar className={`text-gray-300`} size={size} />
          )}
        </div>
      ))}
    </div>
  );
};
