import { HTMLAttributes } from "react";
import { H1 } from "./components/H1";
import { H2 } from "./components/H2";
import { H3 } from "./components/H3";


export interface Heading extends HTMLAttributes<HTMLHeadingElement> { 
};

export const Heading = {
    h1: H1,
    h2: H2,
    h3: H3
}