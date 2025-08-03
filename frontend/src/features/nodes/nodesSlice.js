import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/nodes`;

export const fetchNodes = createAsyncThunk('nodes/fetchNodes', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message || error.message);
  }
});

export const createNode = createAsyncThunk('nodes/createNode', async (nodeData, { rejectWithValue }) => {
  try {
    const response = await axios.post(API_URL, nodeData);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message || error.message);
  }
});

export const updateNode = createAsyncThunk('nodes/updateNode', async ({ id, name }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, { name });
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message || error.message);
  }
});

const nodesSlice = createSlice({
  name: 'nodes',
  initialState: {
    nodes: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNodes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNodes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.nodes = action.payload;
      })
      .addCase(fetchNodes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createNode.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNode.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.nodes.push(action.payload);
      })
      .addCase(createNode.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateNode.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateNode.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.nodes.findIndex(node => node._id === action.payload._id);
        if (index !== -1) {
          state.nodes[index] = action.payload;
        }
      })
      .addCase(updateNode.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default nodesSlice.reducer;