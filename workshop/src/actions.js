export const requestAccessToken = () => ({
  type: "REQUEST_ACCESS_TOKEN",
});

export const receiveAccessToken = (token) => ({
  type: "RECEIVE_ACCESS_TOKEN",
  token,
});

export const receiveAccessTokenError = () => ({
  type: "RECEIVE_ACCESS_TOKEN_ERROR",
});

export const requestArtistInfo = () => ({
  type: "REQUEST_ACCESS_INFO",
});

export const receiveArtistInfo = (CurrentArtist) => ({
  type: "RECEIVE_ARTIST_INFO",
  CurrentArtist,
});

export const receiveArtistInfoError = () => ({
  type: "RECEIVE_ARTIST_INFO_ERROR",
});
