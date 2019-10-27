import DomainError from "./DomainError";


const host = 'http://localhost:3000';


export async function put (url = '', data = {}) {
  const response = await fetch(host + url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  await validateErrors(response);
  return await response.json();
}

export async function post (url = '', data = {}) {
  const response = await fetch(host + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  await validateErrors(response);
  return await response.json();
}

export async function get (url) {
  const response = await fetch(host + url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  await validateErrors(response);
  return await response.json();
}

export async function remove (url) {
  const response = await fetch(host + url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  await validateErrors(response);
  return await response.json();
}

async function validateErrors (response) {
  if (response.status >= 400) {
    let resError = await response.json();
    throw new DomainError(
      resError.name,
      resError.message,
      resError.description
    );
  }
}