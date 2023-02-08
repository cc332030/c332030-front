import static_files from 'rollup-plugin-static-files';

export default {
  input: ["src"],
  output: [
    {
      dir: "dist"
    }
  ],
  plugins: [
    static_files({
      include: ['src'],
      exclude: ['src/view']
    })
  ]
};
