SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE TABLE IF NOT EXISTS `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ws_name` varchar(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  `gender` varchar(200) NOT NULL,
  `address` text NOT NULL,
  `email` varchar(200) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `alt_phone` varchar(20) NOT NULL,
  `designation` varchar(200) NOT NULL,
  `qualification` varchar(200) NOT NULL,
  `department` varchar(200) NOT NULL,
  `institute` varchar(200) NOT NULL,
  `typeofinst` varchar(200) NOT NULL,
  `subjects` varchar(200) NOT NULL,
  `no_of_workshops` varchar(200) NOT NULL,
  `teach` varchar(200) NOT NULL,
  `research` varchar(200) NOT NULL,
  `industry` varchar(200) NOT NULL,
  `category` varchar(200) NOT NULL,
  `lms` varchar(200) NOT NULL,
  `lms_info` varchar(200) NOT NULL,
  `exposure` varchar(200) NOT NULL,
  `willing` varchar(200) NOT NULL,
  `has_computer` varchar(20) NOT NULL,
  `has_internet` varchar(20) NOT NULL,
  `has_webcam`   varchar(20) NOT NULL,
  `has_mic`		 varchar(20) NOT NULL,
  `category_certificate` varchar(200) ,
  `transaction_reference_number` varchar(200) ,
  `transaction_date` varchar(200),
  `transaction_mode` varchar(200),
  `amount_paid`  varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;



CREATE TABLE IF NOT EXISTS `workshop` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `institute` varchar(200) NOT NULL,
  `address` varchar(200) NOT NULL,
  `ws_name` varchar(200) NOT NULL,
  `start_date_a` varchar(200) NOT NULL,
  `end_date_a` varchar(200) NOT NULL,
  `start_date_b` varchar(200) NOT NULL,
  `end_date_b` varchar(200) NOT NULL,
  `start_date_c` varchar(200) NOT NULL,
  `end_date_c` varchar(200) NOT NULL,
  `accept_guidelines` varchar(200) NOT NULL,
  `coordinator` varchar(200) NOT NULL,
  `designation` varchar(200) NOT NULL,
  `department` varchar(200) NOT NULL,
  `mobile` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `attended_before` varchar(100) NOT NULL,
  `attended_ws_name` varchar(200),
  `atteded_start_date` text NOT NULL,
  `attended_end_date` varchar(200) NOT NULL,
  `attended_submit_assignment` varchar(20) NOT NULL,
  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

