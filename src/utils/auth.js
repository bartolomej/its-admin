import Cookie from "js-cookie";
import * as firebase from "firebase";
import "firebase/auth";


export const getJwtToken = async () => {
  try {
    return await firebase.auth().currentUser.getIdToken();
  } catch (e) {
    if (Cookie.get("token")) return Cookie.get("token");
    else throw new Error('Jwt token not found or expired')
  }
};

export const signOut = async () => await firebase.auth().signOut();

export const signIn = async (email, password) => {
  const user = await firebase.auth().signInWithEmailAndPassword(email, password);
  const token = await firebase.auth().currentUser.getIdToken();
  Cookie.set("token", token);
  return user;
};