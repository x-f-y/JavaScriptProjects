# LESS 基本用法大全

## 注释

Less 同时支持行注释 `//` 和块注释 `/**/`，区别是行注释不会生成到编译结果中，而块注释则会生成到编译结果中。

## 变量

### 基本用法

```less
@width: 10px;
@height: @width + 10px;
#header {
  width: @width;
  height: @height;
}
```

编译为：

```css
#header {
  width: 10px;
  height: 20px;
}
```

在上面的例子中，我们主要关注使用变量来控制 CSS 规则中的值。但变量也可以在其他地方使用，例如选择器名称、属性名称、URL 和导入语句。

### 选择器名称

```less
@my-selector: banner;
.@{my-selector} {
  font-weight: bold;
}
```

编译为：

```css
.banner {
  font-weight: bold;
}
```

### 属性名称

```less
@property: color;
.widget {
  @{property}: #0ee;
  background-@{property}: #999;
}
```

编译为：

```css
.widget {
  color: #0ee;
  background-color: #999;
}
```

### URL

```less
@images: "../img";
body {
  background: url("@{images}/white-sand.png");
}
```

编译为：

```css
body {
  background: url("../img/white-sand.png");
}
```

### 导入语句

```less
@themes: "./src/themes";
@import "@{themes}/tidal-wave.less";
```

### 使用变量定义变量

```less
@primary:  green;
.section {
  @color: primary;
  .element {
    color: @@color;
  }
}
```

编译为：

```css
.section .element {
  color: green;
}
```

### 惰性求值

变量在使用前不必声明。

```less
.lazy-eval {
  width: @var;
}
@var: @a;
@a: 9%;
```

编译为：

```less
.lazy-eval {
  width: 9%;
}
```

当重复定义变量时，将使用该变量的最后一个定义，并从当前作用域向上搜索。这类似于 CSS 本身，使用定义中的最后一个属性来确定其值。

```less
@var: 10px;
.class {
  @var: 20px;
  .brass {
    @var: 30px;
    width: @var;
    @var: 40px;
  }
  height: @var;
}
```

编译为：

```css
.class {
  height: 20px;
}
.class .brass {
  width: 40px;
}
```

### 属性作为变量

使用 `$prop` 语法可以轻松地将属性视为变量。

```less
.widget {
  color: #efefef;
  background-color: $color;
}
```

编译为：

```css
.widget {
  color: #efefef;
  background-color: #efefef;
}
```

注意：与变量一样，Less 将选择当前/父范围内的最后一个属性作为“最终”值。

```less
.block {
  color: red; 
  .inner {
    border: 1px solid $color; 
  }
  color: blue;  
}
```

编译为：

```css
.block {
  color: red;
  color: blue;
}
.block .inner {
  border: 1px solid blue;
}
```

## 运算

> 从 less 4.0 版本开始，除法运算需要用小括号包裹起来。

### 两个操作数都没有单位

```less
.demo {
  line-height: 1 + 0.5; // 1.5
  line-height: 2 - 0.3; // 1.7
  line-height: 0.4 * 4; // 1.6
  line-height: (4 / 3); // 1.33333333
}
```

### 一个操作数有单位，一个操作数没有单位

```less
.demo {
  // px
  width: 10px + 20; // 30px
  width: 10 + 25px; // 35px
  width: 50px - 5; // 45px
  width: 60 - 5px; // 55px
  width: 10px * 4; // 40px
  width: 10 * 5px; // 50px
  width: (100px / 5); // 20px
  width: (100 / 4px); // 25px
  // ms
  transition-duration: 100ms + 200; // 300ms
  transition-duration: 100 + 250ms; // 350ms
  transition-duration: 500ms - 50; // 450ms
  transition-duration: 600 - 50ms; // 550ms
  transition-duration: 100ms * 4; // 400ms
  transition-duration: 100 * 5ms; // 500ms
  transition-duration: (1000ms / 5); // 200ms
  transition-duration: (1000 / 4ms); // 250ms
  // deg
  transform: rotate(10deg + 20); // 30deg
  transform: rotate(10 + 25deg); // 35deg
  transform: rotate(50deg - 5); // 45deg
  transform: rotate(60 - 5deg); // 55deg
  transform: rotate(10deg * 4); // 40deg
  transform: rotate(10 * 5deg); // 50deg
  transform: rotate((100deg / 5)); // 20deg
  transform: rotate((100 / 4deg)); // 25deg
}
```

