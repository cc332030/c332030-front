import static_files from 'rollup-plugin-static-files';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: ["src/view/index.tsx"],
  output: [
    {
      dir: "dist",
      format: "cjs",
      exports: "named",
      entryFileNames: "[name].js"
    }
  ],
  plugins: [
    typescript(),
    static_files({
      include: ['src'],
      exclude: ['src/view']
    })
  ],
  external: ["react"]
};
