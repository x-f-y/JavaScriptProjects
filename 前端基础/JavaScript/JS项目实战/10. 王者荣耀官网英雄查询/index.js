(async function (){
  const doms = {
    ul: document.querySelector('.list'),
    radios: document.querySelectorAll('.radio'),
    form: document.querySelector('.keyword > form'),
    input: document.querySelector('.keyword > form input')
  }; // 需要用到的dom元素
  const allHeroes = await getHeroes(); // 所有英雄数据
  const filterCon = [
    // 本周免费
    hero => hero.pay_type === 10,
    // 新手推荐
    hero => hero.pay_type === 11,
    // 全部
    hero => true,
    // 坦克
    hero => hero.hero_type === 3 || hero.hero_type2 === 3,
    // 战士
    hero => hero.hero_type === 1 || hero.hero_type2 === 1,
    // 刺客
    hero => hero.hero_type === 4 || hero.hero_type2 === 4,
    // 法师
    hero => hero.hero_type === 2 || hero.hero_type2 === 2,
    // 射手
    hero => hero.hero_type === 5 || hero.hero_type2 === 5,
    // 辅助
    hero => hero.hero_type === 6 || hero.hero_type2 === 6,
  ]; // 保存各个选项对应的筛选条件

  init();
  
  // 初始化
  function init(){
    // 获取所有英雄数据，渲染成dom元素
    setHeroHTML(filterCon[2]);
    // 事件监听
    initEvent();
  }
  
  // 事件处理
  function initEvent(){
    for(const radio of doms.radios){
      radio.addEventListener('click', function(){
        if(this.classList.contains('checked')){
          return;
        }
        setChoose(this);
        setHeroHTML(filterCon[this.dataset.type]);
      });
    }
    doms.form.addEventListener('submit', function(e){
      e.preventDefault();
      setChoose(document.querySelector('.radio[data-type="2"]'));
      setHeroHTML(hero => hero.cname.includes(doms.input.value));
    });
  }

  // 从网络获取英雄数据
  async function getHeroes() {
    return fetch('https://study.duyiedu.com/api/herolist')
      .then((resp) => resp.json())
      .then((resp) => resp.data.reverse());
  }
  
  // 根据传递的筛选条件（回调函数）筛选出指定的英雄数据，并生成对应的html结构插入到文档中
  function setHeroHTML(filterFn){
    const html = allHeroes.filter(hero => filterFn(hero)).map(h => `<li>
      <a href="https://pvp.qq.com/web201605/herodetail/${h.ename}.shtml">
        <img src="https://game.gtimg.cn/images/yxzj/img201606/heroimg/${h.ename}/${h.ename}.jpg">
        <span>${h.cname}<span>
      </a>
    </li>`).join('');
    doms.ul.innerHTML = html;
  }
  
  // 为传递的选项（dom元素）设置选中效果
  function setChoose(radioDom){
    document.querySelector('.radio.checked').classList.remove('checked');
    radioDom.classList.add('checked');
  }
})();
