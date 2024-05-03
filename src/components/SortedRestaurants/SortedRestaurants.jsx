import React, { useState, useEffect } from 'react';
import './SortedRestaurants.css'
const SortedRestaurants = ({ restaurants, setRestaurants }) => {
  const [name, setName] = useState(false);
  const [review, setReview] = useState(false);
  const [rating, setRating] = useState(false);

  useEffect(() => {
    const sortedArray = [...restaurants]; // Create a copy of the original array

    if (name) {
      sortedArray.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (review) {
      sortedArray.sort((a, b) => b.review_count - a.review_count);
    }

    if (rating) {
      sortedArray.sort((a, b) => b.rating - a.rating);
    }

    setRestaurants(sortedArray);
  }, [name, review, rating]);

  const handleChangeName = () => {
    setName(!name);
  };

  const handleChangeReview = () => {
    setReview(!review);
  };

  const handleChangeRating = () => {
    setRating(!rating);
  };

  return (
    <div className="sorted-container">
      <div className="sorted-list">
        <p className="sorted-subtitle">Sorted by:</p>
        <div>
          <ul className="sorted-rest-style">
            <form className="sorted-restaurants-form">
              <li className='input-li'>
                <label className="sorted-restaurants-label" htmlFor="name">
                  Name
                </label>
                <input
                  className="sorted-restaurants-input"
                  name="name"
                  type="checkbox"
                  checked={name}
                  onChange={handleChangeName}
                  id="name"
                /></li>
              <li className='input-li'>
                <label className="sorted-restaurants-label " htmlFor="review">
                  Review
                </label>
                <input
                  className="sorted-restaurants-input"
                  name="review"
                  type="checkbox"
                  checked={review}
                  onChange={handleChangeReview}
                  id="review"
                /></li>
              <li className='input-li'>
                <label className="sorted-restaurants-label " htmlFor="rating">
                  Rating
                </label>
                <input
                  className="sorted-restaurants-input"
                  name="rating"
                  type="checkbox"
                  checked={rating}
                  onChange={handleChangeRating}
                  id="rating"
                />
              </li>
            </form>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SortedRestaurants;