/*
  ==============================================================================================================================
  = As is product that will map data from ReslienceONE to Everbridge. Important to note is that you MUST know
  = the identity values for Everbridge in order to map certain content, such as Paths. Use the corresponding API(s)
  = to gather this information. Samples provided using curl.
  =
  = *** IMPORTANT ***
  = The Everbridge API expects that the externalId match that of the UniqueClientID within ResilienceONE. This tools intent is
  = to provide you with a simple means to sync the data between systems if you are not doing so from any other
  ==============================================================================================================================
  = PATHS API
  = curl -u <USERNAME>:<PASSWORD> -i -H 'Accept:application/json' https://api.everbridge.net/rest/contactPaths/<ORGANIZATIONID>
  ==============================================================================================================================
  = CONTACTS API
  = curl -u <USERNAME>:<PASSWORD> -i -H 'Accept:application/json' https://api.everbridge.net/rest/contacts/<ORGANIZATIONID>
  ==============================================================================================================================
  = STATUS API
  = N/A at the time of this writing
  ==============================================================================================================================
  = RECORD TYPES API
  = curl -u <USERNAME>:<PASSWORD> -i -H 'Accept:application/json' https://api.everbridge.net/rest/recordTypes/<ORGANIZATIONID>
  ==============================================================================================================================
  = DEPENDENCIES
  = https://www.npmjs.com/package/node-rest-client
  ==============================================================================================================================
 */
'use strict';

/*
 =======================================
 = HTTP CLIENT SETUP FOR EACH API
 =======================================
*/
var Client = require('node-rest-client').Client;

//R1 Auth
var r1usr = "DOMAIN/USERNAME";
var r1pwd = "PASSWORD";
var r1options_auth={user: r1usr, password: r1pwd};
var r1client = new Client(r1options_auth);

//EB Auth
var ebusr = "USERNAME";
var ebpwd = "PASSWORD";
var eborgId = 0;
var eboptions_auth={user: ebusr, password: ebpwd};
var ebclient = new Client(eboptions_auth);

//EB Attributes: Path(s)
var ebEmail1PathID = 241901148045316;
var ebEmail2PathID = 241901148045317;
var ebSMS1PathID = 241901148045324;
var ebMOBILE1PathID = 241901148045319;
var ebMOBILE2PathID = 241901148045320;
var ebMOBILE3PathID = 241901148045314;

//EB RecordType
var ebRecordTypeID = 0;

//EB Contact Object to be posted
var ebContacts = [];

/*
  =======================================
  = GET R1 USERS, CONVERT TO EB CONTACTS
  =======================================
*/
function getR1UserData() {

  r1client.get("https://www.resilienceone.com/r1importsapi/api/users/getall/false", function (data, response) {

    //CONVERT DATA FROM R1 TO EB
    for (var i = 0; i < data.length; i++) {
        ebContacts.push({
          recordTypeId : ebRecordTypeID,
          organizationId: eborgId,
          externalId: data[i].UniqueClientId,
          lastName: data[i].LastName,
          firstName: data[i].FirstName,
          country: data[i].CountryCode,
          "paths": [{
            "waitTime": 0,
            "pathId": ebEmail1PathID,
            "value": data[i].Email,
            "skipValidation": false
          },{
            "waitTime": 0,
            "pathId": ebEmail2PathID,
            "value": data[i].AltEmail,
            "skipValidation": false
          },{
            "waitTime": 0,
            "pathId": ebSMS1PathID,
            "value": data[i].MobilePhone,
            "skipValidation": false
          },{
            "waitTime": 0,
            "pathId": ebMOBILE1PathID,
            "value": data[i].WorkPhone,
            "skipValidation": false
          },{
            "waitTime": 0,
            "pathId": ebMOBILE2PathID,
            "value": data[i].HomePhone,
            "skipValidation": false
          },{
            "waitTime": 0,
            "pathId": ebMOBILE3PathID,
            "value": data[i].MobilePhone,
            "skipValidation": false
          }
          ]
        })
    }
    postContactData();
  });

}

/*
 =======================================
 = POST R1 USERS TO EB CONTACTS
 =======================================
 */
function postContactData() {

  var args = {
    data: ebContacts,
    headers: {"Content-Type": "application/json"}
  };

  ebclient.post("https://api.everbridge.net/rest/contacts/" + eborgId.toString() + "/batch", args, function (data, response) {
    console.log(response);
    console.log(data.message);
  });


}

getR1UserData();

/*
  =======================================
  = R1 User --> EB Contact Mapping
  =======================================
*/
// [{"UniqueClientId":"123ABC", --> externalId
// "LastName":"Doe", --> lastname
// "FirstName":"John", --> firstname
// "MiddleInitial":" ",
// "LoginId":"JDoe",
// "Suffix":" ",
// "Email":"jdoe@here.com", --> pathId : value
// "AltEmail":"", --> pathId : value
// "AltEmail2":"", --> pathId : value
// "WorkPhone":"", --> pathId : value
// "Extension":"", --> pathId : value
// "MobilePhone":"", --> pathId : value
// "HomePhone":"", --> pathId : value
// "Pager":"", --> pathId : value
// "PrimaryPhone":"", --> pathId : value
// "Address1":null,
// "Address2":null,
// "City":null,
// "StateCode":null,
// "PostalCode":null,
// "CountryCode":null, --> country
// "TitleOfPersonWhoPerformsId":null,
// "Notes":"",
// "EmergencyContactName":"",
// "EmergencyContactNumber":"",
// "EmergencyContactExtension":"",
// "FacilityId":"1",
// "FloorNumber":"",
// "OfficeNumber":"",
// "DepartmentId":null,
// "IsUser":true,
// "IsActive":true,
// "IsPrivate":false,
// "IsExecutive":false,
// "CanDeclareEvents":false,
// "IsExternalContact":false,
// "IsLocked":false,
// "IsCMTeamMember":false,
// "IsSiteAdmin":false,
// "CreateDate":"2007-12-21T00:00:00",
// "LastUpdatedBy":"janeDoe",
// "LastUpdatedDate":"2014-08-27T17:17:43.927"
// },
// {...
// }]
