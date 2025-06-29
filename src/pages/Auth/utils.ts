import type { FirebaseError } from "firebase/app";

export const getFirebaseError = (error: FirebaseError) => {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "This email is already in use. Try logging in.";
    case "auth/weak-password":
      return "Password is too weak. Choose a stronger password.";
    case "auth/invalid-email":
      return "Invalid email format. Please enter a valid email.";
    case "auth/invalid-credential":
      return "Such user does not exist.";
    default:
      return "An unexpected error occurred. Please try again.";
  }
};
