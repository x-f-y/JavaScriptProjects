class ScorePanel {
  scoreEle;
  levelEle;
  recordEle;
  score;
  level;
  maxLevel; // 最高等级，默认为10
  upScore; // 每多少分升一级，默认为10
  record; // 分数的最高记录
  constructor(maxLevel = 10, upScore = 10){
    this.scoreEle = document.getElementById('score');
    this.levelEle = document.getElementById('level');
    this.recordEle = document.getElementById('record');
    this.score = 0;
    this.level = 1;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
    this.record = localStorage.getItem('record') || 0;
    this.setData();
  }
  setData(){
    this.scoreEle.textContent = this.score;
    this.levelEle.textContent = this.level;
    this.recordEle.textContent = this.record;
  }
  addScore(){
    this.score++;
    this.scoreEle.textContent = this.score;
    if(this.score % this.upScore === 0){
      this.addLevel();
    }
  }
  addLevel(){
    if(this.level < this.maxLevel){
      this.level++;
      this.levelEle.textContent = this.level;
    }
  }
}

export default ScorePanel;