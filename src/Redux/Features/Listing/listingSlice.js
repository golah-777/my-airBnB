import { createSlice } from '@reduxjs/toolkit'

export const listingSlice = createSlice({
  name: 'listing',
  initialState: {
    listings: [],
    loading: null
  },
  reducers: {
    listing_list_request: state => {
      state.loading = true;
      state.listings = []
    },
    listing_list_success: (state, action) => {
      state.loading = false;
      state.listings= action.payload
    },
    listing_list_fail: (state, action) => {
      state.loading = false;
      state.listings= action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { listing_list_fail, listing_list_request, listing_list_success } = listingSlice.actions

export default listingSlice.reducer