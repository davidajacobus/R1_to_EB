# r-1-to-eb [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> ResilienceONE API to Everbridge API data sync

## Information
As is product that will map data from ReslienceONE to Everbridge. Important to note is that you MUST know the identity values for Everbridge in order to map certain content, such as Paths. Use the corresponding API(s) to gather this information. Samples provided using curl.
  
***IMPORTANT***

The Everbridge API expects that the externalId match that of the UniqueClientID within ResilienceONE. This tools intent is
to provide you with a simple means to sync the data between systems if you are not doing so from any other
  
**PATHS API**:
curl -u <USERNAME>:<PASSWORD> -i -H 'Accept:application/json' https://api.everbridge.net/rest/contactPaths/<ORGANIZATIONID>
  
**CONTACTS API**:
curl -u <USERNAME>:<PASSWORD> -i -H 'Accept:application/json' https://api.everbridge.net/rest/contacts/<ORGANIZATIONID>
  
**STATUS API**:
N/A at the time of this writing
  
**RECORD TYPES API**:
curl -u <USERNAME>:<PASSWORD> -i -H 'Accept:application/json' https://api.everbridge.net/rest/recordTypes/<ORGANIZATIONID>
  
**DEPENDENCIES**:
https://www.npmjs.com/package/node-rest-client

## Data Map
R1 User --> EB Contact Mapping

```json
[{"UniqueClientId":"123ABC", --> externalId
 "LastName":"Doe", --> lastname
 "FirstName":"John", --> firstname
 "MiddleInitial":" ",
 "LoginId":"JDoe",
 "Suffix":" ",
 "Email":"jdoe@here.com", --> pathId : value
 "AltEmail":"", --> pathId : value
 "AltEmail2":"", --> pathId : value
 "WorkPhone":"", --> pathId : value
 "Extension":"", --> pathId : value
 "MobilePhone":"", --> pathId : value
 "HomePhone":"", --> pathId : value
 "Pager":"", --> pathId : value
 "PrimaryPhone":"", --> pathId : value
 "Address1":null,
 "Address2":null,
 "City":null,
 "StateCode":null,
 "PostalCode":null,
 "CountryCode":null, --> country
 "TitleOfPersonWhoPerformsId":null,
 "Notes":"",
 "EmergencyContactName":"",
 "EmergencyContactNumber":"",
 "EmergencyContactExtension":"",
 "FacilityId":"1",
 "FloorNumber":"",
 "OfficeNumber":"",
 "DepartmentId":null,
 "IsUser":true,
 "IsActive":true,
 "IsPrivate":false,
 "IsExecutive":false,
 "CanDeclareEvents":false,
 "IsExternalContact":false,
 "IsLocked":false,
 "IsCMTeamMember":false,
 "IsSiteAdmin":false,
 "CreateDate":"2007-12-21T00:00:00",
 "LastUpdatedBy":"janeDoe",
 "LastUpdatedDate":"2014-08-27T17:17:43.927"
 },
 {
 }]
 ```


## License

Apache-2.0 © [David Jacobus](https://github.com/djacobus)


[npm-image]: https://badge.fury.io/js/r-1-to-eb.svg
[npm-url]: https://npmjs.org/package/r-1-to-eb
[travis-image]: https://travis-ci.org/djacobus/r-1-to-eb.svg?branch=master
[travis-url]: https://travis-ci.org/djacobus/r-1-to-eb
[daviddm-image]: https://david-dm.org/djacobus/r-1-to-eb.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/djacobus/r-1-to-eb
