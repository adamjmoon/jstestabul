config = {}

config.path = "../ToDoApp/assets/"
config.rootPath = "/"
config.jsUnderTestPath = config.path + "javascripts/"
config.jsUnderTestInclude = ['**',"!*.js",'!main.coffee', '!main.js', '!specs/**', '!vendor/**']
config.specsPath = config.jsUnderTestPath + "specs/"
config.framework = "mocha"
module.exports =  config