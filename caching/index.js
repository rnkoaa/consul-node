/*const NodeCache = require( "node-cache" );
const myCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );

obj = { instances: [
  {
    "name": "service-1"
  },
  {
    "name" : "service-2"
  },
  {
    "name" : "service-3"
  }
]};

myCache.set( "service-a", obj, function( err, success ){
  if( !err && success ){
      console.log( success );
  }
});

myCache.get( "service-a", function( err, value ){
    if( !err ){
      if(value == undefined){
      }else{
        console.log( value );
      }
  }
});
*/

const NodeCache = require( "node-cache" );
const instanceCache = new NodeCache( { stdTTL: 30, checkperiod: 120 } );
const fs = require('fs');
const path = require('path');

const instanceFile = path.join(__dirname, 'instances.json');

const instancesString = fs.readFileSync(instanceFile, "utf-8");
const instances = JSON.parse(instancesString);

function addInstancesToCache(serviceName, instances){
  // remove any previous object
  instanceCache.del( serviceName );

  const cacheObj = {
    "instances": instances
  };
  instanceCache.set(serviceName, cacheObj, 30);
}

function getInstances(serviceName){
  const cacheObj = instanceCache.get(serviceName);

  if(cacheObj){
    return cacheObj.instances;
  }
  return [];
}

addInstancesToCache(instances[0].name, instances);

setTimeout(() => {
  console.log(instanceCache.get(instances[0].name));
}, 29000);


