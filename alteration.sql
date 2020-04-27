use sampledb

ALTER TABLE customer
	ADD has_computer varchar(20) NOT NULL,
    ADD has_internet varchar(20) NOT NULL,
    ADD has_webcam   varchar(20) NOT NULL,
    Add has_mic		 varchar(20) NOT NULL,
	CHANGE COLUMN number no_of_workshops
	varchar(200) NOT NULL,
    MODIFY  COLUMN lms_info varchar(200);