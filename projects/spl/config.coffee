config = {}

config.path = "../SpendOnLife-Splice/assets/"
config.jsUnderTestPath = config.path + "javascripts/"
config.jsUnderTestInclude = ['**',"!*.js",'!App/*.html','!App/*.jade','!App/main.coffee', '!App/main.js', '!specs/**']
config.specsPath = config.jsUnderTestPath + "specs/"
config.framework = "mocha"
module.exports =  config