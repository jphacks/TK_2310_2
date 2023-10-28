import { Wrapper } from '@googlemaps/react-wrapper';
import { Box, Typography } from '@mui/material';
import { GoogleMap, Marker } from '@react-google-maps/api';

const apiKey = 'AIzaSyDKPUE8NncfZsSa-BszPRdIHfpWsXGuFm0';

type Props = {
  latitude: number;
  longitude: number;
  setLatitudeLongitude: (latitude: number, longitude: number) => void;
  address: string;
  setAddress: (address: string) => void;
};
const Map = ({
  latitude,
  longitude,
  setLatitudeLongitude,
  address,
  setAddress,
}: Props) => {
  const containerStyle = {
    width: '100%',
    height: '500px',
  };

  const center = {
    lat: latitude,
    lng: longitude,
  };

  const onMapClick = (event: google.maps.MapMouseEvent) => {
    if (!event.latLng) return;
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    console.log('Latitude: ', lat, ' Longitude: ', lng);
    setLatitudeLongitude(lat, lng);
    updateAddress(lat, lng);
  };

  const updateAddress = async (latitude: number, longitude: number) => {
    try {
      const address = await getJapaneseAddress(latitude, longitude);
      if (!address) return;
      setAddress(address);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Typography variant='h3' gutterBottom>
        開催場所
      </Typography>
      <Typography variant='body1' gutterBottom>
        クリックして場所を指定してください
      </Typography>
      {address}
      {apiKey && (
        <Wrapper apiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onClick={onMapClick}
          >
            <Marker position={{ lat: latitude, lng: longitude }} />
          </GoogleMap>
        </Wrapper>
      )}
    </Box>
  );
};

export default Map;

async function getJapaneseAddress(
  lat: number,
  lng: number,
): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder();
    const latLng = new google.maps.LatLng(lat, lng);

    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results && results[0]) {
          const address = results[0].formatted_address.replace(
            /^日本、〒\d{3}-\d{4} /,
            '',
          );
          resolve(address);
        } else {
          resolve(null);
        }
      } else {
        reject(
          `Geocode was not successful for the following reason: ${status}`,
        );
      }
    });
  });
}
