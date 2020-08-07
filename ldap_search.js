'use strict';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var ldap = require('ldapjs');
const assert = require('assert');

var creds = {
  url: "ldap://10.160.16.10",
  bindDN: "OU=WORLDPAY,DC=worldpay,DC=local"
};

var opts = {
  filter: "(&(objectClass=user))",
  scope: "sub",
  client: "*"
};
//binding
function authDN(user, baseDN, password, cb) {
  client.bind(baseDN, password, function (err) {
    client.unbind();
    cb(err === null, err);
  });
}

function output(res, err) {				
  if (res) {
    console.log('success :' + res);
  } else {
    console.log(['Error :',err.code, err.dn, err.message ]);
  }
}

var client = ldap.createClient(creds);
authDN(client, 'adm_ciotirm717', 'password', output);

//search
  client.search('OU=DOCET,OU=Admin Groups,OU=Admin,OU=Infrastructure,OU=WORLDPAY,DC=worldpay,DC=local', opts, function(err, res) {
  assert.ifError(err);

  res.on('searchEntry', function(entry) {
    console.log('entry: ' + JSON.stringify(entry.object));
  });
  res.on('searchReference', function(referral) {
    console.log('referral: ' + referral.uris.join());
  });
  res.on('error', function(err) {
    console.error('error: ' + err.message);
  });
  res.on('end', function(result) {
    console.log('status: ' + result.status);
    console.log('result: ' + result);
    process.exit(1);
  });

});