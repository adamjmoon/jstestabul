requirejs.config
  baseUrl: ""
  paths:
    itchcork: "lib/itchcork"
    text: "lib/require/text"
    durandal: "lib/durandal"
    plugins: "lib/durandal/plugins"
    transitions: "lib/durandal/transitions"
    platform: "lib/platform"
    lodash: "lib/lodash"
    benchmark: "lib/benchmark"

require ["app/start"]

