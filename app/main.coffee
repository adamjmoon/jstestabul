requirejs.config
  baseUrl: ""
  paths:
    itchcork: "lib/itchcork"
    text: "lib/require/text"
    json: "lib/require/json"
    durandal: "lib/durandal"
    transitions: "lib/durandal/transitions"
    plugins: "lib/durandal/plugins"
    platform: "lib/platform"
    lodash: "lib/lodash"
    benchmark: "lib/benchmark"
    ace: "../lib/ace"

require ["lib/testRunner/runnerSetup","app/start"], (setup, start) ->

  setup()

  return

