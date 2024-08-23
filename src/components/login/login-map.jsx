import { useEffect, useState } from "react";
import styled from "styled-components";

const LoginMap = ({ setLocation }) => {
  const API_KEY = "7e49836114827162b373c2408e18ee25";
  const [coordinates, setCoordinates] = useState({ lat: null, lon: null });
  const [posData, setPosData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to handle successful geolocation
    const onGeoOk = (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      setCoordinates({ lat, lon });
      console.log(lat, lon);

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      fetch(weatherUrl)
        .then((response) => response.json())
        .then((data) => {
          setCoordinates({ lat: data.coord.lat, lon: data.coord.lon });
        })
        .catch((err) => {
          setError("Failed to fetch weather data.");
          console.error(err);
        });
    };

    // Function to handle geolocation error
    const onGeoError = () => {
      setError("Can't find your location.");
      alert("Can't find your location.");
    };

    // Request user's geolocation
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
  }, [API_KEY]);

  useEffect(() => {
    if (coordinates.lat && coordinates.lon) {
      const fetchKaKaoData = () => {
        const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${coordinates.lon}&y=${coordinates.lat}&input_coord=WGS84`;
        fetch(url, {
          method: "GET",
          headers: {
            Authorization: "KakaoAK eb5a016c1b239dc717e18785bd7525e7",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setPosData(data);
            const addressName = data.documents[0]?.address?.address_name;
            if (addressName) {
              setLocation(addressName);
              console.log(addressName);
            }
          })
          .catch((err) => {
            setError("Failed to fetch Kakao location data.");
            console.error(err);
          });
      };

      fetchKaKaoData();

      const mapTimeout = setTimeout(() => {
        var container = document.getElementById("map");
        var options = {
          center: new window.kakao.maps.LatLng(
            coordinates.lat,
            coordinates.lon
          ),
          level: 4,
        };
        var map = new window.kakao.maps.Map(container, options);

        var imageSrc =
            "https://blog.kakaocdn.net/dn/dkit9N/btsJeiXwLi1/fWWpdxLgH6t04wCV3MZOh1/img.png",
          imageSize = new window.kakao.maps.Size(250, 250),
          imageOption = { offset: new window.kakao.maps.Point(27, 69) };

        var markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );
        var markerPosition = new window.kakao.maps.LatLng(
          coordinates.lat,
          coordinates.lon
        );

        var marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        marker.setMap(map);
      }, 1000);

      // Cleanup function
      return () => {
        clearTimeout(mapTimeout);
      };
    }
  }, [coordinates, setLocation]);

  return (
    <Wrapper>
      {error && <div>{error}</div>}
      {/* {posData && <div>{posData.documents[0]?.address?.address_name}</div>} */}
      <div style={{ width: "300px", height: "200px" }} id="map"></div>
    </Wrapper>
  );
};

export default LoginMap;

const Wrapper = styled.div``;
