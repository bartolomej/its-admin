const host = 'http://localhost:3000';


export async function put(url = '', data = {}) {
  const response = await fetch(host + url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}

export async function post(url = '', data = {}) {
  const response = await fetch(host + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}

export async function get(url) {
  const response = await fetch(host + url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return await response.json();
}