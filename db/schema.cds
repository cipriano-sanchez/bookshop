using { Currency, managed, sap } from '@sap/cds/common';
namespace sap.capire.bookshop;

entity Books : managed {
  key ID   : Integer;
  title    : localized String(111)  @mandatory;
  descr    : localized String(1111);
  author   : Association to Authors @mandatory;
  stock    : Integer;
  price    : Decimal;
  currency : Currency;
  image    : LargeBinary @Core.MediaType: 'image/png';
}

entity Authors : managed {
  key ID       : Integer;
  name         : String(111) @mandatory;
  dateOfBirth  : Date;
  dateOfDeath  : Date;
  placeOfBirth : String;
  placeOfDeath : String;
  books        : Association to many Books on books.author = $self;
}

// define CAP Entity called Genres using aspect CodeList
// with only the following attributes
// ID as a key
// parent as association to itself
// children as association to many Genres
entity Genres : sap.common.CodeList {
  key ID      : Integer;
  parent     : Association to Genres;
  children   : Association to many Genres on children.parent = $self;
}

