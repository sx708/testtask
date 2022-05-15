class Plugins {
  
  constructor() {
    this.plugins = {}
  }
  
  set(name, module) {
    this.plugins[name] = module
  }
  
  get(name) {
    return this.plugins[name]
  }
}

module.exports = new Plugins
