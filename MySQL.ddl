#@(#) script.ddl

DROP TABLE IF EXISTS UserJobOffer;
DROP TABLE IF EXISTS Part;
DROP TABLE IF EXISTS JobOffer;
DROP TABLE IF EXISTS User;

CREATE TABLE User
(
	name varchar (255),
	email varchar (255),
	password varchar (255),
	type int,
	id_User integer,
	PRIMARY KEY(id_User)
);

CREATE TABLE JobOffer
(
	validDate date,
	name varchar (255),
	description varchar (255),
	salary int,
	creationDate date,
	companyName varchar (255),
	location varchar (255),
	workEnvironment int,
	experienceLevel int,
	partTime boolean,
	id_JobOffer integer,
	fk_Userid_User integer NOT NULL,
	PRIMARY KEY(id_JobOffer),
	CONSTRAINT Creates FOREIGN KEY(fk_Userid_User) REFERENCES User (id_User)
);

CREATE TABLE Part
(
	name varchar (255),
	description varchar (255),
	requiresFiles boolean,
	id_Part integer,
	fk_JobOfferid_JobOffer integer NOT NULL,
	PRIMARY KEY(id_Part),
	CONSTRAINT ConsistsOf FOREIGN KEY(fk_JobOfferid_JobOffer) REFERENCES JobOffer (id_JobOffer)
);

CREATE TABLE UserJobOffer
(
	status varchar (255),
	applicationDate date,
	currentPart int,
	id_UserJobOffer integer,
	fk_JobOfferid_JobOffer integer NOT NULL,
	fk_Userid_User integer NOT NULL,
	PRIMARY KEY(id_UserJobOffer),
	FOREIGN KEY(fk_JobOfferid_JobOffer) REFERENCES JobOffer (id_JobOffer),
	CONSTRAINT Applies FOREIGN KEY(fk_Userid_User) REFERENCES User (id_User)
);
