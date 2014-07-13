config = {}

config.path = "./lib/itchcork/"
config.jsUnderTestPath = config.path
config.jsUnderTestInclude = ['**','!specs/**']
config.specsPath = config.jsUnderTestPath + "specs/"
config.framework = "mocha"
module.exports =  config