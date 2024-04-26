import { Facebook, GitHub, Google } from "@mui/icons-material";
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";

export const OAUTH = [
  { icon: () => <Google />, provider: GoogleAuthProvider },
  { icon: () => <GitHub />, provider: GithubAuthProvider },
  { icon: () => <Facebook />, provider: FacebookAuthProvider },
];
