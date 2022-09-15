import { Key } from "react";

export const castValueToReactKey = <TValue>(value: TValue): Key => value + "";
