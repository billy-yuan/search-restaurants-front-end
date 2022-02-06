type Payload = {
  status: number | null;
  body: null | string | object[];
};

async function fetchData(url: string) {
  const payload: Payload = { status: null, body: null };
  return fetch(url)
    .then((response) => {
      payload.status = response.status;
      return response.json();
    })
    .then((data) => {
      payload.body = data;
      return payload;
    })
    .catch((error) => {
      payload.status = 500;
      payload.body = error;
      return payload;
    });
}

export default fetchData;
