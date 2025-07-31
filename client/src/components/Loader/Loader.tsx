'use client';

import React from 'react';
import { ClipLoader  } from 'react-spinners';

const Loader = ({ color = '#4566f7', size = 60,  }:
  { color?: string; size?: number; message?: string }) => {
  return (
    <div className="loader-wrapper d-flex flex-column align-items-center justify-content-center mt-5">
      <ClipLoader  color={color} size={size} />
    </div>
  );
};

export default Loader;
