const {
  readcfg,
  // sleep,
} = require('./common')
const cfg = readcfg();

const os = require('os');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
  "proto/db.proto",
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
);
const dbaseproject = grpc.loadPackageDefinition(packageDefinition).dbaseproject;

const sch = {
  mongoose,
  userSchema,
} = require('./libs/schema');

const db = {
  MainBase: null,
}

/* 
  Connection setup function
*/

function baseConnect (name,) {
  return new Promise(resolve => {

    let dbaseURL = 'mongodb://127.0.0.1:27017/'
    if (cfg.dbaseURL) dbaseURL = cfg.dbaseURL

    const conn = mongoose.createConnection(dbaseURL+name, );

    // Wait for the connection to open (optional, as Mongoose buffers operations)
    conn.on('connected', () => {
        console.log('\x1b[33m%s\x1b[0m', 'Reconnect to ->', dbaseURL+name);
        db.MainBase = conn
        resolve(conn);
    });

    conn.on('disconnected', function() {
      console.log('\x1b[31m%s\x1b[0m', 'Disconnect from ->', dbaseURL+name);
      db.MainBase = null
      resolve(null)
    });

    // Handle connection errors
    conn.on('error', (err) => {
      // console.log('\x1b[31m%s\x1b[0m', 'Connection error:', err);
      console.log('- Mongodb error -', );
      db.MainBase = null
    });

  });  
}

async function createDocument (call, cb) {

  console.log('createDocument ->', call.request.collection);

  const base = db.MainBase
  if (base)  {    

    const Model = base.models[call.request.collection]
    const data = JSON.parse(call.request.data)
    
    if (!data._id)   data._id = new mongoose.Types.ObjectId()+''
    
    const model = new Model(data);
    await model.save();

    const obj = {
      collection: call.request.collection,
    }
    cb(null, obj);
  }
  else  {
    cb(null, { collection: 'error', });
  }
}

async function readDocument (call, cb) {
  
  console.log('readDocument ->', call.request.collection, call.request.query);
  
  const base = db.MainBase
  if (base)  {    

    const Model = base.models[call.request.collection]
    const query = JSON.parse(call.request.query)

    let populate = null
    if (call.request.populate && call.request.populate != '')  {
      populate = JSON.parse(call.request.populate)
      populate.model = base.models.Model
    }

    let select = null
    if (call.request.select && call.request.select != '')  select = JSON.parse(call.request.select)

    Model.find(query).populate(populate).select(select).exec(function (err, resp) { 

      const obj = {
        collection: call.request.collection,
        query: call.request.query,
        data: JSON.stringify([])
      }

      if (resp)  {
        obj.data = JSON.stringify(resp)
        cb(err, obj)
      }
      else  {
        obj.collection = 'error'
        cb(err, obj);
      }

    });  

  }
  else  {
    cb(null, {
      collection: 'error',
      query: call.request.query,
      data: JSON.stringify([])
    })  
  }
}

async function updateDocument (call, cb) {

  // console.log('updateDocument ->', call.request.collection);

  const base = db.MainBase
  if (base)  {    

    const Model = base.models[call.request.collection]
    const query = JSON.parse(call.request.query)
    let data = JSON.parse(call.request.data)

    Model.updateOne(query, { $set: data } , (err , resp) => {

      console.log('updateDocument ->', err, resp, '/', call.request.collection, call.request.query);

      if (resp)  {
        
        if (resp.nModified == 0 && resp.n == 0) {
          console.error('updateDocument -> error!');
        }

        const obj = {
          collection: call.request.collection,
          query: call.request.query,
          data: JSON.stringify(resp)
        }

        cb(err, obj)
      }
      else  {
        cb(null, {
          collection: 'error',
          query: call.request.query,
          data: JSON.stringify({})
        });
      }

    });
  }
  else  {
    cb(null, {
      collection: 'error',
      query: call.request.query,
      data: JSON.stringify({})
    });
  }
}

async function deleteDocument (call, cb) {

  console.log('deleteDocument ->', call.request.collection);

  const base = db.MainBase
  if (base)  {    
    
    const Model = base.models[call.request.collection]
    const query = JSON.parse(call.request.query)

    Model.deleteOne(query, (err , resp) => {
      // console.log(err, resp);
      if (resp)  {
        const obj = {
          collection: call.request.collection,
          query: call.request.query,
          data: JSON.stringify(resp)
        }
        cb(err, obj)
      }
      else  {
        cb(null, {
          collection: 'error',
          query: call.request.query,
          data: JSON.stringify({})
        });
      }

    });  
  }
  else  {
    cb(null, {
      collection: 'error',
      query: call.request.query,
      data: JSON.stringify({})
    });
  }
}

async function dropDatabase (call, cb) {

  console.log('dropDatabase ->', call.request);

  if (db.MainBase)  {
    db.MainBase.dropDatabase(() => {
      db.MainBase.close(() => {
        cb(null, { status: true })
      });
    })
  }
  else  {
    cb(null, { status: false })
  }
}

async function dropCollection (call, cb) {

  console.log('dropCollection ->', call.request);

  if (db.MainBase)  {
    // console.log('dropCollection =>', call.request);
    db.MainBase.dropCollection(call.request.collection, (err, result) => {
      // console.log('dropCollection ->', err, result)
      cb(null, { status: true });
    });
  }  
  else  {
    cb(null, { status: false });
  }
}

async function dbIsReady(call, cb) {

  let state = false
  if (db.MainBase)  state = true

  console.log('dbIsReady ->', state);

  cb (null, { status: state })
}

function getServer() {
  var server = new grpc.Server({'grpc.max_send_message_length': 50*1024*1024, 'grpc.max_receive_message_length': 50*1024*1024});
  server.addService(dbaseproject.DbaseProject.service, {

    createDocument: createDocument,
    readDocument: readDocument,
    updateDocument: updateDocument,
    deleteDocument: deleteDocument,

    dropDatabase: dropDatabase,
    dropCollection: dropCollection,

    dbIsReady: dbIsReady,

  });
  return server;
}

async function main ()  {

  if (!db.MainBase)  {
    await baseConnect(cfg.baseName, );
  }
  
  if (db.MainBase)  {
    db.MainBase.model('User', sch.userSchema);      
  }
  else  {
    main()
    return
  }

  const routeServer = getServer();  
  routeServer.bindAsync('0.0.0.0:'+cfg.dbasePort, grpc.ServerCredentials.createInsecure(), () => {
    // routeServer.start();
  });

  let dateTime = new Date();
  console.log("Dbase Server port ("+cfg.dbasePort+") start ->", dateTime.getDate()+'/'+(dateTime.getMonth()+1)+'/'+dateTime.getFullYear(), 
  dateTime.getHours()+':'+dateTime.getMinutes()+':'+dateTime.getSeconds());  

}

if (require.main === module) {
  main();
}

