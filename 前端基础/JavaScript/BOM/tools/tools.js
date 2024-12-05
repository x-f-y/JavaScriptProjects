/**
 * 创建一个函数用来获取元素的样式
 * 	obj为要获取样式的元素	name为要获取的样式名
 */ 
function getStyle(obj, name) {
	//找变量找不到报错，找一个对象的属性找不到返回undefined undefined-->boolean为false
	if (window.getComputedStyle) {
		return getComputedStyle(obj, null)[name];
	} else {
		return obj.currentStyle[name];
	}
}

/**
 * 定义一个函数，用来为指定元素绑定响应函数
 * 	参数：
 * 		obj 要绑定事件的对象
 * 		eventStr 事件的字符串（不要on）
 * 		callback 回调函数
 */ 
 function bind(obj,eventStr,callback){
	if(obj.addEventListener){
		//大部分浏览器的方式
		obj.addEventListener(eventStr,callback,false);
	}else{
		//IE8及以下的方式
		obj.attachEvent("on"+eventStr,function(){
			//在匿名函数中调用回调函数来统一this
			callback.call(obj);
		});
	}
}

/**
 * 创建一个函数用来实现拖拽功能
 *  参数：obj 要执行拖拽功能的元素
 */ 
function drag(obj) {
    obj.onmousedown = function (e) {
        // 给要拖拽的元素添加z-index属性
        this.style.zIndex = 1
        // 给要拖拽的元素添加绝对定位
        this.style.position = 'absolute'
        // 修改鼠标样式
        this.style.cursor = 'move'
        // 获取元素移动前鼠标的坐标
        const oldX = e.pageX
        const oldY = e.pageY
        // 获取元素原先的位置
        const elementX = +getComputedStyle(this).getPropertyValue('left').slice(0, -2)
        const elementY = +getComputedStyle(this).getPropertyValue('top').slice(0, -2)
        document.onmousemove = (e) => {
            // 获取元素移动后鼠标的坐标
            const newX = e.pageX
            const newY = e.pageY
            // 设置元素移动后的新位置为移动前的旧位置加上鼠标移动的距离
            this.style.left = elementX + (newX - oldX) + 'px'
            this.style.top = elementY + (newY - oldY) + 'px'
            document.onmouseup = (e) => {
                // 松开鼠标后移除document的onmousemove事件和onmouseup事件
                document.onmousemove = null
                document.onmouseup = null
                // 拖拽完成后重新设置元素的z-index的值
                this.style.zIndex = ''
                // 拖拽完成后重新设置鼠标样式
                this.style.cursor = 'default'
            }
        }
        // 取消浏览器的默认行为（拖拽时去搜索引擎中搜索该内容）
        e.preventDefault();
    }
}

/**
 * 创建一个函数用来执行简单动画
 * obj		要执行动画的对象
 * attr		要执行的动画的样式，比如 left top width height
 * target	动画执行的目标位置
 * speed	移动的速度
 * callback	回调函数 这个函数将在动画执行完毕以后执行
 */
function move(obj, attr, target, speed, callback) {
	//关闭该对象定时器
	if(obj.timer) {
		clearInterval(obj.timer);
	}
	//获取该对象当前的attr值
	var currentPos = parseInt(getStyle(obj, attr));
	//判断速度的正负
	if (currentPos > target) {
		speed = -speed;
	}
	/**
	 * 开启一个计时器用来执行动画效果
	 * 向执行动画的对象中添加一个timer属性，用来保存它自身的定时器
	 * 	如果将timer设置为全局变量，会导致多个元素的定时器相互混乱
	 * 	一个对象的动画执行时可能会关闭其他对象的定时器，从而使其他对象的动画执行停止
	 */
	obj.timer = setInterval(function() {
		//获取obj原来的attr值
		var oldValue = parseInt(getStyle(obj, attr));
		var newValue = oldValue + speed;
		if ((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
			newValue = target;
		}
		//将新值设置给obj
		obj.style[attr] = newValue + "px";
		//当元素移动到target时，使其停止执行动画
		if (newValue == target) {
			//到达目标，关闭定时器
			clearInterval(obj.timer);
			//动画执行完毕，调用回调函数	有回调函数则调用，没有则什么也不做
			setTimeout(() => {
				/**
				 * 将callback && callback()写在setTimeout的回调中是为了在页面中box的位置更新之后，再执行回调
				 * 	比如下面这两行代码，呈现的效果是先打印1，再更新页面中box的位置
				 * 		box.style.left = '300px'
				 * 		alert(1)
				 * 	要想在页面中box的位置更新之后再执行alert(1)，则可以将上述代码修改成如下形式：
				 * 		box.style.left = '300px'
				 * 		setTimeout(() => {
			 	 *  		alert(1)
				 * 		})
				 */ 
                callback && callback()
            });
		}
	}, 20);
}

/**
 * 定义一个函数，用来向元素中添加指定的class属性值
 * 	参数
 * 		obj 要添加class属性的元素
 * 		classValue 要添加的class值
 */
function addClass(obj, classValue) {
	//判断obj中是否有classValue，没有则添加，有则什么也不做
	if (!hasClass(obj, classValue)) {
		// obj.className += (" " + classValue);
		obj.className = obj.className.concat(' ', classValue)
	}
}

/**
 * 定义一个函数，用来判断一个元素中是否含有指定的class属性值
 */
function hasClass(obj, classValue) {
	//定义一个正则表达式
	var reg = new RegExp("\\b" + classValue + "\\b");
	return reg.test(obj.className);
}

/**
 * 定义一个函数，用来移除元素中指定的class属性值
 */
function removeClass(obj, classValue) {
	/*//定义一个正则表达式
	var reg = new RegExp("\\b" + classValue + "\\b");
	//判断obj中是否有classValue，有则移除，没有则什么也不做
	if (hasClass(obj, classValue)) {
		obj.className = obj.className.replace(reg, "");
	}*/
	if (hasClass(obj, classValue)) {
		const arr = obj.className.split(' ').filter((item) => {
	        return item !== classValue
	    })
	    obj.className = arr.join(' ')
	}
}

/**
 * 定义一个函数，用来切换类
 * 	如果元素中具有该类，则删除
 * 	如果元素中没有该类，则添加
 */
function toggleClass(obj, classValue) {
	if (hasClass(obj, classValue)) {
		//有则删除
		removeClass(obj, classValue);
	} else {
		//没有则添加
		addClass(obj, classValue);
	}
}
