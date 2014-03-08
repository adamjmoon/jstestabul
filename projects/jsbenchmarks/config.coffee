config = {}

config.path = "../jsBenchmarks/"
config.rootPath = "/"
config.jsUnderTestPath = config.path
config.jsUnderTestInclude = ['**', '!specs/**']
config.specsPath = config.jsUnderTestPath + "specs/"
config.framework = "itchcork"
module.exports =  config