
walkDir = (dir, done, specs) ->
  walk = (dir, done, specs) ->
    specsOnly = true  if specs
    originalDir = dir  if originalDir.length is 0
    results = []
    fs.readdir dir, (err, list) ->
      return done(err)  if err
      i = 0
      (next = ->
        file = list[i++]
        return done(null, results)  unless file
        file = dir + "/" + file
        fs.stat file, (err, stat) ->
          if stat and stat.isDirectory()
            walk file, ((err, res) ->
              results = results.concat(res)
              next()
              return
            ), specsOnly
          else
            if specsOnly
              results.push file.replace(originalDir, "specs")  if file.indexOf("_spec.js") > -1
            else
              results.push file.replace(originalDir + "/", "").replace(".js", "")  if file.indexOf(".js") > -1 and file.indexOf("/vendor/") is -1 and (file.indexOf("/benchmarks/") is -1) and (file.indexOf("/specs/") is -1) and file.indexOf("/logger") is -1 and file.indexOf("/logger") is -1 and file.indexOf("/lib/") is -1 and file.indexOf("/appStart.js") is -1 and file.indexOf("/reload-client.js") is -1 and file.indexOf("/override.js") is -1 and file.indexOf("/main.js") is -1 and file.indexOf("/creditScoresWidgetViewmodel.js") is -1 and file.indexOf("/touchToggle.js") is -1
            next()
          return

        return
      )()
      return

    return
  originalDir = ""
  specsOnly = false
  walk dir, done, specs
  return
express = require("express")
http = require("http")
fs = require("fs")
path = require("path")
growl = require("growl")
projects = require("./projects/config")
config = projects[projects.currentProject]
app = module.exports = express()
app.configure "development", ->
  app.use express.errorHandler(
    dumpExceptions: true
    showStack: true
  )
  return

app.use express.errorHandler()
app.configure "production", ->

app.configure ->
  app.locals.basedir = __dirname
  app.set "port", 4000
  app.set "views", app.locals.basedir + "/views/"
  app.set "view engine", "jade"
  app.use express.favicon()
  app.use express.logger("dev")
  app.use express.bodyParser(keepExtensions: false)
  app.use app.router
  app.use express.static(__dirname)
  return

app.configure "development", ->
  app.use express.errorHandler()
  return

app.get "/", (req, res) ->
  res.render "index"
  return

app.get "/runner", (req, res) ->
  res.render "runner"
  next()
  return

app.get "/specs", (req, res) ->
  path = __dirname + "/specs"
  walkDir path, ((err, specList) ->
    throw err  if err
    options =
      specs: specList
      framework: config.framework

    res.send options
    return
  ), true
  return

app.all "/results", (req, res, next) ->
  res.header "Access-Control-Allow-Origin", "*"
  res.header "Access-Control-Allow-Methods", "POST,OPTIONS"
  res.header "Access-Control-Allow-Headers", "Content-Type"
  res.header "Access-Control-Allow-Headers", "Content-Type"
  next()
  return

app.get "/coverage", (req, res) ->
  res.render "coverage"
  return

app.post "/coverage", (req, res) ->
  path = __dirname
  fs.writeFile path + "/coverage.json", req.body.coverage, (err) ->
    if err
      console.log err
    else
      console.log "coverage.json file was saved!"
      res.send 200
    return

  return

app.post "/stats", (req, res) ->
  stats = JSON.parse(req.body.stats)
  resultsFilePath = __dirname + "/results/" + projects.currentProject + ".json"
  unless typeof (growl) is "undefined"
    if stats.failures > 0
      growl stats.failures + " of " + stats.tests + " tests failed",
        title: "JS Unit Test Failure"
        image: __dirname + "/content/error.png"

    else
      growl stats.passes + " tests passed in " + stats.duration + "ms",
        title: "JS Unit Test Success"
        image: __dirname + "/content/ok.png"

  fs.writeFile resultsFilePath, JSON.stringify(stats), (err) ->
    if err
      console.log err
    else
      console.log "results.json file was saved!"
      res.send 200
    return

  return

app.get "/sourceList", (req, res) ->
  path = __dirname + "/_src"
  walkDir path, ((err, sourceList) ->
    throw err  if err
    console.log sourceList
    res.send sourceList
    return
  ), false
  return


# Start the app
http.createServer(app).listen app.get("port"), ->
  console.log "Express server listening on port " + app.get("port")
  return
