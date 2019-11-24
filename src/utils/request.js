import DomainError from "./DomainError";
import * as firebase from "firebase/app";


const host = 'http://localhost:3000';

async function getHeaders () {
  const token = await firebase.auth().currentUser.getIdToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': token
  }
}

export async function put (url = '', data = {}) {
  const response = await fetch(host + url, {
    method: 'PUT',
    headers: await getHeaders(),
    body: JSON.stringify(data)
  });
  await validateErrors(response);
  return await response.json();
}

export async function post (url = '', data = {}) {
  const response = await fetch(host + url, {
    method: 'POST',
    headers: await getHeaders(),
    body: JSON.stringify(data)
  });
  await validateErrors(response);
  return await response.json();
}

export async function get (url) {
  const response = await fetch(host + url, {
    method: 'GET',
    headers: await getHeaders(),
  });
  await validateErrors(response);
  return await response.json();
}

export async function remove (url) {
  const response = await fetch(host + url, {
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