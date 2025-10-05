// lib/auth.ts
"use client";

import { auth } from "./firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
  UserCredential,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";

// Google Sign-In
export const signInWithGoogle = async (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();
  if (!auth) throw new Error("Auth is not initialized");
  provider.setCustomParameters({ prompt: "select_account" });

  return signInWithPopup(auth, provider);
};

// GitHub Sign-In

// Email/Password
export const signUpWithEmail = async (
  email: string,
  password: string,
  displayName: string,
  photoURL?: string
): Promise<UserCredential> => {
  if (!auth) throw new Error("Auth is not initialized");
  const UserCredentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = UserCredentials.user;

  await updateProfile(user, {
    displayName,
  });
  return UserCredentials;
};
export const signInWithEmail = (
  email: string,
  password: string
): Promise<UserCredential> => {
  if (!auth) throw new Error("Auth is not initialized");

  return signInWithEmailAndPassword(auth, email, password);
};

// Logout
export const signOutUser = (): Promise<void> => {
  if (!auth) throw new Error("Auth is not initialized");

  return signOut(auth);
};

// Listen to auth state
export const onAuthChanged = (
  cb: (user: User | null) => void
): (() => void) => {
  if (!auth) {
    throw new Error("Auth is not initialized");
  }
  return onAuthStateChanged(auth, cb);
};
