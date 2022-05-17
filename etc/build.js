const fs = require('fs')
const path = require('path')
const esbuild = require('esbuild')
const sass = require('sass')
const postcss = require('postcss')
const csso = require('postcss-csso')
const autoprefixer = require('autoprefixer')
const chokidar = require('chokidar')
const throttle = require('lodash/throttle')
const chalk = require('chalk')
const { globalExternals } = require('@fal-works/esbuild-plugin-global-externals')

const projectName = 'About-Me'
const workdir = '/home/dev/learningProjects/About-Me'
if (!fs.existsSync(workdir)) {
  console.log(chalk.red(`The theme ${projectName} doesn't exist!`))
  process.exit()
}

process.env.NODE_PATH = process.env?.NODE_ENV ?? workdir
process.env.NODE_ENV = process.env?.NODE_ENV ?? 'development'

const isProductionBuild = process.env.NODE_ENV === 'production'
const buildAndExit = isProductionBuild

const srcdir = path.join(workdir, 'src')
const outdir = path.join(workdir, 'assets')

// Global state for compiler optimizations
const state = { dirtyJs: false, dirtyScss: false, busy: false }

/**
* JavaScript compilation with esbuild
*/
const compileJs = () => new Promise(resolve => {
  const entryPoints = [path.join(srcdir, 'js', 'app.js')]
  esbuild.build({
    bundle: true,
    entryPoints,
    outdir,
    minify: isProductionBuild,
    sourcemap: !isProductionBuild,
    target: ['es2020'], // No support for dinosaurs
    format: 'iife',
  })
    .then(log => {
      log.info = entryPoints.map(file => `compiled ${projectName}/assets/${path.basename(file)}`)
      resolve(log)
    })
    .catch(() => resolve({ errors: ['esbuild failed'], warnings: [], info: [] }))
})

/**
* SCSS compilation with dart sass, postprocess with autoprefixer and csso
*/
// Compile one input SCSS file to CSS file
const compileScss = (inFile, outFile) => new Promise(resolve => {
  const log = { errors: [], warnings: [], info: [] }

  const plugins = []
  if (isProductionBuild) plugins.push(csso())
  plugins.push(autoprefixer({ cascade: false, flexbox: false, grid: false }))

  try {
    const result = sass.compile(inFile, {
      sourceMap: !isProductionBuild,
      outputStyle: 'compressed'
    })
    postcss(plugins)
      .process(result.css, { from: outFile, to: outFile })
      .then(res => {
        res.warnings().forEach(w => {
          log.warnings.push(w.toString())
        })
        fs.writeFile(outFile, res.css, err => {
          if (err) {
            log.errors.push(err)
            return resolve(log)
          }
          log.info.push(`compiled ${projectName}/assets/${path.basename(outFile)}`)
          if (!result.map) {
            resolve(log)
          } else {
            fs.writeFile(`${outFile}.map`, result.map, err => {
              if (err) log.errors.push(err)
              resolve(log)
            })
          }
        })
      })
  } catch (err) {
    log.errors.push(err.message)
    return resolve(log)
  }
})

// Compiles multiple SCSS entry files
const compileAllScss = () => new Promise(resolve => {
  const log = { errors: [], warnings: [], info: [] }
  const scssSrcDir = path.join(srcdir, 'css')
  fs.readdir(scssSrcDir, (err, files) => {
    if (err) {
      log.errors.push(err)
      return resolve(log)
    }
    const scssToCompile = files
      .filter(entry => path.extname(entry) === '.scss')
      .map(file => {
        const inFile = path.join(scssSrcDir, file)
        const outFile = path.join(outdir, `${path.basename(file, '.scss')}.css`)
        return compileScss(inFile, outFile)
      })
    Promise.all(scssToCompile).then(logs => {
      logs.forEach(l => {
        log.errors.push(...l.errors)
        log.warnings.push(...l.warnings)
        log.info.push(...l.info)
      })
      resolve(log)
    })
  })
})

/**
* Display output logged during compilation
*/
const logSettledPromises = promiseResults => promiseResults.forEach(result => {
  if (result.status === 'fulfilled') {
    const { errors, warnings, info } = result.value
    if (errors.length) console.log(chalk.red('Errors: '), errors)
    if (warnings.length) console.log(chalk.yellow('Warnings: '), warnings)
    if (info.length) console.log(chalk.green('Info: '), info)
  } else {
    console.log(chalk.red('Errors: '), result.reason)
  }
})

// This function ensures 1 execution when multiple files change at once or in short succession
const compileWhenAble = throttle(function () {
  if (!state.dirtyJs && !state.dirtyScss) return

  const tasks = []

  if (state.dirtyJs) {
    tasks.push(compileJs)
    state.dirtyJs = false
  }
  if (state.dirtyScss) {
    tasks.push(compileAllScss)
    state.dirtyScss = false
  }

  const retry = setInterval(() => {
    if (state.busy) return
    state.busy = true
    clearInterval(retry)
    Promise.allSettled(tasks.map(task => task()))
      .then(logSettledPromises)
      .finally(() => {
        state.busy = false
      })
  }, 500)
}, 500, { leading: false, trailing: true })

const watchForChanges = () => {
  console.log(chalk.cyan('Watching files for changes…'))
  const watcher = chokidar.watch(`${srcdir}/**/*.(js|scss)`)

  const exit = () => watcher.close().then(() => process.exit())
  process.on('SIGINT', exit)
  process.on('SIGTERM', exit)

  watcher.on('change', file => {
    if (path.extname(file) === '.js') state.dirtyJs = true
    if (path.extname(file) === '.scss') state.dirtyScss = true
    compileWhenAble()
  })
}

/**
* Main runner
*/
console.log(chalk.cyan('Compiling JavaScript and Sass…'))

Promise.allSettled([
  compileJs(),
  compileAllScss()
])
  .then(logSettledPromises)
  .finally(() => {
    if (!buildAndExit) watchForChanges()
  })
