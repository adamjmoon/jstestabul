config = {}

config.path = "../../WebClients/OneTechnologies.Clients.SPA/Content/assets/"
config.rootPath = "/"
config.jsUnderTestPath = config.path + "javascripts/"
config.jsUnderTestInclude = ['**',"!*.js",'!**/main.coffee', '!specs/**']
config.specsPath = config.jsUnderTestPath + "specs/"

config.framework = "mocha"
module.exports =  config