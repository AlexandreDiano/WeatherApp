import opencage from 'opencage-api-client';

const batchGeocode = (key, addresses) => {
  return Promise.all(
      addresses
          .filter(address => address.length > 0)
          .map(address => opencage.geocode({key, q: address}))
          .then(responses => {
            return responses.map(response => ({
              input: response.results[0].geometry,
              geometry: response.results[0].geometry,
              formatted: response.results[0].formatted
            }));
          })
  );
};

export default {batchGeocode};