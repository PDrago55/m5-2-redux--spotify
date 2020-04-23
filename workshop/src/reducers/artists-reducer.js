const initialState = {
  currentArtist: null,
  status: "idle",
};

export default function artistReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_ACCESS_INFO": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_ARTIST_INFO": {
      return {
        ...state,
        status: "idle",
        currentArtist: action.CurrentArtist,
      };
    }
    case "RECEIVE_ARTIST_INFO_ERROR": {
      return {
        ...state,
        status: "error",
      };
    }
    default: {
      return state;
    }
  }
}
