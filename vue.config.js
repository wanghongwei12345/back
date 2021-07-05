module.exports={
  // 部署应用时的基本url
  publicPath:"",
  // 打包构建应用时的文件夹
  outputDir:"dist",
  // 打包时放置静态资源的文件夹img js css
  assetsDir:"static",
  // 指定生成的index文件
  indexPath:"index.html",
  // 配置请求代理
  devServer:{
    proxy:{
      "/api":{
        target:"http://localhost:3000",
        ws:true,
        changeOrigin:true
      }
    }
  }
}