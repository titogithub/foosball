export default class DivideStrategy {
  constructor(){
    this.strategy = null
  }
  setStrategy(strategy){
    this.strategy = strategy
  }

  callStrategy(groupsNo, players){
    this.strategy(groupsNo, players)
  }
};
