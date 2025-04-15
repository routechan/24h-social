export const animationVariants = [
    // 上からフェードイン
    {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
    },
    // 下からスケールアップ
    {
      initial: { opacity: 0, scale: 0.8, y: 50 },
      animate: { opacity: 1, scale: 1, y: 0 },
    },
    // 左からスライド
    {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
    },
    // 右からスライド
    {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
    },
    // 回転してフェードイン
    {
      initial: { opacity: 0, rotate: -30, scale: 0.9 },
      animate: { opacity: 1, rotate: 0, scale: 1 },
    },
    // バウンス風にポップアップ
    {
      initial: { opacity: 0, scale: 0 },
      animate: { opacity: 1, scale: [1.2, 0.95, 1] },
    },
    // ジャンプ風にふわっと出る
    {
      initial: { opacity: 0, y: 100, scale: 0.5 },
      animate: { opacity: 1, y: 0, scale: 1 },
    },
    // 回転&横移動
    {
      initial: { opacity: 0, rotate: -90, x: -100 },
      animate: { opacity: 1, rotate: 0, x: 0 },
    },
    // 拡大→縮小→通常サイズ
    {
      initial: { opacity: 0, scale: 0.5 },
      animate: { opacity: 1, scale: [1.4, 0.95, 1] },
    },
    // 斜め下から登場
    {
      initial: { opacity: 0, x: -50, y: 50 },
      animate: { opacity: 1, x: 0, y: 0 },
    },
  ];