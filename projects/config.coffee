projects = {}

projects["OneTechnologies.Clients.SPA"] = require './OneTechnologies.Clients.SPA/config.coffee'
projects["jsBenchmarks"] = require './jsBenchmarks/config.coffee'
projects["ToDoApp"] = require './ToDoApp/config.coffee'
projects["spl"] = require './spl/config.coffee'

projects.currentProject = "spl"

module.exports = projects
