import { getBabelOutputPlugin } from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";

export default {
    input: "src/index.ts",
    output: {
        dir: "dist",
        format: "cjs",
    },
    plugins: [
        getBabelOutputPlugin({ presets: ["@babel/preset-env"] }),
        typescript(),
    ],
};
