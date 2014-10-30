module.exports = (grunt) ->
  spawn = require('child_process').spawn
  fs = require('fs')
  async = require('async')
  root = __dirname
  test = root + '/'
  specs = test + 'specs/'
  benchmarks = test + 'benchmarks/'
  testServer = test
  testServerJs = testServer + 'lib/'
  coverage = testServer + 'coverage/'
  cp = require('child_process')

  testServerPath = testServer + 'unitTestServer.js'
  testServerPort = 4050
  testServerUrl = 'localhost:' + testServerPort
  testServerWebSocketPort = 1337
  currentProject = "jsBenchmarks"


  if typeof grunt.option('proj') isnt "undefined"
    currentProject = grunt.option('proj')

  config = require("./projects/#{currentProject}/config.coffee")


  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-istanbul'
  grunt.loadNpmTasks 'grunt-parallel'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-requirejs'

  # Make task shortcuts
  grunt.registerTask 'default', ['test']
  grunt.registerTask 'test', ['clean','copy','coffeeCompile','jade','requirejs','instrument','startUnitTestServer']
  grunt.registerTask 'update', ['clean','copy','coffeeCompile','instrument']
    
  isJade = (f) ->
    return f.indexOf(".jade") is -1

  console.log grunt.option
  # Configure Grunt
  grunt.initConfig
    requirejs:
      compile:
        options:
          name:  'itchcork'
          baseUrl: './lib/itchcork'
          paths: {
                  'lodash' : '../../lib/lodash',
                  'benchmark' : '../../lib/benchmark',
                  'platform' : '../../lib/platform'
                  'lib': '../../lib'
          }
          inlineText: true,
          optimize: "none"
          optimizeAllPluginResources: true
          pragmas: {
              build: true
          }
          stubModules: ['text']
          out: 'lib/itchcork.js'
    clean:
      testsrc: ['_src']
      specs : ['specs']
      instrumented: ['_instrumented']
      coverage: ['coverage.json']
    copy:
      src:
         files: [
           {expand: true, cwd: config.jsRootPath, flatten: false, src: config.jsUnderTestInclude, dest: '_src', filter: isJade}

         ]
      specs:
        files: [
          {expand: true, cwd: config.specsPath, flatten: false, src: ['**'], dest: 'specs'}
        ]
      paths:
        files: [
          {expand: true, cwd: 'projects/'+currentProject, flatten: false, src: ['paths.js'], dest: 'app'}
        ]

    concat:
      itchcork:
        src: [testServerJs + 'itchcork/**/*.js']
        dest: testServerJs + 'itchcork.js'

    makeReport:
      src: ['coverage.json']
      options:
        dir: 'coverage'
        basePath: ''

    instrument:
      files: config.coverage
      options:
        basePath : '_instrumented'
        flatten: false

    parallel:
      dev:
        options:
          stream: true
        tasks: [ { grunt: true, args: ['test','--proj',currentProject] }, { grunt: true, args: ['watch','--proj',currentProject] }]

    watch:
      currentProjCode:
        files: ['_src/**/*.js']
        tasks:['instrument']
        options:
          nospawn: false
          interrupt: true
          livereload: 1337
      currentProjSpecs:
        files: ['specs/*.js']
        options:
          nospawn: false
          interrupt: true
          livereload: 1337
      itchcork:
        files: 'libs/itchcork/**'
        tasks: ['requirejs']
      coverage:
        files: ['coverage.json']
        tasks: ['makeReport']
        options:
          nospawn: false
          interrupt: true
          livereload: 1337

  grunt.registerTask 'startUnitTestServer', ->
    alreadyOn = false
    callback = (result) ->
      alreadyOn = result
      unless alreadyOn
        startServer(done, testServerPath)
      else
        console.log 'no need to start JS Unit Test Server'
        done()
    testSocket testServerPort, this.async, callback
    done = this.async()

  grunt.registerTask 'kill', ->
    cmd('taskkill /IM node.exe /F', this.async())

  grunt.registerTask 'jade', ->
    cmd('jade.cmd', this.async())

  cmd = (cmd, done) ->
    exec = cp.exec
    execCmd = exec(cmd, {}, () ->
      done() if done
    )
    execCmd.stdout.pipe process.stdout
    execCmd.stderr.pipe process.stderr

  grunt.registerTask 'coffeeCompile', ->
    coffeeCompileList = []

    coffeeCompileList.push async.apply(cmd, 'node_modules\\.bin\\coffee --bare --compile -w ./_src')
    coffeeCompileList.push async.apply(cmd, 'node_modules\\.bin\\coffee --bare --compile -w ./specs')
    coffeeCompileList.push async.apply(cmd, 'node_modules\\.bin\\coffee --bare --compile -w ./app')
    coffeeCompileList.push async.apply(cmd, 'node_modules\\.bin\\coffee --bare --compile -w ./lib')
    coffeeCompileList.push async.apply(cmd, 'node_modules\\.bin\\coffee --bare --compile -w ./projects')
    async.parallel coffeeCompileList

  grunt.registerTask 'coffeeWatch', ->
    script ='coffeeWatch.cmd'
    coffeeSrc = spawn script, [], {detached: true}
    coffeeSrc.stdout.pipe process.stdout
    coffeeSrc.stderr.pipe process.stderr
    done = this.async()

  grunt.registerTask 'openBrowser', ->
    openPage done, testServerUrl
    done = this.async()

  startServer = (done, serverPath) ->
    spawn = cp.spawn
    server = spawn('node', [serverPath])
    server.stdout.pipe process.stdout
    server.stderr.pipe process.stderr
    server.on 'exit', (code) ->
      console.log 'server killed'
      done()

  openPage = (doneCallback, url) ->
    callback = (result) ->
      if result
        console.log(url)
        spawn = require('child_process').spawn
        chrome = spawn process.env[(if (process.platform is 'win32') then 'USERPROFILE' else 'HOME')] +
        '//AppData//Local//Google//Chrome//Application//chrome.exe',
          ['--new-tab --enable-benchmarks', url]
      doneCallback()
    testSocket testServerWebSocketPort, this.async, callback


  testSocket = (port, async, result) ->
    net = require('net')
    sock = new net.Socket()
    sock.setTimeout 1500
    sock.on('connect',
    () ->
      console.log
      result true
      done()
    ).on('error',
    (e) ->
      sock.destroy()
      result(false)
      done()
    ).on('timeout',
    (e) ->
      console.log 'ping timeout'
      result(false)
      done()
    ).connect port, '127.0.0.1'
    grunt.log.write 'Waiting...'
    done = async