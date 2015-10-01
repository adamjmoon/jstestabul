config = {}

config.path = "../Apollo/Client/src/"
config.jsRootPath = config.path
config.jsUnderTestPath = config.jsRootPath
config.jsUnderTestInclude = ['**','!specs/*','!**/*.less']
config.specsPath = "../Apollo/Client/test/unit"
config.specsFileNameEnding = ".spec"
config.coverage = ["_src/**/*.js"]
config.framework = "mocha"
config.codeExt = ".js"

module.exports =  config