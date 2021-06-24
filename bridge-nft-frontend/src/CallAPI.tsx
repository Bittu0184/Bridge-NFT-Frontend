export function fetchAPI(uri:string,data:string) {
    fetch(uri, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: data,
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          return data;
        })
        .catch((error) => {
          console.error('Error:', error);
          return error;
        });
};