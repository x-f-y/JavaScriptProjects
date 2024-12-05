const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false, // 保存时不进行语法检查
})
