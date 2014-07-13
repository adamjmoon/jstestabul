config = {}

config.path = "../jsBenchmarks/"
config.jsUnderTestPath = config.path
config.jsUnderTestInclude = ['**', '!specs/**']
config.specsPath = config.jsUnderTestPath + "specs/"
config.specNamingConvention = '_spec'
config.framework = "itchcork"
module.exports =  config