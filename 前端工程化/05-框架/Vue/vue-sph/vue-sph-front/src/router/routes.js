export default [
    {
        path: '/home',
        name: 'home',
        component: () => import("@/pages/Home"),
        meta: {
            // 是否显示头部MyHeader组件
            showHeader: true,
            // 是否显示底部MyFooter组件
            showFooter: true,
            // 是否显示全部商品分类的下拉菜单
            showCate: true
        }
    },
    {
        path: '/search/:keyword?', // params参数keyword的传递是可选的
        name: 'search',
        component: () => import("@/pages/Search"),
        meta: {
            showHeader: true,
            showFooter: true,
            showCate: false
        }
    },
    {
        path: '/detail/:skuId',
        name: 'detail',
        component: () => import("@/pages/Detail"),
        meta: {
            showHeader: true,
            showFooter: true,
            showCate: false
        }
    },
    {
        path: '/addCartSuccess',
        name: 'addCartSuccess',
        component: () => import("@/pages/AddCartSuccess"),
        beforeEnter(to, from, next) {
          if(from.name === 'detail' || from.fullPath === '/'){
              next();
          }else{
              // 中断当前的导航（重置到 from 路由对应的地址）
              next(false);
          }
        },
        meta: {
            showHeader: true,
            showFooter: true
        }
    },
    {
        path: '/shopCart',
        name: 'shopCart',
        component: () => import("@/pages/ShopCart"),
        meta: {
            showHeader: true,
            showFooter: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("@/pages/Login"),
        meta: {
            showHeader: false,
            showFooter: false
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import("@/pages/Register"),
        meta: {
            showHeader: false,
            showFooter: false
        }
    },
    {
        path: '/trade',
        name: 'trade',
        component: () => import("@/pages/Trade"),
        beforeEnter(to, from, next) {
          if(from.name === 'shopCart'){
              next();
          }else{
              // 中断当前的导航（重置到 from 路由对应的地址）
              next(false);
          }
        },
        meta: {
            showHeader: true,
            showFooter: true
        }
    },
    {
        path: '/pay',
        name: 'pay',
        component: () => import("@/pages/Pay"),
        beforeEnter(to, from, next){
            if(from.name === 'trade' || from.fullPath === '/'){
                next();
            }else{
                // 中断当前的导航（重置到 from 路由对应的地址）
                next(false);
            }
        },
        meta: {
            showHeader: true,
            showFooter: true
        }
    },
    {
        path: '/paySuccess',
        name: 'paySuccess',
        component: () => import("@/pages/PaySuccess"),
        beforeEnter(to, from, next) {
          if(from.name === 'pay'){
              next();
          }else{
              // 中断当前的导航（重置到 from 路由对应的地址）
              next(false);
          }
        },
        meta: {
            showHeader: true,
            showFooter: true
        }
    },
    {
        path: '/myOrder',
        name: 'myOrder',
        component: () => import("@/pages/MyOrder"),
        children: [
            {
                path: 'personOrder',
                name: 'personOrder',
                component: () => import("@/pages/MyOrder/PersonOrder.vue"),
                meta: {
                    showHeader: true,
                    showFooter: true
                }
            },
            {
                path: 'groupOrder',
                name: 'groupOrder',
                component: () => import("@/pages/MyOrder/GroupOrder.vue"),
                meta: {
                    showHeader: true,
                    showFooter: true
                }
            },
            // 访问我的订单页面时，默认重定向到个人订单部分
            {
                path: '/myOrder',
                redirect: '/myOrder/personOrder'
            }
        ],
        meta: {
            showHeader: true,
            showFooter: true
        }
    },
    // 访问应用时，默认重定向到首页
    {
        path: '/',
        redirect: '/home'
    }
]