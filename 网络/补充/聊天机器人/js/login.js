const loginIdValidator = new FieldValidator('txtLoginId', async function(value){
  if(value.trim() === ''){
    return '请填写账号';
  }
});

const loginPwdValidator = new FieldValidator('txtLoginPwd', function(value){
  if(value.trim() === ''){
    return '请填写密码';
  }
});

document.querySelector('.user-form').addEventListener('submit', async function(e){
  e.preventDefault();
  const res = await FieldValidator.validateAll([loginIdValidator, loginPwdValidator]);
  if(!res){
    // 验证不通过
    return;
  }
  const formData = new FormData(this);
  const params = Object.fromEntries(formData.entries());
  const resp = await API.login(params);
  if(resp.code === 0){
    // 登录成功
    alert('登录成功，点击确定跳转到首页');
    location.href = './index.html';
  }else{
    // 登录失败
    loginIdValidator.p.innerText = resp.msg;
    loginIdValidator.input.value = '';
    loginPwdValidator.input.value = '';
  }
});
