import { HTMLAttributes } from "react";
import { H1 } from "./components/H1";
import { H2 } from "./components/H2";
import { H3 } from "./components/H3";
import { Link } from "./components/Link";


export interface Text extends HTMLAttributes<HTMLHeadingElement> {};

export const Text = {
    h1: H1,
    h2: H2,
    h3: H3,
    link: Link
}