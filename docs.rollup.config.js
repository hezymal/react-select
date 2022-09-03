import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import html from "@web/rollup-plugin-html";
import json from "@rollup/plugin-json";
import livereload from "rollup-plugin-livereload";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import serve from "rollup-plugin-serve";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";

export default [
    {
        input: "src/docs/index.tsx",
        output: {
            dir: "docs",
            format: "iife",
            sourcemap: true,
        },
        plugins: [
            nodeResolve({
                browser: true,
            }),
            replace({
                "process.env.NODE_ENV": JSON.stringify("development"),
                preventAssignment: true,
            }),
            commonjs(),
            babel({ presets: ["@babel/preset-env"] }),
            typescript({ tsconfig: "docs.tsconfig.json" }),
            json(),
            postcss({
                plugins: [],
            }),
            serve({
                contentBase: ["docs"],
                historyApiFallback: true,
            }),
            livereload(),
        ],
    },
    {
        input: "src/docs/index.html",
        output: { dir: "docs" },
        plugins: [html({ extractAssets: false })],
    },
];
