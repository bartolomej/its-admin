import DomainError from "./error";
import { getJwtToken } from "./auth";
import { API_HOST } from "./env";


async function getHeaders () {
  return {
    'Content-Type': 'application/json',
    'Authorization': await getJwtToken()
  }
}

function getUrl (suffix) {
  let lastIndex = API_HOST.length - 1;
  let url = API_HOST[lastIndex] === '/'
    ? API_HOST.substring(0, lastIndex)
    : API_HOST;
  return url + suffix;
}

export async function put (url = '', data = {}) {
  const response = await fetch(getUrl(url), {
    method: 'PUT',
    headers: await getHeaders(),
    body: JSON.stringify(data)
  });
  await validateErrors(response);
  return await response.json();
}

export async function post (url = '', data = {}) {
  const response = await fetch(getUrl(url), {
    method: 'POST',
    headers: await getHeaders(),
    body: JSON.stringify(data)
  });
  await validateErrors(response);
  return await response.json();
}

export async function get (url) {
  const response = await fetch(getUrl(url), {
    method: 'GET',
    headers: await getHeaders(),
  });
  await validateErrors(response);
  return await response.json();
}

export async function remove (url) {
  const response = await fetch(getUrl(url), {
    method: 'DELETE',
    headers: await getHeaders(),
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