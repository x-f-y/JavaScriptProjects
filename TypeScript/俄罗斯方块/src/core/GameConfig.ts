export default {
  squareSize: { // 小方块的尺寸（单位：像素）
    width: 30,
    height: 30
  },
  panelSize: { // 游戏面板的尺寸（单位：小方块）
    width: 12,
    height: 20
  },
  nextSize: { // 显示下一个俄罗斯方块的区域的尺寸（单位：小方块）
    width: 5,
    height: 4
  },
  levels: [ // 游戏各等级难度（duration表示方块自动下落的时间间隔，单位：ms/格）
    {score: 0, duration: 1500},
    {score: 80, duration: 1000},
    {score: 150, duration: 800},
    {score: 300, duration: 500},
    {score: 500, duration: 300},
    {score: 1000, duration: 200}
  ]
}