### 两个操作数都有单位

> 这里仅讨论两个操作数的单位不一致的情况。

进行加法和减法运算时，若单位属于同一类别（如长度、时间、角度等），则会在运算前进行单位换算；若单位不属于同一类别，则无法进行单位换算。无论两个操作数的单位是否属于同一类别，运算结果的单位都以左侧操作数的单位类型为准。

```less
.demo {
  // 单位属于同一类别
  width: 20mm + 10cm; // 120mm
  width: 10cm + 20mm; // 12cm
  width: 10cm - 20mm; // 8cm
  width: 100mm - 3cm; // 70mm
  transition-duration: 500ms + 1s; // 1500ms
  transition-duration: 1s + 500ms; // 1.5s
  transition-duration: 1s - 500ms; // 0.5s
  transition-duration: 1000ms - 0.5s; // 500ms
  transform: rotate(90deg + 1turn); // 450deg
  transform: rotate(1turn + 90deg); // 1.25turn
  transform: rotate(1turn - 90deg); // 0.75turn
  transform: rotate(180deg - 0.25turn); // 90deg
  // 单位属于不同类别
  width: 10px + 90deg; // 100px
  width: 10px + 100ms; // 110px
  width: 300px - 90deg; // 210px
  width: 300px - 100ms; // 200px
  transition-duration: 100ms + 10px; // 110ms
  transition-duration: 100ms + 90deg; // 190ms
  transition-duration: 100ms - 50px; // 50ms
  transition-duration: 100ms - 90deg; // 10ms
  transform: rotate(90deg + 10px); // 100deg
  transform: rotate(90deg + 100ms); // 190deg
  transform: rotate(90deg - 10px); // 80deg
  transform: rotate(90deg - 50ms); // 40deg
}
```

进行乘法和除法运算时，不进行单位换算，直接忽略右侧操作数的单位，运算结果以左侧操作数的单位类型为准。

```less
.demo {
  width: 20mm * 10cm; // 200mm
  width: 10px * 90deg; // 900px
  transition-duration: 500ms * 1s; // 500ms
  transition-duration: 1s * 90deg; // 90s
  transform: rotate(90deg * 1turn); // 90deg
  transform: rotate(0.5turn * 10px); // 5turn
  width: (20mm / 10cm); // 2mm
  width: (100px / 2turn); // 50px
  transition-duration: (1000ms / 5s); // 200ms
  transition-duration: (10s / 0.5turn); // 20s
  transform: rotate((180deg / 2turn)); // 90deg
  transform: rotate((1turn / 0.5s)); // 2turn
}
```

### 颜色运算

> Less 支持直接对颜色进行算术运算，本质上是分别计算颜色的 rgb 通道值。但并不建议这么做，建议使用专门的色彩函数（如 `light()`、`darken()` 等）对颜色进行处理。

```less
.demo {
  color: #0a1937 + #8c4d4d; // #966684
  color: #a25c6b - #230307; // #7f5964
  color: #1e1c51 * 3; // #5a54f3
  color: (#9a38e2 / 2); // #4d1c71
}
```

### `calc()` 特例

为了与 CSS 保持兼容，less中的 `calc()` 并不会对数学表达式进行计算。

```less
@var: 50vh / 2;
.demo {
  width: calc(50% + (@var - 20px));
}
```

编译为：

