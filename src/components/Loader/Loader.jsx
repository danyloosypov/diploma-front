import React from 'react';
import { RotatingLines } from 'react-loader-spinner';
import './Loader.css'; // Import a custom CSS file for styling

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </div>
  );
}

export default Loader;
