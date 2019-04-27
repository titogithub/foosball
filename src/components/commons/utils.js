const toggleModal = (value, stateModal) => {
  this.setState({ value: !stateModal })
}

const exactNoOfGroups = (groupsNo, players) => {
  console.log("exact No of groups")
}

const unbalancedGroups = (groupsNo, players) => {
  console.log("unbalanced groups")
}


export {
   toggleModal,
   exactNoOfGroups,
   unbalancedGroups
    }