```css
.demo {
  width: calc(50% + (25vh - 20px));
}
```

## 函数

Less 内置了多种函数用于转换颜色、处理字符串、算术运算等。下面是一个简单的函数使用例子：

```less
@base: #f04615;
@width: 0.5;
.class {
  width: percentage(@width);
  color: saturate(@base, 5%);
  background-color: spin(lighten(@base, 25%), 8);
}
```

编译为：

```css
.class {
  width: 50%;
  color: #f6430f;
  background-color: #f8b38d;
}
```

> 更多 Less 内置函数见 [LESS 函数手册](https://less.bootcss.com/functions/)。

## 嵌套

### 基本用法

```less
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
  }
}
```

编译为：

```css
#header {
  color: black;
}
#header .navigation {
  font-size: 12px;
}
#header .logo {
  width: 300px;
}
```

### 引用父选择器 &

& 运算符代表嵌套规则的父选择器。下面是一个经典的清除浮动的代码：

```less
.clearfix {
  display: block;
  *zoom: 1;
  &:after {
    content: "";
    display: block;
    clear: both;
    font-size: 0;
    height: 0;
    visibility: hidden;
  }
}
```

编译为：

```css
.clearfix {
  display: block;
  *zoom: 1;
}
.clearfix:after {
  content: " ";
  display: block;
  font-size: 0;
  height: 0;
  clear: both;
  visibility: hidden;
}
```

& 运算符的另一个典型用途是生成重复的类名：

```less
.button {
  &-ok {
    background-image: url("ok.png");
  }
  &-cancel {
    background-image: url("cancel.png");
  }
  &-custom {
    background-image: url("custom.png");
  }
}
```

编译为：

```css
.button-ok {
  background-image: url("ok.png");
}
.button-cancel {
  background-image: url("cancel.png");
}
.button-custom {
  background-image: url("custom.png");
}
```

### 多种的 &

& 可以在一个选择器中出现多次，这样就可以重复引用父选择器，而无需重复定义其名称。

```less
.link {
  & + & {
    color: red;
  }
  & & {
    color: green;
  }
  && {
    color: blue;
  }
  &, &ish {
    color: cyan;
  }
}
```

编译为：

```css
.link + .link {
  color: red;
}
.link .link {
  color: green;
}
.link.link {
  color: blue;
}
.link,
.linkish {
  color: cyan;
}
```

请注意，& 代表所有父选择器，而不仅仅是最近的祖先。因此以下示例：

```less
.grand {
  .parent {
    & > & {
      color: red;
    }
    & & {
      color: green;
    }
    && {
      color: blue;
    }
    &, &ish {
      color: cyan;
    }
  }
}
```

编译结果为：

```css
.grand .parent > .grand .parent {
  color: red;
}
.grand .parent .grand .parent {
  color: green;
}
.grand .parent.grand .parent {
  color: blue;
}
.grand .parent,
.grand .parentish {
  color: cyan;
}
```

### 改变选择器顺序

将选择器添加到继承的（父）选择器之前有时会很有用。

```less
.menu {
  border-radius: 5px;
  .no-borderradius & {
    border-radius: 0px;
  }
}
```

编译为：

```css
.menu {
  border-radius: 5px;
}
.no-borderradius .menu {
  border-radius: 0px;
}
```

### & 组合

& 还可以用于生成以逗号分隔的列表中选择器的所有可能排列。

```less
p, a, ul, li {
  border-top: 2px dotted #366;
  & + & {
    border-top: 0;
  }
}
```

编译为：

```css
p,
a,
ul,
li {
  border-top: 2px dotted #366;
}
p + p,
p + a,
p + ul,
p + li,
a + p,
a + a,
a + ul,
a + li,
ul + p,
ul + a,
ul + ul,
ul + li,
li + p,
li + a,
li + ul,
li + li {
  border-top: 0;
}
```

### @ 规则嵌套和冒泡

@ 规则（例如 `@media` 或 `@supports`）可以与选择器以相同的方式进行嵌套。@ 规则会被放在前面，同一规则集中其它 CSS 规则的相对顺序保持不变（冒泡）。

```less
.component {
  width: 300px;
  @media (min-width: 768px) {
    width: 600px;
    @media  (min-resolution: 192dpi) {
      background-image: url(/img/retina2x.png);
    }
  }
  @media (min-width: 1280px) {
    width: 800px;
  }
}
```

编译为：

```css
.component {
  width: 300px;
}
@media (min-width: 768px) {
  .component {
    width: 600px;
  }
}
@media (min-width: 768px) and (min-resolution: 192dpi) {
  .component {
    background-image: url(/img/retina2x.png);
  }
}
@media (min-width: 1280px) {
  .component {
    width: 800px;
  }
}
```

## 转义

转义允许你使用任意字符串作为属性或变量值。任何 `~"anything"` 或 `~'anything'` 形式的内容都将按原样输出，不被 Less 编译。

```less
@min768: ~"(min-width: 768px)";
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}
```

编译为：

```css
@media (min-width: 768px) {
  .element {
    font-size: 1.2rem;
  }
}
```

> tip：从 Less 3.5+ 版本开始，许多以前需要转义的情况都不再需要了，因此上述 Less 代码也可以简写为：

```less
@min768: (min-width: 768px);
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}
```

> tip：Less 内置函数 `e()` 专门用于字符串转义，该函数接受一个要转义的字符串，返回转义之后的结果（原样返回，但不带引号）。

## 合并

### 用逗号附加属性值

```less
.mixin() {
  box-shadow+: inset 0 0 10px #555;
}
.myclass {
  .mixin();
  box-shadow+: 0 0 20px black;
}
```

编译为：

```css
.myclass {
  box-shadow: inset 0 0 10px #555, 0 0 20px black;
}
```

### 用空格附加属性值

```less
.mixin() {
  transform+_: scale(2);
}
.myclass {
  .mixin();
  transform+_: rotate(15deg);
}
```

编译为：

```css
.myclass {
  transform: scale(2) rotate(15deg);
}
```

## Mixins

### 基本用法

```less
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
#flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
#menu {
  color: #ccc;
  .bordered();
}
.flex {
  width: 100%;
  #flex-center();
}
```

编译为：

```css
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
#flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
#menu {
  color: #ccc;
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
.flex {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### 带括号的 Mixins

如果想创建一个 mixin，但又不希望该 mixin 出现在编译结果中，可以在定义 mixin 时加上括号。

```less
.my-mixin {
  color: black;
}
.my-other-mixin() {
  background-color: white;
}
.class {
  .my-mixin();
  .my-other-mixin();
}
```

编译为：

```css
.my-mixin {
  color: black;
}
.class {
  color: black;
  background-color: white;
}
```

### Mixins 中的选择器

Mixins 不仅可以包含属性，还可以包含选择器。

```less
.hover-mixin() {
  &:hover {
    border: 1px solid red;
  }
}
button {
  .hover-mixin();
}
```

编译为：

```css
button:hover {
  border: 1px solid red;
}
```

### 命名空间

```less
#my-library1 {
  .custom-color() {
    color: #f40;
  }
  .hover() {
    &:hover {
      border-bottom: 1px solid red;
    }
  }
}
#my-library2 {
  .custom-color() {
    color: #008c8c;
  }
}
.class1 {
  #my-library1.custom-color();
  #my-library1.hover();
}
.class2 {
  #my-library2.custom-color();
}
```

编译为：

```css
.class1 {
  color: #f40;
}
.class1:hover {
  border-bottom: 1px solid red;
}
.class2 {
  color: #008c8c;
}
```

### Mixins 守卫

#### 示例 1

```less
.mixin(@a) when (lightness(@a) > 50%) {
  background-color: black;
}
.mixin(@a) when (lightness(@a) =< 50%) {
  background-color: white;
}
.mixin(@a) {
  color: @a;
}
.class1 {
  // lightness(#ddd) 为 86.67%
  .mixin(#ddd);
}
.class2 {
  // lightness(#555) 为 33.33%
  .mixin(#555);
}
```

编译为：

```css
.class1 {
  background-color: black;
  color: #ddd;
}
.class2 {
  background-color: white;
  color: #555;
}
```

> tip：less 中的比较运算符有：`>`、`>=`、`=`、`=<`、`<`。

#### 示例 2

```less
.mixin(@a) when (isnumber(@a)) and (@a > 0) {
  width: @a;
}
.class {
  .mixin(100px);
}
```

编译为：

```css
.class {
  width: 100px;
}
```

> tip：
>
> - less 中的逻辑运算符有：`and`、`or`、`not`。
> - 可以用逗号分隔多个守卫来模拟 `or` 运算符，只要任何一个守卫的计算结果为 true，就认为匹配成功。

#### 示例 3

```less
.mixin(@a) when (iscolor(@a)) {
  background-color: @a;
}
.mixin(@a) when (isnumber(@a)) {
  width: @a;
}
.class {
  .mixin(wheat);
  .mixin(80%);
}
```

编译为：

```css
.class {
  background-color: wheat;
  width: 80%;
}
```

> tip：
>
> - 基本类型检查函数：`iscolor`、`isnumber`、`isstring`、`iskeyword`、`isurl`。
> - 如果要检查某个值除了是数字之外是否还具有特定的单位，可以使用这些函数：`ispixel`、`ispercentage`、`isem`、`isunit`。

### CSS 守卫

与 Mixin 守卫类似，守卫也可以应用于 css 选择器，它是声明 mixin 然后立即调用它的语法糖。

例如，在 Less 1.5.0 之前你必须这样做：

```less
.my-optional-style() when (@my-option = true) {
  button {
    color: white;
  }
}
.my-optional-style();
```

现在，可以将守卫直接应用于样式。

```less
button when (@my-option = true) {
  color: white;
}
```

### 关键词 `!important`

在 mixin 调用后可以使用 `!important` 关键字将其继承的所有属性标记为 `!important`。

```less
.foo (@bg: #f5f5f5; @color: #900) {
  background-color: @bg;
  color: @color;
}
.unimportant {
  .foo();
}
.important {
  .foo() !important;
}
```

编译为：

```css
.unimportant {
  background-color: #f5f5f5;
  color: #900;
}
.important {
  background-color: #f5f5f5 !important;
  color: #900 !important;
}
```

### 向 Mixins 传递参数

#### 基本示例

```less
.border-radius(@radius) {
  -webkit-border-radius: @radius;
  -moz-border-radius: @radius;
  border-radius: @radius;
}
#header {
  .border-radius(4px);
}
.button {
  .border-radius(6px);
}
```

编译为：

```css
#header {
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
}
.button {
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  border-radius: 6px;
}
```

#### 参数默认值

可以为 mixins 的参数设置默认值。

```less
.border-radius(@radius: 5px) {
  -webkit-border-radius: @radius;
  -moz-border-radius: @radius;
  border-radius: @radius;
}
#header {
  .border-radius();
}
```

编译为：

```css
#header {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
```

#### 参数分隔符

最初，参数仅用逗号分隔，但后来添加了分号以支持将逗号分隔的列表值传递给单个参数。

```less
// 形参列表可以使用逗号分割
.mixin1 (@color, @bg) {
  color: @color;
  background-color: @bg;
}
// 形参列表也可以使用分号分隔
.mixin2 (@font-family; @pos: center) {
  font-family: @font-family;
  text-align: @pos;
}
.mixin3(@tp) {
  transition-property: @tp;
}
.test1 {
  // #008c8c传递给@color；skyblue传递给@bg
  .mixin1(#008c8c, skyblue);
  // "Helvetica Neue", Arial, sans-serif传递给@font-family；right传递给@pos
  .mixin2("Helvetica Neue", Arial, sans-serif; right);
  // margin-right, color传递给@tp
  .mixin3(margin-right, color;);
}
.test2 {
  // "Helvetica Neue", Arial, sans-serif传递给@font-family；@pos使用默认值center
  .mixin2(@font-family: "Helvetica Neue", Arial, sans-serif;);
  // margin-right, color传递给@tp
  .mixin3(~(margin-right, color));
}
```

编译为：

```css
.test1 {
  color: #008c8c;
  background-color: skyblue;
  font-family: "Helvetica Neue", Arial, sans-serif;
  text-align: right;
  transition-property: margin-right, color;
}
.test2 {
  font-family: "Helvetica Neue", Arial, sans-serif;
  text-align: center;
  transition-property: margin-right, color;
}
```

#### 重载 mixins

```less
.mixin(@color) {
  color-1: @color;
}
.mixin(@color, @padding: 2) {
  color-2: @color;
  padding-2: @padding;
}
.mixin(@color, @padding, @margin: 2) {
  color-3: @color;
  padding-3: @padding;
  margin: @margin @margin @margin @margin;
}
.class {
  .mixin(#008000);
}
```

编译为：

```css
.class {
  color-1: #008000;
  color-2: #008000;
  padding-2: 2;
}
```

#### 命名参数

mixin 引用可以通过参数名称而非位置来提供参数值。任何参数都可以通过其名称引用，并且无需遵循任何特殊顺序。

```less
.mixin(@color: black; @margin: 10px; @padding: 20px) {
  color: @color;
  margin: @margin;
  padding: @padding;
}
.class1 {
  .mixin(@margin: 20px; @color: #33acfe);
}
.class2 {
  .mixin(#efca44; @padding: 40px);
}
```

编译为：

```css
.class1 {
  color: #33acfe;
  margin: 20px;
  padding: 20px;
}
.class2 {
  color: #efca44;
  margin: 10px;
  padding: 40px;
}
```

#### `@arguments` 变量

`@arguments` 在 mixin 中具有特殊含义，它包含了调用 mixin 时传递的所有参数。如果你不想处理单个参数，这很有用。

```less
.box-shadow(@x: 0, @y: 0, @blur: 1px, @color: #000) {
  -webkit-box-shadow: @arguments;
  -moz-box-shadow: @arguments;
  box-shadow: @arguments;
}
.big-block {
  .box-shadow(2px, 5px);
}
```

编译为：

```css
.big-block {
  -webkit-box-shadow: 2px 5px 1px #000;
  -moz-box-shadow: 2px 5px 1px #000;
  box-shadow: 2px 5px 1px #000;
}
```

#### 剩余参数

如果希望 mixin 接受可变数量的参数，可以使用 `...`。在变量名后使用 `...` 会将剩余的所有参数都赋值给该变量。

```less
.mixin(...) {        // matches 0-N arguments
.mixin() {           // matches exactly 0 arguments
.mixin(@a: 1) {      // matches 0-1 arguments
.mixin(@a: 1, ...) { // matches 0-N arguments
.mixin(@a, ...) {    // matches 1-N arguments
```

```less
.mixin(@font-size, @color, @border...) {
  // @border is bound to arguments after @font-size and @color
  // @arguments is bound to all arguments
  font-size: @font-size;
  color: @color;
  border: @border;
}
.test {
  .mixin(1.5rem, #f40, 1px, solid, #008c8c);
}
```

编译为：

```css
.test {
  font-size: 1.5rem;
  color: #f40;
  border: 1px solid #008c8c;
}
```

### 模式匹配

可以根据传递给 mixin 的参数改变 mixin 的行为。

```less
.mixin(dark, @color) {
  color: darken(@color, 10%);
  background-color: #fff;
}
.mixin(light, @color) {
  color: lighten(@color, 10%);
  background-color: black;
}
@switch: light;
.class {
  // 第一个mixin期望的第一个参数是dark，第二个mixin期望的第一个参数是light
  // 因此这里只会匹配第二个mixin
  .mixin(@switch, #888);
}
```

编译为：

```css
.class {
  color: #a2a2a2;
  background-color: black;
}
```

也可以根据传递的参数个数进行匹配（和上文提到的重载 mixins 类似），比如对于以下 mixin：

```less
.mixin(@a) {
  color: @a;
}
.mixin(@a, @b) {
  color: fade(@a, @b);
}
```

若用一个参数调用它，将得到第一个 mixin 的输出；若用两个参数调用它，则会得到第二个 mixin 的输出。

### 属性 / 变量访问器

从 Less 3.5 开始，我们可以像使用函数一样使用 mixin —— 通过属性 / 变量访问器从 mixin 规则中选择一个值。

```less
.average(@x, @y) {
  @result: ((@x + @y) / 2);
}
.mixin() {
  color: #008c8c;
}

div {
  padding: .average(16px, 50px)[@result];
  color: .mixin()[color];
  // 也可以写成：color: .mixin[color];
}
.no-lookup {
  // 没有指定查找值，则使用最后一个声明的值
  padding: .average(16px, 50px)[];
}
```

编译为：

```css
div {
  padding: 33px;
  color: #008c8c;
}
.no-lookup {
  padding: 33px;
}
```

### Mixins 递归

在 Less 中，mixin 可以调用自身。这种特性与 mixin 守卫结合使用，可以用来创建各种迭代 / 循环结构。

#### 示例 1

```less
.loop(@counter) when (@counter > 0) {
  width: (10px * @counter);
  .loop((@counter - 1))
}
div {
  .loop(5);
}
```

编译为：

```css
div {
  width: 50px;
  width: 40px;
  width: 30px;
  width: 20px;
  width: 10px;
}
```

#### 示例 2

```less
.generate-columns(@n, @i: 1) when (@i =< @n) {
  .column-@{i} {
    width: (100% * @i / @n);
  }
  .generate-columns(@n, (@i + 1))
}
.generate-columns(4);
```

编译为：

```css
.column-1 {
  width: 25%;
}
.column-2 {
  width: 50%;
}
.column-3 {
  width: 75%;
}
.column-4 {
  width: 100%;
}
```

### Mixins 别名

将 mixin 调用赋值给变量，可以用于后续的映射查找，也可以进行变量调用。

#### 映射查找

```less
#theme.dark.navbar {
  .colors(light) {
    primary: purple;
  }
  .colors(dark) {
    primary: black;
    secondary: grey;
  }
}
.navbar {
  // 将 mixin 调用赋值给变量
  @colors: #theme.dark.navbar.colors(dark);
  // 映射查找
  background: @colors[primary];
  border: 1px solid @colors[secondary];
}
```

编译为：

```css
.navbar {
  background: black;
  border: 1px solid grey;
}
```

#### 变量调用

```less
#library() {
  .colors() {
    background: green;
  }
}
.box {
  // 将 mixin 调用赋值给变量
  @alias: #library.colors();
  // 变量调用
  @alias();
}
```

编译为：

```css
.box {
  background: green;
}
```

## 分离规则集

### 基本用法

```less
// 声明分离规则集
@detached-ruleset: {
  background: red;
}; // 这里的分号在 less 3.5.0+ 中是可选的
.top {
  // 调用分离规则集
  @detached-ruleset();
}
```

编译为：

```css
.top {
  background: red;
}
```

> 备注：调用分离规则集的括号是必需的，除非后面跟着查找值（见下文的「属性 / 变量访问器」和「将规则集作为映射关系」）。

分离规则集的一个常见应用场景是将其作为 mixin 参数传递：

```less
.desktop-and-old-ie(@rules) {
  @media screen and (min-width: 1200px) {
    @rules();
  }
  html.lt-ie9 & {
    @rules();
  }
}
header {
  background-color: blue;
  .desktop-and-old-ie({
    background-color: red;
  });
}
```

编译为：

```css
header {
  background-color: blue;
}
@media screen and (min-width: 1200px) {
  header {
    background-color: red;
  }
}
html.lt-ie9 header {
  background-color: red;
}
```

### 作用域

分离规则集和 mixin 一个重要的区别是：mixin 中变量的作用域取决于调用 mixin 处的作用域，而分离规则集中的变量有自己的独立作用域。

```less
.mixin() {
  @color: blue;
}
.mixin-caller {
  .mixin();
  color: @color; // color: blue;
}
@ruleset: {
  @color: blue;
};
.ruleset-caller {
  @ruleset();
  color: @color; // 语法错误
}
```

分离规则集可以使用其声明和调用处所有可访问的变量和混合。如果两个作用域包含相同的变量或混合，则声明作用域的值优先。

```less
@detached-ruleset: {
  caller-variable: @caller-variable;
  .caller-mixin();
};
selector {
  @detached-ruleset();
  @caller-variable: value;
  .caller-mixin() {
    variable: declaration;
  }
}
```

编译为：

```css
selector {
  caller-variable: value;
  variable: declaration;
}
```

```less
@caller-variable: global-value;
.caller-mixin() {
  variable: global-declaration;
}
@detached-ruleset: {
  caller-variable: @caller-variable;
  .caller-mixin();
};
selector {
  @detached-ruleset();
  @caller-variable: value;
  .caller-mixin() {
    variable: declaration;
  }
}
```

编译为：

```css
selector {
  caller-variable: global-value;
  variable: global-declaration;
}
```

### 属性 / 变量访问器

从 Less 3.5 开始，可以使用属性 / 变量访问器（也称为“查找”）从分离规则集中选择一个值。

```less
@config: {
  option1: true;
  option2: false;
}
.mixin() when (@config[option1] = true) {
  selected: value;
}
.box {
  .mixin();
}
```

编译为：

```css
.box {
  selected: value;
}
```

如果查找返回的是另一个分离规则集，则可以使用第二次查找来获取该值。

```less
@config: {
  @colors: {
    primary: blue;
  }
}
.box {
  color: @config[@colors][primary];
}
```

编译为：

```css
.box {
  color: blue;
}
```

## 映射

### 将规则集作为映射关系

```less
@sizes: {
  mobile: 320px;
  tablet: 768px;
  desktop: 1024px;
}
.navbar {
  display: block;
  @media (min-width: @sizes[tablet]) {
    display: inline-block;
  }
}
```

编译为：

```css
.navbar {
  display: block;
}
@media (min-width: 768px) {
  .navbar {
    display: inline-block;
  }
}
```

### 将 Mixin 调用作为映射关系

```less
#library() {
  .colors() {
    primary: green;
    secondary: blue;
  }
}
.button {
  background-color: #library.colors()[primary];
  border-color: #library.colors()[secondary];
  // 也可以写成：
  // background-color: #library.colors[primary];
  // border-color: #library.colors[secondary];
}
```

编译为：

```css
.button {
  background-color: green;
  border-color: blue;
}
```

当然也可以使用 mixin 别名简化操作：

```less
.button {
  @color: #library.colors();
  background-color: @color[primary];
  border-color: @color[secondary];
}
```

### 在查找中使用变量

需要注意的是，`[@lookup]` 查找语法中的 `@lookup` 会被视为映射关系中的键名，而非变量。如果希望键名被当作变量处理，可以使用 `@@variable` 语法。

```less
.foods() {
  @dessert: ice cream;
}
@key-to-lookup: dessert;
.lunch {
  treat: .foods[@@key-to-lookup];
}
```

编译为：

```css
.lunch {
  treat: ice cream;
}
```

