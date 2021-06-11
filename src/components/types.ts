import React from "react";

export type MapType<T extends string | number | symbol, B> = { [key in T]: B };
