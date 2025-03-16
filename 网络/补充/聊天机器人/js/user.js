// 登录页面和注册页面表单验证的通用代码

/**
 * 对某一个表单进行验证的构造函数
 */
class FieldValidator {
  /**
   * 构造器
   * @param {String} txtId 文本框的id
   * @param {Function} validatorFunc 验证规则函数，参数为当前文本框的值，返回值为验证失败的错误消息，若没有返回，则表示验证成功
   */
  constructor(txtId, validatorFunc){
    this.input = document.getElementById(txtId);
    this.p = this.input.nextElementSibling;
    this.validatorFunc = validatorFunc;
    this.input.onblur = () => {
      this.validate();
    };
  }

  /**
   * 开始验证，验证通过返回true，反之返回false
   */
  async validate(){
    const err =  await this.validatorFunc(this.input.value);
    if(err){
      // 验证不通过
      this.p.innerText = err;
      return false;
    }else{
      this.p.innerText = '';
      return true;
    }
  }

  /**
   * 对传入的所有验证器进行统一的验证，若所有验证均通过，则返回true，否则返回false
   * @param {FieldValidator[]} validators 验证器数组
   */
  static async validateAll(validators){
    let result = true;
    for(const validator of validators){
      result = result && await validator.validate();
    }
    return result;
  }
}