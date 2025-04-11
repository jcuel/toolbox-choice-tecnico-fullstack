import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Usamos directamente /files como base, delegando a Vite el proxy
const API_URL = 'api/files';

export const fetchFilesByName = createAsyncThunk(
  'files/fetchByName',
  async (fileName) => {
    const response = await axios.get(`/api/files/data?fileName=${fileName}`);
    return response.data;
  }
);

export const fetchFiles = createAsyncThunk(
  'files/fetchFiles',
  async (fileName = null) => {
    const queryParam = fileName ? `?fileName=${fileName}` : '';
    const response = await axios.get(`${API_URL}/data${queryParam}`);
    return response.data;
  }
);

const filesSlice = createSlice({
  name: 'files',
  initialState: {
    data: [],
    filteredData: [],
    filter: '',
    loading: false,
    error: null,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
      state.filteredData = action.payload
        ? state.data.filter((file) =>
          file.file.toLowerCase().includes(action.payload.toLowerCase())
        )
        : state.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.filteredData = action.payload;
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilter } = filesSlice.actions;

export default filesSlice.reducer;
