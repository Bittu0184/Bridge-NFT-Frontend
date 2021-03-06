export async function fetchAPI(uri:string,data:string) {
    await fetch(uri, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: data,
            credentials: "include",
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
    return null;
};