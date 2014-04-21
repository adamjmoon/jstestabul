module.exports = (grunt) ->
  spawn = require('child_process').spawn
  fs = require('fs')
  root = __dirname
  test = root + '/'
  specs = test + 'specs/'
  benchmarks = test + 'benchmarks/'
  testServer = test
  testServerJs = testServer + 'lib/'
  coverage = testServer + 'coverage/'
  cp = require('child_process')
  projects = require('./projects/config.coffee')
  testServerPath = testServer + 'unitTestServer.js'
  testServerPort = 4050
  testServerUrl = 'localhost:' + testServerPort
  testServerWebSocketPort = 1337


  console.log grunt.option('proj')
  if typeof grunt.option('proj') isnt "undefined"
    projects.currentProject = grunt.option('proj')


  config = projects[projects.currentProject]

  console.log config

  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-istanbul'
  grunt.loadNpmTasks 'grunt-parallel'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-requirejs'

  # Make task shortcuts
  grunt.registerTask 'default', ['parallel:dev','openBrowser']
  grunt.registerTask 'test', ['clean','copy:src','coffeeCompile','jade','instrument','requirejs','copy:main','copy:specs','coffeeCompile','startUnitTestServer']
  grunt.registerTask 'update', ['clean','copy:src','coffeeCompile','instrument','copy:main','copy:specs','coffeeCompile']

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
           {expand: true, cwd: config.jsUnderTestPath, flatten: false, src: config.jsUnderTestInclude, dest: '_src'}

         ]
      specs:
        files: [
          {expand: true, cwd: config.specsPath, flatten: false, src: ['**'], dest: 'specs'}
        ]
      main:
        files: [
          {expand: true, cwd: 'projects/'+projects.currentProject, flatten: false, src: ['paths.js'], dest: 'app'}
        ]

    concat:
      itchcork:
        src: [testServerJs + 'itchcork/**/*.js']
        dest: testServerJs + 'itchcork.js'

    makeReport:
      src: ['coverage.json']
      options:
        dir: 'coverage'
        basePath: 'coverage'

    instrument:
      files: ['_src/**/*.js']
      options:
        basePath : '_instrumented'
        flatten: false

    parallel:
      dev:
        options:
          stream: true
        tasks: [ { grunt: true, args: ['test','--proj',projects.currentProject] }, { grunt: true, args: ['watch','--proj',projects.currentProject] }]

    watch:
      currentProj:
        files: [config.specsPath + '**', config.jsUnderTestPath + '**']
        tasks:['update']
        options:
          nospawn: true
          interrupt: true
          livereload: testServerWebSocketPort
      coverage:
        files: ['coverage.json']
        tasks: ['makeReport']
        options:
          nospawn: true
          interrupt: true
          livereload: testServerWebSocketPort

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
      done())
    execCmd.stdout.pipe process.stdout
    execCmd.stderr.pipe process.stderr

  grunt.registerTask 'coffeeCompile', ->
    cmd('coffee.cmd', this.async())

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