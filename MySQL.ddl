DROP TABLE IF EXISTS UserJobOffer;
DROP TABLE IF EXISTS Part;
DROP TABLE IF EXISTS JobOffer;
DROP TABLE IF EXISTS [User];

CREATE TABLE [User]
(
	name varchar (255),
	email varchar (255),
	password varchar (255),
	type int,
	id_User int IDENTITY(1,1),
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
	partTime bit,
	id_JobOffer int IDENTITY(1,1),
	fk_Userid_User int NOT NULL,
	PRIMARY KEY(id_JobOffer),
	CONSTRAINT Creates FOREIGN KEY(fk_Userid_User) REFERENCES [User] (id_User)
);

CREATE TABLE Part
(
	name varchar (255),
	description varchar (255),
	requiresFiles bit,
	id_Part int IDENTITY(1,1),
	fk_JobOfferid_JobOffer int NOT NULL,
	PRIMARY KEY(id_Part),
	CONSTRAINT ConsistsOf FOREIGN KEY(fk_JobOfferid_JobOffer) REFERENCES JobOffer (id_JobOffer)
);

CREATE TABLE UserJobOffer
(
	status varchar (255),
	applicationDate date,
	currentPart int,
	id_UserJobOffer int IDENTITY(1,1),
	fk_JobOfferid_JobOffer int NOT NULL,
	fk_Userid_User int NOT NULL,
	PRIMARY KEY(id_UserJobOffer),
	FOREIGN KEY(fk_JobOfferid_JobOffer) REFERENCES JobOffer (id_JobOffer),
	CONSTRAINT Applies FOREIGN KEY(fk_Userid_User) REFERENCES [User] (id_User)
);

/// Example job offers //// 
INSERT INTO [User] (name, email, password, type)
VALUES 
    ('John Doe', 'john.doe@example.com', 'password123', 1),
    ('Jane Smith', 'jane.smith@example.com', 'password456', 1),
    ('Recruiter Mike', 'mike.recruiter@example.com', 'password789', 1),
    ('Sarah Connor', 'sarah.connor@example.com', 'password101', 1),
    ('Tom Hanks', 'tom.hanks@example.com', 'password202', 1),
    ('Linda Carter', 'linda.carter@example.com', 'password303', 1),
    ('Clark Kent', 'clark.kent@example.com', 'password404', 1);


INSERT INTO JobOffer (validDate, name, description, salary, creationDate, companyName, location, workEnvironment, experienceLevel, partTime, fk_Userid_User)
VALUES 
    ('2024-12-31', 'Software Developer', 'Looking for a full-stack software developer to join our team.', 70000, '2024-09-30', 'TechCorp', 'New York', 1, 2, 0, 1),
    ('2024-12-15', 'Marketing Manager', 'Seeking a dynamic marketing manager for an international campaign.', 60000, '2024-09-28', 'MarketMinds', 'Chicago', 2, 3, 0, 2),
    ('2024-11-30', 'Data Analyst', 'We need a data analyst to support our data science team.', 55000, '2024-09-27', 'DataGen', 'San Francisco', 3, 2, 1, 3),
	('2024-12-20', 'Frontend Developer', 'Looking for a frontend developer with React experience.', 68000, '2024-10-01', 'WebWorks', 'Los Angeles', 1, 2, 0, 1),
    ('2024-11-25', 'UI/UX Designer', 'Seeking a creative UI/UX designer to improve user experiences.', 50000, '2024-09-29', 'DesignStudio', 'Seattle', 2, 1, 0, 1),
    ('2024-12-10', 'Project Manager', 'Need an experienced project manager for software development projects.', 75000, '2024-09-25', 'TechCorp', 'New York', 3, 3, 0, 1);

INSERT INTO Part (name, description, requiresFiles, fk_JobOfferid_JobOffer)
VALUES 
    ('Upload CV', 'Upload your latest resume.', 1, 1),
    ('Technical Task', 'Complete a coding challenge.', 1, 1),
    ('Phone Interview', 'Participate in a phone interview with the technical team.', 0, 1),
    ('Final Interview', 'Attend an on-site or video interview.', 0, 1);

INSERT INTO Part (name, description, requiresFiles, fk_JobOfferid_JobOffer)
VALUES 
    ('Upload Portfolio', 'Submit your marketing portfolio.', 1, 2),
    ('Creative Task', 'Complete a marketing case study.', 1, 2),
    ('Phone Interview', 'Phone interview with the hiring manager.', 0, 2),
    ('Panel Interview', 'Attend a panel interview.', 0, 2);

INSERT INTO Part (name, description, requiresFiles, fk_JobOfferid_JobOffer)
VALUES 
    ('Upload CV', 'Upload your resume.', 1, 3),
    ('Data Analysis Task', 'Complete a data analysis task using provided data.', 1, 3),
    ('Phone Interview', 'Phone interview with the data science team.', 0, 3),
    ('Final Interview', 'On-site interview with the senior management.', 0, 3);
	
INSERT INTO UserJobOffer (status, applicationDate, currentPart, fk_JobOfferid_JobOffer, fk_Userid_User)
VALUES 
    -- Jane Smith applies to multiple jobs
    ('Submitted', '2024-10-10', 1, 1, 2),  -- Jane Smith applies to Software Developer (JobOffer ID 1)
    ('Denied', '2024-09-30', 4, 1002, 2),     -- Jane Smith denied for Frontend Developer (JobOffer ID 4)
    
    -- Recruiter Mike's applications
    ('In Progress', '2024-10-05', 2, 2, 3),  -- Recruiter Mike applies to Marketing Manager (JobOffer ID 2)
    ('Accepted', '2024-10-01', 1, 3, 3),     -- Recruiter Mike accepted for Data Analyst (JobOffer ID 3)

    -- Sarah Connor's applications
    ('In Progress', '2024-10-15', 2, 1003, 1002),  -- Sarah Connor applies to UI/UX Designer (JobOffer ID 5)
    ('Submitted', '2024-10-12', 1, 1004, 1002),    -- Sarah Connor applies to Project Manager (JobOffer ID 6)

    -- Tom Hanks' applications
    ('Denied', '2024-10-10', 3, 3, 1003),       -- Tom Hanks denied for Data Analyst (JobOffer ID 3)
    ('In Progress', '2024-10-08', 2, 2, 1003),  -- Tom Hanks applies to Marketing Manager (JobOffer ID 2)

    -- Linda Carter's applications
    ('Submitted', '2024-10-13', 1, 1, 1004),    -- Linda Carter applies to Software Developer (JobOffer ID 1)
    ('Submitted', '2024-10-11', 1, 1003, 1004),    -- Linda Carter applies to UI/UX Designer (JobOffer ID 5)

    -- Clark Kent's applications
    ('Accepted', '2024-10-09', 1, 1004, 1005),     -- Clark Kent accepted for Project Manager (JobOffer ID 6)
    ('Submitted', '2024-10-07', 1, 1002, 1005);    -- Clark Kent applies to Frontend Developer (JobOffer ID 4)