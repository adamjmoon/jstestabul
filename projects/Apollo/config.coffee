config = {}

config.path = "../Apollo/Client/src/"
config.jsRootPath = config.path + "scripts/"
config.jsUnderTestPath = config.jsRootPath
config.jsUnderTestInclude = ['**']
config.specsPath = config.path + "specs/"
config.coverage = ["_src/**/*.js"]
config.framework = "mocha"

module.exports =  config