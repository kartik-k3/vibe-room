import React from "react";
import { Facebook, GitHub, Google } from "@mui/icons-material";
import {
  FacebookAuthProviderInit,
  GithubAuthProviderInit,
  GoogleAuthProviderInit,
} from "../../firebase";

export const OAUTH = [
  { icon: () => <Google />, provider: GoogleAuthProviderInit },
  { icon: () => <GitHub />, provider: GithubAuthProviderInit },
  { icon: () => <Facebook />, provider: FacebookAuthProviderInit },
];
