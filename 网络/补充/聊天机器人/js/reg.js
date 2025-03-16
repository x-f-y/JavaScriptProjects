const loginIdValidator = new FieldValidator('txtLoginId', async function(value){
  if(value.trim() === ''){
    return '请填写账号';
  }
  const resp = await API.exists(value);
  if(resp.data){
    return '该账号已被占用，请重新输入';
  }
});

const nicknameValidator = new FieldValidator('txtNickname', function(value){
  if(value.trim() === ''){
    return '请填写昵称';
  }
});

const loginPwdValidator = new FieldValidator('txtLoginPwd', function(value){
  if(value.trim() === ''){
    return '请填写密码';
  }
});

const loginPwdConfirmValidator = new FieldValidator('txtLoginPwdConfirm', function(value){
  if(value.trim() === ''){
    return '请填写确认密码';
  }
  if(value !== loginPwdValidator.input.value){
    return '两次密码不一致';
  }
});

document.querySelector('.user-form').addEventListener('submit', async function(e){
  e.preventDefault();
  const res =  await FieldValidator.validateAll([
    loginIdValidator,
    nicknameValidator,
    loginPwdValidator,
    loginPwdConfirmValidator
  ]);
  if(!res){
    // 验证不通过
    return;
  }
  // 根据传入的表单dom对象创建对应的表单数据对象
  const formData = new FormData(this);
  // 构造请求参数
  const params = Object.fromEntries(formData.entries());
  const resp = await API.reg(params);
  if(resp.code === 0){
    alert('注册成功，点击确定跳转到登录页');
    location.href = './login.html';
  }
});