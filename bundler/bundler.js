const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const core = require('@babel/core')

const bundleAnalyser = (filename) => {
  const content = fs.readFileSync(filename, 'utf-8')
  const ast = parser.parse(content, {
    sourceType: 'module'
  })
  const dependencies = {}
  traverse(ast, {
    ImportDeclaration({ node }) {
      const dirname = path.dirname(filename)
      const newFile = './' + path.join(dirname, node.source.value)
      dependencies[node.source.value] = newFile
    }
  })
  const { code } = core.transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  })
  return {
    filename,
    dependencies,
    code
  }
}

const makeDependenciesGraph = (entry) => {
  const entryModule = bundleAnalyser(entry)
  const graphArray = [ entryModule ]
  for (let i = 0; i < graphArray.length; i++) {
    const { dependencies } = graphArray[i]
    for(let key in dependencies) {
      graphArray.push(bundleAnalyser(dependencies[key]))
    }
  }

  const graph = {}
  graphArray.forEach(item => {
    graph[item.filename] = {
      dependencies: item.dependencies,
      code: item.code
    }
  })

  return graph
}

const generateCode = (entry) => {
  const graph = JSON.stringify(makeDependenciesGraph(entry))
  return `
    (function(graph) {
      function require(module) {
        function localRequire(relativePath) {
          return require(graph[module].dependencies[relativePath])
        }
        var exports = {};
        (function(require, exports, code) {
          eval(code)
        })(localRequire, exports, graph[module].code)
        return exports;
      }
      require('${entry}')
    })(${graph})
  `
}

const code = generateCode('./src/index.js')
fs.writeFile('index.js', code, 'utf8',function(error){
  if(error){
      console.log(error)
      return false;
  }
  console.log('打包完成📦, 执行node index.js看看输出。')
})