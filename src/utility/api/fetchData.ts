type Payload = {
  status: number | null;
  body: null | { [key: string]: any };
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
      payload.body = error;
      return payload;
    });
}

export default fetchData;
