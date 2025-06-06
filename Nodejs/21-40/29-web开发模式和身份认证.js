/**
 * Web开发模式
 *  - 服务器端渲染的web开发模式（SSR，Server Side Render）
 *      概念：服务器发送给客户端的HTML页面，是在服务器通过字符串拼接，动态生成的。因此，客户端不需要
 *      使用ajax这样的技术额外请求页面的数据
 *  - 前后端分离的web开发模式
 *      概念：前后端分离的开发模式，依赖于ajax技术的广泛应用。简而言之，前后端分离的web开发模式，就是
 *      后端只负责提供api接口，前端使用ajax调用接口的开发模式
 */

/**
 * 对于服务端渲染和前后端分离这两种开发模式来说，分别有着不同的身份认证方案
 *  - 服务端渲染推荐使用Session认证机制 --- cookie
 *  - 前后端分离推荐使用JWT认证机制 --- token
 */

/**
 * HTTP协议的无状态性
 *  HTTP协议的无状态性，指的是客户端的每次HTTP请求都是独立的，连续多个请求之间没有直接的关系，服务器不会
 *  主动保留每次HTTP请求的状态
 */

/**
 * - Cookie是存储在用户浏览器中的一段不超过4KB的字符串。它由一个名称(Name)、一个值(Value)和其它几个用
 *   于控制Cookie有效期、安全性、使用范围的可选属性组成。不同域名下的Cookie各自独立，每当客户端发起请求时，
 *   会自动把当前域名下所有未过期的Cookie一同发送到服务器。
 * - 客户端第一次请求服务器的时候，服务器通过响应头的形式，向客户端发送一个身份认证的Cookie,客户端会自动
 *   将Cookie保存在浏览器中。随后，当客户端浏览器每次请求服务器的时候，浏览器会自动将身份认证相关的Cookie,
 *   通过请求头的形式发送给服务器，服务器即可验明客户端的身份。
 * - 由于Cookie是存储在浏览器中的，而且浏览器也提供了读写Cookie的API，因此，Cookie很容易被伪造，不具有安全性。
 *   因此不建议服务器将重要的隐私数据，通过Cookie的形式发送给浏览器。所以千万不要使用Cookie存储重要且隐私的数据
 */

/**
 * Session认证的局限性
 *  - Session认证机制需要配合Cookie才能实现。由于Cookie默认不支持跨域访问，所以，当涉及到前端跨域请求后端接口
 *    的时候，需要做很多额外的配置，才能实现跨域Session认证。
 *  - 注意：
 *      - 当前端请求后端接口不存在跨域问题的时候，推荐使用Session身份认证机制
 *      - 当前端需要跨域请求后端接口的时候，不推荐使用Session身份认证机制，推荐使用JWT认证机制
 * JWT(JSON Web Token)的组成部分
 *  - JWT通常由三部分组成，分别是Header（头部）、Payload（有效荷载）、Signature（签名）。三者之间使用英文的.进行分隔
 *    格式为：Header.Payload.Signature，其中Payload部分才是真正的用户信息，它是用户信息经过加密之后生成的字符串。而
 *    Header和Signature是安全性相关的部分，只是为了保证Token的安全性。
 * JWT的使用方式
 *  - 客户端收到服务器返回的JWT之后，通常会将它储存在localStorage或sessionStorage中。此后，客户端每次与服务器
 *    通信，都要带上这个JWT字符串，从而进行身份认证。推荐的做法是把JWT放在HTTP请求头的Authorization字段中。
 *    格式为：Authorization:Bearer <token>
 */

/**
 * Session认证和JWT认证的一个重要区别
 *  - 对于Session认证，用户的信息是保存在服务器端的（客户端保存的是cookie）
 *  - 对于JWT认证，用户的信息是保存在客户端（浏览器）的
 */
