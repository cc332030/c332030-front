
const fs = require('fs')

const build = 'build'

fs.rm(build, { recursive:true }, (err) => {

  // 忽略文件不存在报错
  if(err?.message?.indexOf('no such file or directory') < 0) {
    process.exit(-1)
  }

  fs.cp('src/css/',  `${build}/css`, {recursive: true}, (err) => {

    if(err){
      console.error(err.message)
      return true
    }

    const child_process = require('child_process')
    child_process.exec('tsc', function(err, sto) {
      console.log(sto)
    })
  })
})
