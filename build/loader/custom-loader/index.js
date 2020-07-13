module.exports = function (source) {
  // source是加载到的资源的源码，如css文件，则source为css文件的内容
  console.log('custom-loader:', source)
  // let useStrictPrefix = "'use strict';\n\n"
  // return useStrictPrefix + source
  return source
}
