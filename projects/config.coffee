projects = {}

projects["OneTechnologies.Clients.SPA"] = require './OneTechnologies.Clients.SPA/config.coffee'
projects["jsBenchmarks"] = require './jsBenchmarks/config.coffee'
projects["ToDoApp"] = require './ToDoApp/config.coffee'

projects.currentProject = "OneTechnologies.Clients.SPA"

module.exports = projects
