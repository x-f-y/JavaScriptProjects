(function(){
  var ths = document.querySelectorAll('thead th');
  var tbody = document.querySelector('tbody');
  var checkAll = document.querySelector('.checkAll');
  var checkOneList = document.querySelectorAll('tbody input[type="checkbox"]');

  // 点击表头排序
  for(var i = 0; i < ths.length; i++){
    (function(i){
      ths[i].onclick = tableSort.bind(null, i);
    })(i);
  }

  // 全选 / 全不选
  checkAll.onchange = function(e){
    for(var i = 0; i < checkOneList.length; i++){
      checkOneList[i].checked = this.checked;
    }
  };

  // 选中 / 取消选中某一行
  for(var j = 0; j < checkOneList.length; j++){
    checkOneList[j].onchange = function(){
      var checkAllStatus = checkOneList[0].checked;
      for(var k = 1; k < checkOneList.length; k++){
        checkAllStatus = checkAllStatus && checkOneList[k].checked;
      }
      checkAll.checked = checkAllStatus;
    };
  }

  function tableSort(index) {
    if(index === 0){
      return;
    }
    var tbodyArr = Array.prototype.slice.call(tbody.children);
    tbodyArr.sort((a, b) => {
      if(index === 1 || index === 3){
        return a.children[index].textContent - b.children[index].textContent;
      }else if(index === 2 || index === 4){
        return a.children[index].textContent.localeCompare(b.children[index].textContent, 'zh');
      }
    });
    for(var i = 0; i < tbodyArr.length; i++){
      tbody.appendChild(tbodyArr[i]);
    }
  }
})();