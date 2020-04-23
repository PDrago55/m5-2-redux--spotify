import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArtistProfile } from "../../helpers/api-helpers";
import { useDispatch } from "react-redux";
import {
  requestArtistInfo,
  receiveArtistInfo,
  receiveArtistInfoError,
} from "../../actions";
import Loader from "./Loading";
import styled from "styled-components";

function ArtistRoute() {
  const accessToken = useSelector((state) => state.auth.token);
  const currentArtist = useSelector((state) => {
    return state.artists.currentArtist;
  });
  const load = useSelector((state) => {
    return state.artists.status;
  });
  const ArtistId = useParams();
  const dispatch = useDispatch();
  // console.log("LOAD", load);
  // console.log("CURRENTARTIST", currentArtist);
  useEffect(() => {
    if (!accessToken) {
      return;
    }
    dispatch(requestArtistInfo());
    fetchArtistProfile(accessToken, ArtistId.id)
      .then((data) => {
        console.log(data);
        dispatch(receiveArtistInfo(data));
      })
      .catch((error) => {
        dispatch(receiveArtistInfoError(error));
      });
  }, [accessToken]);
  const followFunction = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  };
  return (
    <>
      {load === "loading" ||
      currentArtist === undefined ||
      currentArtist === null ? (
        <Loader />
      ) : (
        <>
          <Wrapper>
            <BlackWrapper>
              <ArtistImage src={currentArtist.images[0].url}></ArtistImage>
              <ArtistName>{currentArtist.name}</ArtistName>
              <ArtistFollowers>
                <div className="PinkFollow">
                  {followFunction(currentArtist.followers.total)}
                </div>{" "}
                Followers
              </ArtistFollowers>
              <Tags>TAGS</Tags>
              <TagWrapper>
                <GenreOne>{currentArtist.genres[0]}</GenreOne>
                <GenreTwo>{currentArtist.genres[1]}</GenreTwo>
              </TagWrapper>
            </BlackWrapper>
          </Wrapper>
        </>
      )}
    </>
  );
}
const Wrapper = styled.div`
  position: relative
  background: #e5e5e5;
`;

const BlackWrapper = styled.div`
  position: absolute;
  width: 345px;
  height: 800px;
  left: 16px;
  top: 40px;
  background: #0b0f14;
  border-radius: 4px;
`;

const ArtistImage = styled.img`
  position: absolute;
  width: 175px;
  height: 175px;
  left: 104px;
  top: 59px;
  border-radius: 190.5px;
`;

const ArtistName = styled.h2`
  position: absolute;
  width: 268px;
  height: 59px;
  left: 54px;
  top: 173px;

  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  line-height: 59px;
  margin: 0px 28px;
  color: #ffffff;
  text-shadow: 4px 8px 25px #000000, 0px 4px 4px rgba(0, 0, 0, 0.5),
    1px 2px 2px rgba(0, 0, 0, 0.75);
`;

const ArtistFollowers = styled.div`
position: absolute;
display: flex;
width: 93px;
height: 17px;
left: 141px;
top: 257px:

font-family: Montserrat;
font-style: normal;
font-weight: 600;
font-size: 14px
line-height: 17px;
text-transform: lowercase;
margin: 296px 0px
color: #ffffff
.PinkFollow {
  color: #FF4FD8;
}
`;

const Tags = styled.div`
  position: absolute;
  width: 26px;
  left: 164px;
  top: 478px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 26px;
  text-transform: lowercase;
  margin: 0px -14px;
  color: #ffffff;
`;

const TagWrapper = styled.div`
  display: flex;
`;

const GenreOne = styled.div`
  position: absolute;
  width: 94px;
  height: 13px;
  left: 81px;
  top: 536px;

  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  line-height: 13px;
  text-transform: lowercase;
  color: #ffffff;
`;

const GenreTwo = styled.div`
position: absolute;
width: 104px;
height: 13px;
left: 190px;
top: 536px;
background-color: rgba(75, 75, 75, 0.4)
font-family: Montserrat;
font-style: normal;
font-weight: 600;
font-size: 11px;
line-height: 13px
text-transform: lowercase;
color: #ffffff;
`;
export default ArtistRoute;
