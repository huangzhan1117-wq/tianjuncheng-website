import sharp from "sharp";

const sources = [
  {
    input:
      "D:/xwechat_files/wxid_djsx8gqjv8zt22_598e/temp/RWTemp/2026-07/9e20f478899dc29eb19741386f9343c8/ef67867b5bed54286c44440b22166b61.jpg",
    output: "assets/project-daqing-photo.jpg",
  },
  {
    input:
      "D:/xwechat_files/wxid_djsx8gqjv8zt22_598e/temp/RWTemp/2026-07/9e20f478899dc29eb19741386f9343c8/3b7516852bd0a9b34dfa06368f25ad6c.jpg",
    output: "assets/project-jinjiang-photo.jpg",
  },
];

for (const source of sources) {
  await sharp(source.input)
    .rotate()
    .resize(360, 260, { fit: "cover", position: "attention" })
    .modulate({ brightness: 1.04, saturation: 1.06 })
    .sharpen({ sigma: 0.65, m1: 0.8, m2: 1.8 })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(source.output);
}
