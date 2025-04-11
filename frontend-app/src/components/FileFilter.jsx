import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../store/filesSlice';

const FileFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.files.filter);

  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Filtrar por nombre de archivo..."
        value={filter}
        onChange={handleChange}
      />
    </div>
  );
};

export default FileFilter;
