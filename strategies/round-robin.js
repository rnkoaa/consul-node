const fs = require("fs");
const path = require("path");

let counter = 0;
const executedInstances = [];

const read = () => {
  return fs.readFileSync(path.join(__dirname, "./instances.json"), "utf-8");
};

const _sortInstances = (_instances) => {
  return _instances.sort((first, second) => {
    if (first.id < second.id) {
      return -1;
    } else if (first.id > second.id) {
      return 1;
    } else {
      return 0;
    }
  });
};

const selectNext = (instances) => {
  if (counter >= instances.length) {
    counter = 0;
  }

  const instanceName = instances[0].name;
  const mExecuted = executedInstances.filter(instance => {
    return instance.name === instanceName && instance.executed;
  });

  let executedInstance;
  if (mExecuted.length > 0) {
    if (mExecuted.length >= instances.length) {
      // we can 
      while (mExecuted.length) {
        mExecuted.pop();
      }
      executedInstance = instances[counter];
      executedInstance.executed = true;
      executedInstances.push(executedInstance);
    } else {
      const instancesToExecute = [];
      instances.forEach(instance => {
        if (!executedInstances.some(item => item.id === instance.id)) {
          instancesToExecute.push(instance);
        }
      });
      if (counter >= instancesToExecute.length) {
        counter = 0;
      }
      executedInstance = instancesToExecute[counter];
      executedInstance.executed = true;
      executedInstances.push(executedInstance);
    }
  } else {
    executedInstance = instances[counter];
    executedInstance.executed = true;
    executedInstances.push(executedInstance);
  }

  counter++;

  return executedInstance;
};

const selectByIndex = (mInstances, mExecutedInstances, mCounter) => {
  let mExecutedInstance = mInstances[mCounter];
  mExecutedInstance.executed = true;
  mExecutedInstances.push(mExecutedInstance);
};

for (let idx = 0; idx < 10; idx++) {
  
  const rawInstances = JSON.parse(read());
  const instances = _sortInstances(rawInstances);
 
  let idx = 0;
  
  instances.forEach(instance => instances.index = idx++);

  const execInstance = selectNext(instances);
  console.log(`==============Index: ${idx} - counter: ${counter} ==================`);
  console.log(execInstance);
  console.log("===============================================\n");
}