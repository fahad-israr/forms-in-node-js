use sampledb

-----------------------------------------------------------
-------------Latest Alteration for customers table-------


ALTER TABLE customer
	ADD category_certificate MEDIUMBLOB,
    ADD transaction_receipt MEDIUMBLOB NOT NULL,
    ADD amount_paid  varchar(100) NOT NULL;


-----------------------------------------------------------








-------Content below this are intended solely for history and have no relevent use currently------------------


--------Previous Alteration--------------------------------
----------No use Now-----------------------------------
ALTER TABLE customer
	ADD has_computer varchar(20) NOT NULL,
    ADD has_internet varchar(20) NOT NULL,
    ADD has_webcam   varchar(20) NOT NULL,
    Add has_mic		 varchar(20) NOT NULL,
	CHANGE COLUMN number no_of_workshops
	varchar(200) NOT NULL,
    MODIFY  COLUMN lms_info varchar(200);

-------------------------------------------------------------