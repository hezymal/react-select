import html from "@web/rollup-plugin-html";
import { getBabelOutputPlugin } from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";

export default [
    {
        input: "src/docs/index.tsx",
        output: {
            dir: "docs",
            format: "cjs",
        },
        plugins: [
            getBabelOutputPlugin({ presets: ["@babel/preset-env"] }),
            typescript({ tsconfig: "docs.tsconfig.json" }),
        ],
    },
    {
        input: "src/docs/index.html",
        output: { dir: "docs" },
        plugins: [html({ extractAssets: false })],
    },
];
