-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 25, 2016 at 06:54 PM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `development`
--

-- --------------------------------------------------------

--
-- Table structure for table `action_to_action`
--

CREATE TABLE `action_to_action` (
  `val1` bigint(20) NOT NULL,
  `val2` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `action_to_action`
--

INSERT INTO `action_to_action` (`val1`, `val2`) VALUES
(10, 9),
(11, 10),
(11, 7),
(2, 1),
(2, 8),
(12, 11),
(14, 13),
(16, 15);

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `client_id` bigint(20) NOT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `mobile` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `number` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `personal_number` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `surname` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `filial_id` bigint(20) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`client_id`, `is_active`, `mobile`, `name`, `number`, `personal_number`, `surname`, `filial_id`, `create_date`) VALUES
(1, b'1', '577344094', 'კახა', NULL, '01005022890', 'გელაშვილი', 2, '2016-11-19 00:45:51'),
(2, b'1', '577313441', 'დავით', NULL, '010041441211', 'უმანკოშვილი', 2, '2016-11-19 12:32:21'),
(3, b'1', 'ასდ', 'დასდ', NULL, '01005022890', 'ასდ', 2, '2016-11-23 19:35:58');

-- --------------------------------------------------------

--
-- Table structure for table `company_items`
--

CREATE TABLE `company_items` (
  `company_item_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `bar_code` varchar(255) COLLATE utf8_bin NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `company_item_movements`
--

CREATE TABLE `company_item_movements` (
  `company_item_movement_id` bigint(20) NOT NULL,
  `date` datetime DEFAULT NULL,
  `movement_string` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `movement_type` int(11) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `company_item_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `elements`
--

CREATE TABLE `elements` (
  `element_id` bigint(20) NOT NULL,
  `barcode` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `active` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `elements`
--

INSERT INTO `elements` (`element_id`, `barcode`, `name`, `active`) VALUES
(1, '0102', 'აგური', b'1'),
(2, '0101', 'ცემენტი', b'1'),
(3, '0103', 'ქვიშა', b'1'),
(4, '0104', 'არმატურა', b'1'),
(5, '0105', 'წებო', b'1'),
(6, '0106', 'გაჯი', b'1'),
(7, '0107', 'ლინოკრომი', b'1');

-- --------------------------------------------------------

--
-- Table structure for table `filials`
--

CREATE TABLE `filials` (
  `filial_id` bigint(20) NOT NULL,
  `address` varchar(255) COLLATE utf8_bin NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `filials`
--

INSERT INTO `filials` (`filial_id`, `address`, `name`) VALUES
(1, 'ზაზიაშვილის 24', 'მთავარი ფილიალი'),
(2, 'აღმაშენებლის 24', 'ლომბარდი N1');

-- --------------------------------------------------------

--
-- Table structure for table `laptops`
--

CREATE TABLE `laptops` (
  `mobile_phone_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `laptop_brands`
--

CREATE TABLE `laptop_brands` (
  `laptop_brand_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `laptop_models`
--

CREATE TABLE `laptop_models` (
  `laptop_model_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `loans`
--

CREATE TABLE `loans` (
  `loan_id` bigint(20) NOT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `loan_sum` float DEFAULT NULL,
  `number` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `client_id` bigint(20) DEFAULT NULL,
  `filial_id` bigint(20) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `last_modify_date` datetime DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `loan_condition_id` bigint(20) DEFAULT NULL,
  `next_interest_calculation_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `loans`
--

INSERT INTO `loans` (`loan_id`, `is_active`, `loan_sum`, `number`, `client_id`, `filial_id`, `create_date`, `last_modify_date`, `user_id`, `loan_condition_id`, `next_interest_calculation_date`) VALUES
(1, b'1', 400, '1923411', 1, 2, '2016-11-19 07:11:07', '2016-11-19 07:11:07', 4, 1, NULL),
(2, b'1', 1, '234432', 2, 2, '2016-11-23 00:50:20', '2016-11-23 00:50:20', 4, 1, NULL),
(3, b'1', 790, '234432', 2, 2, '2016-11-23 00:53:21', '2016-11-23 00:53:21', 4, 1, NULL),
(4, b'1', 790, '234432', 2, 2, '2016-11-23 00:54:34', '2016-11-23 00:54:34', 4, 1, NULL),
(5, b'1', 420, '234432', 2, 2, '2016-11-23 01:00:29', '2016-11-23 01:00:29', 4, 1, NULL),
(6, b'1', 1200, '234432', 1, 2, '2016-11-23 01:57:00', '2016-11-23 01:57:00', 4, 1, NULL),
(8, b'1', 500, '234432', 1, 2, '2016-11-23 21:47:50', '2016-11-23 21:47:50', 4, 1, NULL),
(9, b'1', 123, '234432', 1, 2, '2016-11-23 23:44:50', '2016-11-23 23:44:50', 4, 1, NULL),
(10, b'1', 400, '234432', 2, 2, '2016-11-24 02:13:32', '2016-11-24 02:13:32', 4, 1, '2016-11-24 02:13:32'),
(11, b'1', 900, '234432', 2, 2, '2016-11-24 02:16:37', '2016-11-24 02:16:37', 4, 1, '2016-11-24 02:16:37'),
(12, b'1', 650, '234432', 1, 2, '2016-11-24 09:42:43', '2016-11-24 09:42:43', 4, 1, '2016-11-24 09:42:43'),
(13, b'1', 470, '234432', 1, 2, '2016-11-24 21:16:47', '2016-11-24 21:16:47', 4, 1, '2016-11-24 21:16:47'),
(14, b'1', 1200, '234432', 1, 2, '2016-11-25 00:55:03', '2016-11-25 00:55:03', 4, 1, '2016-11-25 00:55:03'),
(15, b'1', 1450, '234432', 1, 2, '2016-11-25 17:48:29', '2016-11-25 17:48:29', 4, 1, '2016-12-05 17:59:13');

-- --------------------------------------------------------

--
-- Table structure for table `loan_conditions`
--

CREATE TABLE `loan_conditions` (
  `loan_conditionl_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `percent` float DEFAULT NULL,
  `period` int(11) DEFAULT NULL,
  `period_type` int(11) DEFAULT NULL,
  `filial_id` bigint(20) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `loan_conditions`
--

INSERT INTO `loan_conditions` (`loan_conditionl_id`, `active`, `percent`, `period`, `period_type`, `filial_id`, `name`) VALUES
(1, b'1', 10, 10, 1, 2, 'ტექნიკა'),
(2, b'1', 2, 1, 3, 2, 'ოქრო');

-- --------------------------------------------------------

--
-- Table structure for table `loan_interests`
--

CREATE TABLE `loan_interests` (
  `loan_interest_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `due_date` datetime DEFAULT NULL,
  `payed` bit(1) DEFAULT NULL,
  `percent` float DEFAULT NULL,
  `sum` float DEFAULT NULL,
  `loan_id` bigint(20) DEFAULT NULL,
  `payed_sum` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `loan_interests`
--

INSERT INTO `loan_interests` (`loan_interest_id`, `active`, `create_date`, `due_date`, `payed`, `percent`, `sum`, `loan_id`, `payed_sum`) VALUES
(1, b'1', '2016-11-24 02:13:32', '2016-11-24 02:13:32', b'0', 10, 40, 10, 0),
(2, b'1', '2016-11-24 02:16:37', '2016-12-04 02:16:37', b'0', 10, 90, 11, 0),
(3, b'1', '2016-11-24 09:42:44', '2016-12-04 09:42:43', b'0', 10, 65, 12, 0),
(6, b'1', '2016-11-25 00:55:03', '2016-12-05 00:55:03', b'1', 10, 120, 14, 120),
(7, b'1', '2016-11-25 00:00:00', '2016-11-28 00:00:00', b'1', 10, 120, 14, 120),
(8, b'1', '2016-11-25 00:01:00', '2016-11-28 00:01:00', b'1', 10, 120, 14, 120),
(9, b'1', '2016-11-25 16:34:03', '2016-11-25 16:34:03', b'1', 10, 106, 14, 106),
(10, b'1', '2016-11-25 16:36:03', '2016-11-25 16:36:03', b'1', 10, 106, 14, 106),
(11, b'1', '2016-11-25 16:36:42', '2016-11-25 16:36:42', b'1', 10, 106, 14, 106),
(12, b'1', '2016-11-25 16:37:31', '2016-11-25 16:37:31', b'1', 10, 106, 14, 106),
(13, b'1', '2016-11-25 16:38:56', '2016-11-25 16:38:56', b'0', 10, 106, 14, 95),
(14, b'1', '2016-11-25 17:48:30', '2016-12-05 17:48:29', b'0', 10, 145, 15, 0),
(15, b'1', '2016-11-25 17:59:13', '2016-11-25 17:59:13', b'0', 10, 145, 15, 0);

-- --------------------------------------------------------

--
-- Table structure for table `loan_movements`
--

CREATE TABLE `loan_movements` (
  `loan_movement_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `text` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `loan_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `loan_movements`
--

INSERT INTO `loan_movements` (`loan_movement_id`, `active`, `create_date`, `text`, `type`, `loan_id`) VALUES
(1, b'1', '2016-11-23 08:17:11', 'დარეგისტრირდა', 1, 6),
(2, b'1', '2016-11-23 21:00:06', 'სესხის ნაწილობრივი დაფარვა', 2, 6),
(3, b'1', '2016-11-23 21:15:07', 'სესხის ნაწილობრივი დაფარვა', 2, 6),
(4, b'1', '2016-11-23 21:16:35', 'სესხის ნაწილობრივი დაფარვა', 2, 1),
(5, b'1', '2016-11-23 21:31:32', 'სესხის ნაწილობრივი დაფარვა', 2, 6),
(6, b'1', '2016-11-23 21:47:50', 'სესხი დარეგისტრირდა', 1, 8),
(7, b'1', '2016-11-23 21:49:35', 'სესხის ნაწილობრივი დაფარვა', 2, 8),
(8, b'1', '2016-11-23 23:44:50', 'სესხი დარეგისტრირდა', 1, 9),
(9, b'1', '2016-11-24 02:13:32', 'სესხი დარეგისტრირდა', 1, 10),
(10, b'1', '2016-11-24 02:13:32', 'დაეკისრა პროცენტი 40.0ლარი', 5, 10),
(11, b'1', '2016-11-24 02:16:37', 'სესხი დარეგისტრირდა', 1, 11),
(12, b'1', '2016-11-24 02:16:37', 'დაეკისრა პროცენტი 90.0ლარი', 5, 11),
(13, b'1', '2016-11-24 09:42:43', 'სესხი დარეგისტრირდა', 1, 12),
(14, b'1', '2016-11-24 09:42:44', 'დაეკისრა პროცენტი 65.0ლარი', 5, 12),
(15, b'1', '2016-11-24 09:45:28', 'სესხის ნაწილობრივი დაფარვა', 2, 12),
(16, b'1', '2016-11-24 21:16:47', 'სესხი დარეგისტრირდა', 1, 13),
(17, b'1', '2016-11-24 21:16:47', 'დაეკისრა პროცენტი 47.0ლარი', 5, 13),
(18, b'1', '2016-11-24 22:20:11', 'სესხის ნაწილობრივი დაფარვა', 2, 13),
(19, b'1', '2016-11-24 22:22:41', 'სესხის ნაწილობრივი დაფარვა', 2, 13),
(20, b'1', '2016-11-24 23:46:14', 'სესხის ნაწილობრივი დაფარვა', 2, 13),
(21, b'1', '2016-11-25 00:46:15', 'პროცენტის გადახდა', 4, 13),
(22, b'1', '2016-11-25 00:50:02', 'პროცენტის გადახდა', 4, 13),
(23, b'1', '2016-11-25 00:55:03', 'სესხი დარეგისტრირდა', 1, 14),
(24, b'1', '2016-11-25 00:55:03', 'დაეკისრა პროცენტი 120.0ლარი', 5, 14),
(25, b'1', '2016-11-25 00:55:25', 'პროცენტის გადახდა', 4, 14),
(26, b'1', '2016-11-25 00:58:41', 'პროცენტის გადახდა', 4, 14),
(27, b'1', '2016-11-25 01:03:16', 'პროცენტის გადახდა', 4, 14),
(28, b'1', '2016-11-25 01:04:22', 'პროცენტის გადახდა', 4, 14),
(29, b'1', '2016-11-25 01:08:01', 'პროცენტის გადახდა', 4, 14),
(30, b'1', '2016-11-25 01:15:11', 'პროცენტის გადახდა', 4, 14),
(31, b'1', '2016-11-25 01:19:19', 'სესხის ნაწილობრივი დაფარვა', 2, 14),
(32, b'1', '2016-11-25 14:30:42', 'პროცენტის გადახდა', 4, 14),
(33, b'1', '2016-11-25 14:36:17', 'პროცენტის გადახდა', 4, 14),
(34, b'1', '2016-11-25 14:47:54', 'პროცენტის გადახდა', 4, 14),
(35, b'1', '2016-11-25 14:50:28', 'პროცენტის გადახდა', 4, 14),
(36, b'1', '2016-11-25 15:53:50', 'პროცენტის გადახდა', 4, 14),
(37, b'1', '2016-11-25 16:06:24', 'პროცენტის გადახდა', 4, 14),
(38, b'1', '2016-11-25 16:23:09', 'სესხის ნაწილობრივი დაფარვა', 2, 14),
(39, b'1', '2016-11-25 16:36:20', 'პროცენტის გადახდა', 4, 14),
(40, b'1', '2016-11-25 16:36:54', 'პროცენტის გადახდა', 4, 14),
(41, b'1', '2016-11-25 16:37:18', 'პროცენტის გადახდა', 4, 14),
(42, b'1', '2016-11-25 17:48:29', 'სესხი დარეგისტრირდა', 1, 15),
(43, b'1', '2016-11-25 17:48:30', 'დაეკისრა პროცენტი 145.0ლარი', 5, 15);

-- --------------------------------------------------------

--
-- Table structure for table `loan_payment`
--

CREATE TABLE `loan_payment` (
  `loan_payment_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `number` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `sum` float DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `loan_id` bigint(20) DEFAULT NULL,
  `used_fully` bit(1) DEFAULT NULL,
  `used_sum` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `loan_payment`
--

INSERT INTO `loan_payment` (`loan_payment_id`, `active`, `create_date`, `number`, `sum`, `type`, `loan_id`, `used_fully`, `used_sum`) VALUES
(14, b'1', '2016-11-25 01:03:16', '123', 100, 3, 14, b'1', 100),
(16, b'1', '2016-11-25 01:08:01', '123', 20, 3, 14, b'1', 20),
(22, b'1', '2016-11-25 14:50:28', '123', 130, 3, 14, b'1', 130),
(23, b'1', '2016-11-25 15:53:50', '123', 25, 3, 14, b'1', 25),
(24, b'1', '2016-11-25 16:06:23', '123', 35, 3, 14, b'1', 35),
(25, b'1', '2016-11-25 16:23:09', '123', 140, 1, 14, b'1', 140),
(26, b'1', '2016-11-25 16:36:20', '123', 10, 3, 14, b'1', 10),
(27, b'1', '2016-11-25 16:36:54', '123', 19, 3, 14, b'1', 19),
(28, b'1', '2016-11-25 16:37:18', '123', 400, 3, 14, b'1', 400);

-- --------------------------------------------------------

--
-- Table structure for table `mobile_brands`
--

CREATE TABLE `mobile_brands` (
  `mobile_brand_id` bigint(20) NOT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `mobile_brands`
--

INSERT INTO `mobile_brands` (`mobile_brand_id`, `is_active`, `name`) VALUES
(1, b'1', 'Apple'),
(2, b'1', 'Samsung'),
(3, b'1', 'HTC'),
(4, b'1', 'Nokia');

-- --------------------------------------------------------

--
-- Table structure for table `mobile_models`
--

CREATE TABLE `mobile_models` (
  `mobile_model_id` bigint(20) NOT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `mobile_brand_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `mobile_models`
--

INSERT INTO `mobile_models` (`mobile_model_id`, `is_active`, `name`, `mobile_brand_id`) VALUES
(1, b'1', 'Iphone 6S', 1);

-- --------------------------------------------------------

--
-- Table structure for table `mobile_phones`
--

CREATE TABLE `mobile_phones` (
  `mobile_phone_id` bigint(20) NOT NULL,
  `imei` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `model_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `number` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `loan_id` bigint(20) DEFAULT NULL,
  `mobile_brand_id` bigint(20) DEFAULT NULL,
  `sum` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `mobile_phones`
--

INSERT INTO `mobile_phones` (`mobile_phone_id`, `imei`, `comment`, `is_active`, `model_name`, `number`, `loan_id`, `mobile_brand_id`, `sum`) VALUES
(1, '1', '1', b'1', '1', '1234321', NULL, 1, 1),
(2, '145123123123', 'komentari', b'1', 'iphone 6s', '1234321', NULL, 1, 450),
(3, '124123412', 'koment galaxy', b'1', 'galaxy s6', '1234321', NULL, 2, 340),
(4, '145123123123', 'komentari', b'1', 'iphone 6s', '1234321', NULL, 1, 450),
(5, '124123412', 'koment galaxy', b'1', 'galaxy s6', '1234321', NULL, 2, 340),
(6, '51125123412', 'კომენტარი', b'1', 'm9', '1234321', 5, 3, 420),
(7, '14512212', 'კომენტარი აქ წავა ვითომრ რაააა!!! :))', b'1', 'iphone 7 32GB', '1234321', 6, 1, 1200),
(9, '151251455112', 'komentari aris es anu aq iwereba texti', b'1', 'iphone 6s 64GB', '1234321', 8, 1, 500),
(10, '123', '123', b'1', '14', '1234321', 9, 1, 123),
(11, '14512123', 'komentari 23111', b'1', 'iphone 6s', '1234321', 10, 1, 400),
(12, '14155131231412', 'gasdafas', b'1', 'iphone 7', '1234321', 11, 1, 900),
(13, '0151235123', 'komentari cava aq !!!!', b'1', 'iphone 6s', '1234321', 12, 1, 400),
(14, '151235123123', 'es komentari galaxy s6 is', b'1', 'galaxy s6', '1234321', 12, 2, 250),
(15, '14123412', 'kaxa coment', b'1', 'iphone 6s', '1234321', 13, 1, 470),
(16, '123456789', 'kaxa', b'1', 'iphone 6s', '1234321', 14, 1, 1200),
(17, '1241231412', 'komentari', b'1', 'iphone 7', '1234321', 15, 1, 1450);

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `project_id` bigint(20) NOT NULL,
  `address` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `last_modify_date` datetime DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `sakadastro` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `x_coordinate` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `y_coordinate` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`project_id`, `address`, `create_date`, `end_date`, `last_modify_date`, `name`, `sakadastro`, `start_date`, `x_coordinate`, `y_coordinate`, `user_id`, `status`) VALUES
(1, 'ზაზიაშვილის 24', '2016-08-29 18:58:18', NULL, '2016-11-21 01:19:07', 'პროექტი ნომერი 1', '1414.1212.4411.1', NULL, '42', '42', 1, 5),
(2, 'მისამართი', '2016-08-31 21:25:14', NULL, '2016-08-31 21:25:14', 'პროექტი 2', '123.124123.441', NULL, '21', '12', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `project_movements`
--

CREATE TABLE `project_movements` (
  `project_movement_id` bigint(20) NOT NULL,
  `date` datetime DEFAULT NULL,
  `movement_string` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `movement_type` int(11) DEFAULT NULL,
  `project_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `project_movements`
--

INSERT INTO `project_movements` (`project_movement_id`, `date`, `movement_string`, `movement_type`, `project_id`, `user_id`) VALUES
(1, '2016-08-31 07:17:14', 'დარეგისტრირდა', 1, 1, 1),
(2, '2016-08-31 21:25:14', 'დარეგისტრირდა', 1, 2, 1),
(3, '2016-09-07 15:37:07', 'დაიწყო პრეოქტი', 5, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `project_stages`
--

CREATE TABLE `project_stages` (
  `project_stage_id` bigint(20) NOT NULL,
  `create_date` datetime DEFAULT NULL,
  `last_modify_date` datetime DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `project_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `should_end_date` datetime DEFAULT NULL,
  `should_start_date` datetime DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `current_status` int(11) DEFAULT NULL,
  `project_stage_type_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `project_stages`
--

INSERT INTO `project_stages` (`project_stage_id`, `create_date`, `last_modify_date`, `name`, `project_id`, `user_id`, `end_date`, `should_end_date`, `should_start_date`, `start_date`, `current_status`, `project_stage_type_id`) VALUES
(6, '2016-08-31 21:45:31', '2016-08-31 21:45:31', 'etap 1', 2, 1, NULL, '2018-01-01 00:00:00', '2017-01-01 00:00:00', NULL, 1, 1),
(7, '2016-09-01 09:20:20', '2016-09-08 22:08:56', 'ეტაპი 1', 1, 1, NULL, '2016-12-09 00:00:00', '2016-10-09 00:00:00', NULL, 3, 1),
(8, '2016-09-03 17:48:31', '2016-11-16 16:20:23', 'პირველი სართულის კარკასი', 1, 1, NULL, '2016-09-25 00:00:00', '2016-02-09 00:00:00', NULL, 3, 2),
(9, '2016-09-07 15:47:01', '2016-09-07 15:52:59', 'ეტაპი 3', 1, 1, NULL, '2016-09-07 00:00:00', '2016-09-07 00:00:00', NULL, 3, 1),
(10, '2016-09-07 15:52:22', '2016-09-07 15:52:22', 'ეტაპი 4', 1, 1, NULL, '2016-09-07 00:00:00', '2016-09-07 00:00:00', NULL, 1, 2),
(11, '2016-09-08 17:45:23', '2016-09-08 17:45:23', 'ეტაპი 5', 1, 1, NULL, '2016-09-30 00:00:00', '2016-09-16 00:00:00', NULL, 1, 3),
(12, '2016-09-09 19:01:47', '2016-11-21 01:19:07', 'გადახურვა', 1, 1, NULL, '2016-09-08 00:00:00', '2016-09-08 00:00:00', NULL, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `project_stage_actions`
--

CREATE TABLE `project_stage_actions` (
  `project_stage_actiont_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `project_stage_id` bigint(20) DEFAULT NULL,
  `last_modify_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `project_stage_actions`
--

INSERT INTO `project_stage_actions` (`project_stage_actiont_id`, `active`, `create_date`, `end_date`, `name`, `start_date`, `status`, `project_stage_id`, `last_modify_date`) VALUES
(1, b'1', '2016-09-02 00:00:00', NULL, 'action1', NULL, 6, 7, '2016-09-07 15:22:10'),
(2, b'1', '2016-09-03 13:06:20', NULL, 'მოქმედება 1', NULL, 6, 7, '2016-09-08 21:17:55'),
(3, b'1', '2016-09-03 13:33:46', NULL, 'საძირკვლის აშენება', NULL, 1, 6, '2016-09-07 14:58:58'),
(4, b'1', '2016-09-03 13:35:44', NULL, 'მოქმედება 2', NULL, 1, 7, '2016-09-08 10:18:25'),
(5, b'1', '2016-09-06 23:39:33', NULL, 'კარკასის მოქმედება 1', NULL, 6, 8, '2016-09-07 15:23:43'),
(6, b'1', '2016-09-07 15:36:49', NULL, 'კარკასის მოქმედება 2', NULL, 6, 8, '2016-09-07 15:37:07'),
(7, b'1', '2016-09-07 15:42:01', NULL, 'კარკასი მოქმედება 3', NULL, 6, 8, '2016-09-07 15:42:24'),
(8, b'1', '2016-09-07 15:52:42', NULL, 'moqmedeba 1 etapi 3', NULL, 6, 9, '2016-09-07 15:52:59'),
(9, b'1', '2016-09-08 10:21:47', NULL, 'მოქმედება 3', NULL, 1, 7, '2016-09-08 10:36:59'),
(10, b'1', '2016-09-08 15:54:18', NULL, 'მოქმედება 4', NULL, 6, 7, '2016-09-08 15:59:13'),
(11, b'1', '2016-09-08 19:58:40', NULL, 'მოქმედება 5', NULL, 6, 7, '2016-09-08 20:05:21'),
(12, b'1', '2016-09-08 22:02:19', NULL, 'მოქმედება 6', NULL, 6, 7, '2016-09-08 22:08:56'),
(13, b'1', '2016-09-09 19:03:11', NULL, 'ჰიდრო იზოლაცია', NULL, 6, 12, '2016-09-09 19:18:06'),
(14, b'1', '2016-09-09 19:03:35', NULL, 'მოპირკეთება მეტლახით', NULL, 1, 12, '2016-09-09 19:15:33'),
(15, b'1', '2016-11-16 16:19:48', NULL, 'test 412', NULL, 6, 8, '2016-11-16 16:20:09'),
(16, b'1', '2016-11-16 16:20:23', NULL, 'test 444', NULL, 1, 8, '2016-11-16 16:20:23'),
(17, b'1', '2016-11-21 01:19:07', NULL, '0', NULL, 1, 12, '2016-11-21 01:19:07');

-- --------------------------------------------------------

--
-- Table structure for table `project_stage_action_expenses`
--

CREATE TABLE `project_stage_action_expenses` (
  `project_stage_action_expense_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `last_modify_date` datetime DEFAULT NULL,
  `price` float DEFAULT NULL,
  `quantity` float DEFAULT NULL,
  `element_id` bigint(20) DEFAULT NULL,
  `project_id` bigint(20) DEFAULT NULL,
  `project_stage_id` bigint(20) DEFAULT NULL,
  `project_stage_action_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `project_stage_action_expenses`
--

INSERT INTO `project_stage_action_expenses` (`project_stage_action_expense_id`, `active`, `create_date`, `last_modify_date`, `price`, `quantity`, `element_id`, `project_id`, `project_stage_id`, `project_stage_action_id`) VALUES
(1, b'1', '2016-09-04 00:00:00', '2016-09-04 00:00:00', 0, 12, 1, 1, 7, 1),
(2, b'1', '2016-09-04 00:00:00', '2016-09-04 00:00:00', 0, 122, 1, 1, 7, 2),
(3, b'1', '2016-09-07 00:00:00', '2016-09-07 00:00:00', 0, 300, 2, 1, 8, 5),
(4, b'1', '2016-09-07 00:00:00', '2016-09-07 00:00:00', 0, 11, 1, 2, 6, 3),
(5, b'1', '2016-09-07 15:02:26', '2016-09-07 15:02:26', 0, 411, 2, 1, 7, 1),
(6, b'1', '2016-09-07 15:03:37', '2016-09-07 15:03:37', 0, 400, 4, 1, 7, 1),
(7, b'1', '2016-09-07 15:04:41', '2016-09-07 15:04:41', 0, 25, 3, 1, 7, 2),
(8, b'1', '2016-09-07 15:37:04', '2016-09-07 15:37:04', 0, 44, 1, 1, 8, 6),
(9, b'1', '2016-09-07 15:42:19', '2016-09-07 15:42:19', 0, 401, 4, 1, 8, 7),
(10, b'1', '2016-09-07 15:52:57', '2016-09-07 15:52:57', 0, 411, 1, 1, 9, 8),
(11, b'1', '2016-09-07 16:40:36', '2016-09-07 16:40:36', 0, 400, 1, 1, 7, 4),
(12, b'1', '2016-09-07 16:42:44', '2016-09-07 16:42:44', 0, 100, 2, 1, 7, 4),
(13, b'1', '2016-09-07 16:43:05', '2016-09-07 16:43:05', 0, 24, 4, 1, 7, 4),
(14, b'1', '2016-09-07 16:45:35', '2016-09-07 16:45:35', 0, 30, 3, 1, 7, 4),
(15, b'1', '2016-09-08 10:18:25', '2016-09-08 10:18:25', 0, 200, 6, 1, 7, 4),
(16, b'1', '2016-09-08 10:22:28', '2016-09-08 10:22:28', 0, 400, 3, 1, 7, 9),
(17, b'1', '2016-09-08 10:29:12', '2016-09-08 10:29:12', 0, 200, 1, 1, 7, 9),
(18, b'1', '2016-09-08 10:31:13', '2016-09-08 10:31:13', 0, 100, 3, 1, 7, 9),
(19, b'1', '2016-09-08 10:36:59', '2016-09-08 10:36:59', 0, 400, 2, 1, 7, 9),
(20, b'1', '2016-09-08 15:54:39', '2016-09-08 15:54:39', 0, 40, 4, 1, 7, 10),
(21, b'1', '2016-09-08 15:54:52', '2016-09-08 15:54:52', 0, 30, 3, 1, 7, 10),
(22, b'1', '2016-09-08 15:55:30', '2016-09-08 15:55:30', 0, 40, 5, 1, 7, 10),
(23, b'1', '2016-09-08 20:03:11', '2016-09-08 20:03:11', 0, 50, 1, 1, 7, 11),
(24, b'1', '2016-09-08 20:03:31', '2016-09-08 20:03:31', 0, 30, 2, 1, 7, 11),
(25, b'1', '2016-09-08 21:17:20', '2016-09-08 21:17:20', 0, 400, 4, 1, 7, 2),
(26, b'1', '2016-09-08 22:03:44', '2016-09-08 22:03:44', 0, 400, 1, 1, 7, 12),
(27, b'1', '2016-09-08 22:04:35', '2016-09-08 22:04:35', 0, 20, 2, 1, 7, 12),
(28, b'1', '2016-09-09 19:14:10', '2016-09-09 19:14:10', 0, 50, 7, 1, 12, 13),
(29, b'1', '2016-09-09 19:14:19', '2016-09-09 19:14:19', 0, 44, 1, 1, 12, 13),
(30, b'1', '2016-09-09 19:15:33', '2016-09-09 19:15:33', 0, 44, 1, 1, 12, 14),
(31, b'1', '2016-11-16 16:19:58', '2016-11-16 16:19:58', 0, 400, 3, 1, 8, 15);

-- --------------------------------------------------------

--
-- Table structure for table `project_stage_action_expense_movements`
--

CREATE TABLE `project_stage_action_expense_movements` (
  `project_stage_action_ex_movement_id` bigint(20) NOT NULL,
  `date` datetime DEFAULT NULL,
  `movement_string` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `movement_type` int(11) DEFAULT NULL,
  `project_stage_actiont_expense_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `project_stage_action_expense_movements`
--

INSERT INTO `project_stage_action_expense_movements` (`project_stage_action_ex_movement_id`, `date`, `movement_string`, `movement_type`, `project_stage_actiont_expense_id`, `user_id`) VALUES
(1, '2016-09-04 00:00:00', 'დარეგისტრირდა', 1, 1, 1),
(2, '2016-09-07 14:58:23', 'დარეგისტრირდა', 1, 3, 1),
(3, '2016-09-07 14:58:58', 'დარეგისტრირდა', 1, 4, 1),
(4, '2016-09-07 15:02:26', 'დარეგისტრირდა', 1, 5, 1),
(5, '2016-09-07 15:03:37', 'დარეგისტრირდა', 1, 6, 1),
(6, '2016-09-07 15:04:41', 'დარეგისტრირდა', 1, 7, 1),
(7, '2016-09-07 15:37:04', 'დარეგისტრირდა', 1, 8, 1),
(8, '2016-09-07 15:42:19', 'დარეგისტრირდა', 1, 9, 1),
(9, '2016-09-07 15:52:57', 'დარეგისტრირდა', 1, 10, 1),
(10, '2016-09-07 16:40:36', 'დარეგისტრირდა', 1, 11, 1),
(11, '2016-09-07 16:42:44', 'დარეგისტრირდა', 1, 12, 1),
(12, '2016-09-07 16:43:05', 'დარეგისტრირდა', 1, 13, 1),
(13, '2016-09-07 16:45:35', 'დარეგისტრირდა', 1, 14, 1),
(14, '2016-09-08 10:18:25', 'დარეგისტრირდა', 1, 15, 1),
(15, '2016-09-08 10:22:28', 'დარეგისტრირდა', 1, 16, 1),
(16, '2016-09-08 10:29:12', 'დარეგისტრირდა', 1, 17, 1),
(17, '2016-09-08 10:31:13', 'დარეგისტრირდა', 1, 18, 1),
(18, '2016-09-08 10:36:59', 'დარეგისტრირდა', 1, 19, 1),
(19, '2016-09-08 15:54:39', 'დარეგისტრირდა', 1, 20, 1),
(20, '2016-09-08 15:54:52', 'დარეგისტრირდა', 1, 21, 1),
(21, '2016-09-08 15:55:30', 'დარეგისტრირდა', 1, 22, 1),
(22, '2016-09-08 20:03:11', 'დარეგისტრირდა', 1, 23, 1),
(23, '2016-09-08 20:03:31', 'დარეგისტრირდა', 1, 24, 1),
(24, '2016-09-08 21:17:20', 'დარეგისტრირდა', 1, 25, 1),
(25, '2016-09-08 22:03:44', 'დარეგისტრირდა', 1, 26, 1),
(26, '2016-09-08 22:04:36', 'დარეგისტრირდა', 1, 27, 1),
(27, '2016-09-09 19:14:10', 'დარეგისტრირდა', 1, 28, 1),
(28, '2016-09-09 19:14:19', 'დარეგისტრირდა', 1, 29, 1),
(29, '2016-09-09 19:15:33', 'დარეგისტრირდა', 1, 30, 1),
(30, '2016-11-16 16:19:58', 'დარეგისტრირდა', 1, 31, 1);

-- --------------------------------------------------------

--
-- Table structure for table `project_stage_action_expense_requests`
--

CREATE TABLE `project_stage_action_expense_requests` (
  `project_stage_action_expense_request_id` bigint(20) NOT NULL,
  `accapted_by_shesyidvebi` bit(1) DEFAULT NULL,
  `active` bit(1) DEFAULT NULL,
  `chabarebis_date` datetime DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `finished_by_prarab` bit(1) DEFAULT NULL,
  `last_modify_date` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `project_stage_actiont_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `project_stage_action_expense_requests`
--

INSERT INTO `project_stage_action_expense_requests` (`project_stage_action_expense_request_id`, `accapted_by_shesyidvebi`, `active`, `chabarebis_date`, `create_date`, `finished_by_prarab`, `last_modify_date`, `status`, `project_stage_actiont_id`, `user_id`) VALUES
(1, b'0', b'1', '2016-09-08 00:00:00', '2016-09-06 00:00:00', b'0', '2016-09-06 00:00:00', 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `project_stage_action_expense_request_elements`
--

CREATE TABLE `project_stage_action_expense_request_elements` (
  `project_stage_action_expense_request_element_id` bigint(20) NOT NULL,
  `create_date` datetime DEFAULT NULL,
  `quant` float DEFAULT NULL,
  `element_id` bigint(20) DEFAULT NULL,
  `project_stage_action_expense_request_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `project_stage_action_expense_request_movements`
--

CREATE TABLE `project_stage_action_expense_request_movements` (
  `project_stage_action_ex_movement_id` bigint(20) NOT NULL,
  `date` datetime DEFAULT NULL,
  `movement_string` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `movement_type` int(11) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `project_stage_actiont_expense_request_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `project_stage_action_movements`
--

CREATE TABLE `project_stage_action_movements` (
  `project_stage_action_movement_id` bigint(20) NOT NULL,
  `date` datetime DEFAULT NULL,
  `movement_string` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `movement_type` int(11) DEFAULT NULL,
  `project_stage_actiont_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `project_stage_action_movements`
--

INSERT INTO `project_stage_action_movements` (`project_stage_action_movement_id`, `date`, `movement_string`, `movement_type`, `project_stage_actiont_id`, `user_id`) VALUES
(1, '2016-09-02 00:00:00', 'დარეგისტრირდა', 1, 1, 1),
(2, '2016-09-03 13:06:20', 'დარეგისტრირდა', 1, 2, 1),
(3, '2016-09-03 13:33:46', 'დარეგისტრირდა', 1, 3, 1),
(4, '2016-09-03 13:35:44', 'დარეგისტრირდა', 1, 4, 1),
(7, '2016-09-06 23:39:33', 'დარეგისტრირდა', 1, 5, 1),
(8, '2016-09-07 15:22:10', 'გადაიგზავნა პრარაბთან', 6, 1, 1),
(9, '2016-09-07 15:23:09', 'გადაიგზავნა პრარაბთან', 6, 5, 1),
(10, '2016-09-07 15:23:43', 'გადაიგზავნა პრარაბთან', 6, 5, 1),
(11, '2016-09-07 15:36:49', 'დარეგისტრირდა', 1, 6, 1),
(12, '2016-09-07 15:37:07', 'გადაიგზავნა პრარაბთან', 6, 6, 1),
(13, '2016-09-07 15:42:01', 'დარეგისტრირდა', 1, 7, 1),
(14, '2016-09-07 15:42:24', 'გადაიგზავნა პრარაბთან', 6, 7, 1),
(15, '2016-09-07 15:52:42', 'დარეგისტრირდა', 1, 8, 1),
(16, '2016-09-07 15:52:59', 'გადაიგზავნა პრარაბთან', 6, 8, 1),
(17, '2016-09-08 10:21:47', 'დარეგისტრირდა', 1, 9, 1),
(18, '2016-09-08 15:54:18', 'დარეგისტრირდა', 1, 10, 1),
(19, '2016-09-08 15:59:13', 'გადაიგზავნა პრარაბთან', 6, 10, 1),
(20, '2016-09-08 19:58:40', 'დარეგისტრირდა', 1, 11, 1),
(21, '2016-09-08 20:05:21', 'გადაიგზავნა პრარაბთან', 6, 11, 1),
(22, '2016-09-08 21:17:55', 'გადაიგზავნა პრარაბთან', 6, 2, 1),
(23, '2016-09-08 22:02:19', 'დარეგისტრირდა', 1, 12, 1),
(24, '2016-09-08 22:08:56', 'გადაიგზავნა პრარაბთან', 6, 12, 1),
(25, '2016-09-09 19:03:11', 'დარეგისტრირდა', 1, 13, 1),
(26, '2016-09-09 19:03:35', 'დარეგისტრირდა', 1, 14, 1),
(27, '2016-09-09 19:18:06', 'გადაიგზავნა პრარაბთან', 6, 13, 1),
(28, '2016-11-16 16:19:48', 'დარეგისტრირდა', 1, 15, 1),
(29, '2016-11-16 16:20:09', 'გადაიგზავნა პრარაბთან', 6, 15, 1),
(30, '2016-11-16 16:20:23', 'დარეგისტრირდა', 1, 16, 1),
(31, '2016-11-21 01:19:07', 'დარეგისტრირდა', 1, 17, 1);

-- --------------------------------------------------------

--
-- Table structure for table `project_stage_movements`
--

CREATE TABLE `project_stage_movements` (
  `project_stage_movement_id` bigint(20) NOT NULL,
  `date` datetime DEFAULT NULL,
  `movement_string` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `movement_type` int(11) DEFAULT NULL,
  `project_stage_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `project_stage_movements`
--

INSERT INTO `project_stage_movements` (`project_stage_movement_id`, `date`, `movement_string`, `movement_type`, `project_stage_id`, `user_id`) VALUES
(1, '2016-08-31 21:45:31', 'დარეგისტრირდა', 1, 6, 1),
(2, '2016-09-01 09:20:20', 'დარეგისტრირდა', 1, 7, 1),
(3, '2016-09-03 17:48:31', 'დარეგისტრირდა', 1, 8, 1),
(4, '2016-09-07 15:47:01', 'დარეგისტრირდა', 1, 9, 1),
(5, '2016-09-07 15:52:22', 'დარეგისტრირდა', 1, 10, 1),
(6, '2016-09-08 17:45:23', 'დარეგისტრირდა', 1, 11, 1),
(7, '2016-09-09 19:01:47', 'დარეგისტრირდა', 1, 12, 1);

-- --------------------------------------------------------

--
-- Table structure for table `project_stage_types`
--

CREATE TABLE `project_stage_types` (
  `project_stage_type_id` bigint(20) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `project_stage_types`
--

INSERT INTO `project_stage_types` (`project_stage_type_id`, `name`) VALUES
(1, 'ტიპი 1'),
(2, 'ტიპი 2'),
(3, 'ტიპი 3');

-- --------------------------------------------------------

--
-- Table structure for table `project_to_prarab`
--

CREATE TABLE `project_to_prarab` (
  `val1` bigint(20) NOT NULL,
  `val2` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `project_to_prarab`
--

INSERT INTO `project_to_prarab` (`val1`, `val2`) VALUES
(1, 2),
(1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` bigint(20) NOT NULL,
  `create_date` datetime DEFAULT NULL,
  `isactive` bit(1) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `create_date`, `isactive`, `user_id`) VALUES
(1, '2016-08-29 18:57:47', b'1', 1),
(2, '2016-08-29 18:57:47', b'1', 1),
(3, '2016-08-30 20:21:11', b'1', 1),
(4, '2016-08-30 20:21:11', b'0', 1),
(5, '2016-09-02 12:31:11', b'1', 1),
(6, '2016-09-02 12:31:11', b'1', 1),
(7, '2016-09-02 12:37:51', b'1', 1),
(8, '2016-09-02 12:37:51', b'1', 1),
(9, '2016-09-02 12:56:04', b'1', 1),
(10, '2016-09-02 12:56:04', b'0', 1),
(11, '2016-09-07 15:05:24', b'1', 1),
(12, '2016-09-07 15:05:24', b'0', 1),
(13, '2016-09-09 10:54:34', b'1', 2),
(14, '2016-09-09 10:54:34', b'0', 2),
(15, '2016-09-09 14:58:11', b'1', 1),
(16, '2016-09-09 14:58:11', b'0', 1),
(17, '2016-09-09 19:20:09', b'1', 2),
(18, '2016-09-09 19:20:09', b'0', 2),
(19, '2016-09-13 12:20:17', b'1', 1),
(20, '2016-09-13 12:20:17', b'0', 1),
(21, '2016-09-13 12:23:12', b'1', 2),
(22, '2016-09-13 12:23:12', b'0', 2),
(23, '2016-09-15 12:38:24', b'1', 1),
(24, '2016-09-15 12:38:24', b'0', 1),
(25, '2016-09-15 12:39:42', b'1', 2),
(26, '2016-09-15 12:39:42', b'0', 2),
(27, '2016-10-15 12:10:25', b'1', 2),
(28, '2016-10-15 12:10:25', b'0', 2),
(29, '2016-10-15 12:12:27', b'1', 1),
(30, '2016-10-15 12:12:27', b'0', 1),
(31, '2016-10-15 12:14:46', b'1', 2),
(32, '2016-10-15 12:14:46', b'0', 2),
(33, '2016-11-16 16:18:19', b'1', 1),
(34, '2016-11-16 16:18:19', b'0', 1),
(35, '2016-11-16 16:21:25', b'1', 1),
(36, '2016-11-16 16:21:25', b'0', 1),
(37, '2016-11-19 00:04:29', b'1', 4),
(38, '2016-11-19 00:04:29', b'1', 4),
(39, '2016-11-19 00:06:11', b'1', 4),
(40, '2016-11-19 00:06:11', b'0', 4),
(41, '2016-11-19 12:37:23', b'1', 4),
(42, '2016-11-19 12:37:23', b'1', 4),
(43, '2016-11-19 22:29:23', b'1', 4),
(44, '2016-11-19 22:29:23', b'1', 4),
(45, '2016-11-19 23:34:42', b'1', 1),
(46, '2016-11-19 23:34:42', b'0', 1),
(47, '2016-11-20 12:11:24', b'1', 4),
(48, '2016-11-20 12:11:24', b'0', 4),
(49, '2016-11-20 12:13:02', b'1', 4),
(50, '2016-11-20 12:13:02', b'0', 4),
(51, '2016-11-20 14:35:52', b'1', 1),
(52, '2016-11-20 14:35:52', b'1', 1),
(53, '2016-11-20 20:17:02', b'1', 4),
(54, '2016-11-20 20:17:02', b'1', 4),
(55, '2016-11-20 21:15:17', b'1', 1),
(56, '2016-11-20 21:15:17', b'1', 1),
(57, '2016-11-20 21:16:23', b'1', 4),
(58, '2016-11-20 21:16:23', b'0', 4),
(59, '2016-11-22 21:06:01', b'1', 4),
(60, '2016-11-22 21:06:01', b'1', 4),
(61, '2016-11-23 18:15:22', b'1', 4),
(62, '2016-11-23 18:15:22', b'1', 4);

-- --------------------------------------------------------

--
-- Table structure for table `store_houses`
--

CREATE TABLE `store_houses` (
  `store_house_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `address` varchar(255) COLLATE utf8_bin NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `type` int(11) DEFAULT NULL,
  `project_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `store_house_boxes`
--

CREATE TABLE `store_house_boxes` (
  `store_house_box_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `remove_date` datetime DEFAULT NULL,
  `company_item_id` bigint(20) DEFAULT NULL,
  `store_house_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` bigint(20) NOT NULL,
  `address` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_bin NOT NULL,
  `mobile` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `password` varchar(255) COLLATE utf8_bin NOT NULL,
  `personal_number` varchar(255) COLLATE utf8_bin NOT NULL,
  `surname` varchar(255) COLLATE utf8_bin NOT NULL,
  `type` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8_bin NOT NULL,
  `filial_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `address`, `email`, `mobile`, `name`, `password`, `personal_number`, `surname`, `type`, `username`, `filial_id`) VALUES
(1, '1', '1', '1', '1', '1', '1', '1', 1, 'sa', 1),
(2, 'p', 'p', 'p', 'ვახტანგ', '1', '1', 'გელაშვილი', 3, 'p', 1),
(3, '1', '1', '1', 'გიორგი', '1', '1', 'ჩხეიძე', 3, 'g', 1),
(4, 'ლომბარდ 1', '1', '1', 'ვახტანგ', '1', '01005022890', 'გელაშვილი', 21, 'lombard1', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `action_to_action`
--
ALTER TABLE `action_to_action`
  ADD KEY `FK_jddnchh79rdn7gwx3aoghi8h8` (`val2`),
  ADD KEY `FK_jpogqsaj8qr6uv3y2ajlxtrb` (`val1`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`client_id`),
  ADD KEY `FK_fytbnen4sba9mxl6umjgkf5g9` (`filial_id`);

--
-- Indexes for table `company_items`
--
ALTER TABLE `company_items`
  ADD PRIMARY KEY (`company_item_id`);

--
-- Indexes for table `company_item_movements`
--
ALTER TABLE `company_item_movements`
  ADD PRIMARY KEY (`company_item_movement_id`),
  ADD KEY `FK_pvd1kqvkpycm3o3icaj7oyboj` (`company_item_id`);

--
-- Indexes for table `elements`
--
ALTER TABLE `elements`
  ADD PRIMARY KEY (`element_id`);

--
-- Indexes for table `filials`
--
ALTER TABLE `filials`
  ADD PRIMARY KEY (`filial_id`);

--
-- Indexes for table `laptops`
--
ALTER TABLE `laptops`
  ADD PRIMARY KEY (`mobile_phone_id`);

--
-- Indexes for table `laptop_brands`
--
ALTER TABLE `laptop_brands`
  ADD PRIMARY KEY (`laptop_brand_id`);

--
-- Indexes for table `laptop_models`
--
ALTER TABLE `laptop_models`
  ADD PRIMARY KEY (`laptop_model_id`);

--
-- Indexes for table `loans`
--
ALTER TABLE `loans`
  ADD PRIMARY KEY (`loan_id`),
  ADD KEY `FK_fqxvp8ws7xjcufxu0amg4mga4` (`client_id`),
  ADD KEY `FK_mvh9jf52erwc9ijg6er7p3gib` (`filial_id`),
  ADD KEY `FK_l34jjpg81g9r2bd42svyp8epg` (`user_id`),
  ADD KEY `FK_h08pie5svljne9fhsg19m2cep` (`loan_condition_id`);

--
-- Indexes for table `loan_conditions`
--
ALTER TABLE `loan_conditions`
  ADD PRIMARY KEY (`loan_conditionl_id`),
  ADD KEY `FK_i413nj906i7038ahxmndoq7vy` (`filial_id`);

--
-- Indexes for table `loan_interests`
--
ALTER TABLE `loan_interests`
  ADD PRIMARY KEY (`loan_interest_id`),
  ADD KEY `FK_9kvuk71cryli8rmykfs6esc7j` (`loan_id`);

--
-- Indexes for table `loan_movements`
--
ALTER TABLE `loan_movements`
  ADD PRIMARY KEY (`loan_movement_id`),
  ADD KEY `FK_cdwvj7tam7rda0g5tuw31un4q` (`loan_id`);

--
-- Indexes for table `loan_payment`
--
ALTER TABLE `loan_payment`
  ADD PRIMARY KEY (`loan_payment_id`),
  ADD KEY `FK_7s3iglpunxkjhaxwv291m6kna` (`loan_id`);

--
-- Indexes for table `mobile_brands`
--
ALTER TABLE `mobile_brands`
  ADD PRIMARY KEY (`mobile_brand_id`);

--
-- Indexes for table `mobile_models`
--
ALTER TABLE `mobile_models`
  ADD PRIMARY KEY (`mobile_model_id`),
  ADD KEY `FK_lv3rj7piim6povkgybjh6txk8` (`mobile_brand_id`);

--
-- Indexes for table `mobile_phones`
--
ALTER TABLE `mobile_phones`
  ADD PRIMARY KEY (`mobile_phone_id`),
  ADD KEY `FK_d2rv6oj8019ckjk2onq7sgxna` (`loan_id`),
  ADD KEY `FK_dv1jv158f0od2ktcwnvvychkp` (`mobile_brand_id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`project_id`),
  ADD KEY `FK_afqu5s8xbwmgsv6jowtp083ku` (`user_id`);

--
-- Indexes for table `project_movements`
--
ALTER TABLE `project_movements`
  ADD PRIMARY KEY (`project_movement_id`),
  ADD KEY `FK_vndy30iuxcabnygqke7fnuo1` (`project_id`);

--
-- Indexes for table `project_stages`
--
ALTER TABLE `project_stages`
  ADD PRIMARY KEY (`project_stage_id`),
  ADD KEY `FK_3avbi76a7vb8jbgs5trquacyn` (`project_id`),
  ADD KEY `FK_4yn95wfp3ld6e234rbpl0aqk9` (`user_id`),
  ADD KEY `FK_qoq1b6kwgbu0vllphjxs804ib` (`project_stage_type_id`);

--
-- Indexes for table `project_stage_actions`
--
ALTER TABLE `project_stage_actions`
  ADD PRIMARY KEY (`project_stage_actiont_id`),
  ADD KEY `FK_1c26e0cfis55si3m4dm8gmoht` (`project_stage_id`);

--
-- Indexes for table `project_stage_action_expenses`
--
ALTER TABLE `project_stage_action_expenses`
  ADD PRIMARY KEY (`project_stage_action_expense_id`),
  ADD KEY `FK_7f3qvrseta1c9vhadx5evd2qn` (`element_id`),
  ADD KEY `FK_dn0fxwwhlcm6wwe4qwg7kiiqf` (`project_id`),
  ADD KEY `FK_p6n2jrq25gqtogkig3gdflxrh` (`project_stage_id`),
  ADD KEY `FK_sf8x8q94a0ket9pe967elh1nu` (`project_stage_action_id`);

--
-- Indexes for table `project_stage_action_expense_movements`
--
ALTER TABLE `project_stage_action_expense_movements`
  ADD PRIMARY KEY (`project_stage_action_ex_movement_id`),
  ADD KEY `FK_dqnc63oddq5m1a4irg6uy2wx6` (`project_stage_actiont_expense_id`);

--
-- Indexes for table `project_stage_action_expense_requests`
--
ALTER TABLE `project_stage_action_expense_requests`
  ADD PRIMARY KEY (`project_stage_action_expense_request_id`),
  ADD KEY `FK_9dm90lksubxlksciq3h16ncno` (`project_stage_actiont_id`),
  ADD KEY `FK_1w3am43ddm34knaun5mkjs1e3` (`user_id`);

--
-- Indexes for table `project_stage_action_expense_request_elements`
--
ALTER TABLE `project_stage_action_expense_request_elements`
  ADD PRIMARY KEY (`project_stage_action_expense_request_element_id`),
  ADD KEY `FK_mw0pkinwus287eor6aconn5e7` (`element_id`),
  ADD KEY `FK_dk6dq2ax0w4f5ggtmu4yaba26` (`project_stage_action_expense_request_id`);

--
-- Indexes for table `project_stage_action_expense_request_movements`
--
ALTER TABLE `project_stage_action_expense_request_movements`
  ADD PRIMARY KEY (`project_stage_action_ex_movement_id`),
  ADD KEY `FK_3na5xpmir9bgfekmuqxhsqrto` (`project_stage_actiont_expense_request_id`);

--
-- Indexes for table `project_stage_action_movements`
--
ALTER TABLE `project_stage_action_movements`
  ADD PRIMARY KEY (`project_stage_action_movement_id`),
  ADD KEY `FK_m656ww5s5r6wmcs6wy84xamsx` (`project_stage_actiont_id`);

--
-- Indexes for table `project_stage_movements`
--
ALTER TABLE `project_stage_movements`
  ADD PRIMARY KEY (`project_stage_movement_id`),
  ADD KEY `FK_t8eml5hy0yfc1idyifx3ym1no` (`project_stage_id`);

--
-- Indexes for table `project_stage_types`
--
ALTER TABLE `project_stage_types`
  ADD PRIMARY KEY (`project_stage_type_id`);

--
-- Indexes for table `project_to_prarab`
--
ALTER TABLE `project_to_prarab`
  ADD KEY `FK_pv5ciepxh0aaad8rjvdg5kdt4` (`val2`),
  ADD KEY `FK_9lwleh6j7p52gsuyjl18o185h` (`val1`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`),
  ADD KEY `FK_ll67hfsoxbb4aj85oexrpq39l` (`user_id`);

--
-- Indexes for table `store_houses`
--
ALTER TABLE `store_houses`
  ADD PRIMARY KEY (`store_house_id`),
  ADD KEY `FK_r149a5sdqjsk9e55756o49ryu` (`project_id`);

--
-- Indexes for table `store_house_boxes`
--
ALTER TABLE `store_house_boxes`
  ADD PRIMARY KEY (`store_house_box_id`),
  ADD KEY `FK_oc9hl9toh3ds1gwqq5d8343vg` (`company_item_id`),
  ADD KEY `FK_knw1tvhq8v635gcunis7u8jx0` (`store_house_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `FK_i5kjqdy6ue9wnt7mbn30cb7ar` (`filial_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `client_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `company_items`
--
ALTER TABLE `company_items`
  MODIFY `company_item_id` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `company_item_movements`
--
ALTER TABLE `company_item_movements`
  MODIFY `company_item_movement_id` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `elements`
--
ALTER TABLE `elements`
  MODIFY `element_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `filials`
--
ALTER TABLE `filials`
  MODIFY `filial_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `laptops`
--
ALTER TABLE `laptops`
  MODIFY `mobile_phone_id` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `laptop_brands`
--
ALTER TABLE `laptop_brands`
  MODIFY `laptop_brand_id` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `laptop_models`
--
ALTER TABLE `laptop_models`
  MODIFY `laptop_model_id` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `loans`
--
ALTER TABLE `loans`
  MODIFY `loan_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `loan_conditions`
--
ALTER TABLE `loan_conditions`
  MODIFY `loan_conditionl_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `loan_interests`
--
ALTER TABLE `loan_interests`
  MODIFY `loan_interest_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `loan_movements`
--
ALTER TABLE `loan_movements`
  MODIFY `loan_movement_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
--
-- AUTO_INCREMENT for table `loan_payment`
--
ALTER TABLE `loan_payment`
  MODIFY `loan_payment_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT for table `mobile_brands`
--
ALTER TABLE `mobile_brands`
  MODIFY `mobile_brand_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `mobile_models`
--
ALTER TABLE `mobile_models`
  MODIFY `mobile_model_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `mobile_phones`
--
ALTER TABLE `mobile_phones`
  MODIFY `mobile_phone_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `project_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `project_movements`
--
ALTER TABLE `project_movements`
  MODIFY `project_movement_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `project_stages`
--
ALTER TABLE `project_stages`
  MODIFY `project_stage_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `project_stage_actions`
--
ALTER TABLE `project_stage_actions`
  MODIFY `project_stage_actiont_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `project_stage_action_expenses`
--
ALTER TABLE `project_stage_action_expenses`
  MODIFY `project_stage_action_expense_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
--
-- AUTO_INCREMENT for table `project_stage_action_expense_movements`
--
ALTER TABLE `project_stage_action_expense_movements`
  MODIFY `project_stage_action_ex_movement_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `project_stage_action_expense_requests`
--
ALTER TABLE `project_stage_action_expense_requests`
  MODIFY `project_stage_action_expense_request_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `project_stage_action_expense_request_elements`
--
ALTER TABLE `project_stage_action_expense_request_elements`
  MODIFY `project_stage_action_expense_request_element_id` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `project_stage_action_expense_request_movements`
--
ALTER TABLE `project_stage_action_expense_request_movements`
  MODIFY `project_stage_action_ex_movement_id` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `project_stage_action_movements`
--
ALTER TABLE `project_stage_action_movements`
  MODIFY `project_stage_action_movement_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
--
-- AUTO_INCREMENT for table `project_stage_movements`
--
ALTER TABLE `project_stage_movements`
  MODIFY `project_stage_movement_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `project_stage_types`
--
ALTER TABLE `project_stage_types`
  MODIFY `project_stage_type_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `session_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;
--
-- AUTO_INCREMENT for table `store_houses`
--
ALTER TABLE `store_houses`
  MODIFY `store_house_id` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `store_house_boxes`
--
ALTER TABLE `store_house_boxes`
  MODIFY `store_house_box_id` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `action_to_action`
--
ALTER TABLE `action_to_action`
  ADD CONSTRAINT `FK_jddnchh79rdn7gwx3aoghi8h8` FOREIGN KEY (`val2`) REFERENCES `project_stage_actions` (`project_stage_actiont_id`),
  ADD CONSTRAINT `FK_jpogqsaj8qr6uv3y2ajlxtrb` FOREIGN KEY (`val1`) REFERENCES `project_stage_actions` (`project_stage_actiont_id`);

--
-- Constraints for table `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `FK_fytbnen4sba9mxl6umjgkf5g9` FOREIGN KEY (`filial_id`) REFERENCES `filials` (`filial_id`);

--
-- Constraints for table `company_item_movements`
--
ALTER TABLE `company_item_movements`
  ADD CONSTRAINT `FK_pvd1kqvkpycm3o3icaj7oyboj` FOREIGN KEY (`company_item_id`) REFERENCES `company_items` (`company_item_id`);

--
-- Constraints for table `loans`
--
ALTER TABLE `loans`
  ADD CONSTRAINT `FK_fqxvp8ws7xjcufxu0amg4mga4` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`),
  ADD CONSTRAINT `FK_h08pie5svljne9fhsg19m2cep` FOREIGN KEY (`loan_condition_id`) REFERENCES `loan_conditions` (`loan_conditionl_id`),
  ADD CONSTRAINT `FK_l34jjpg81g9r2bd42svyp8epg` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `FK_mvh9jf52erwc9ijg6er7p3gib` FOREIGN KEY (`filial_id`) REFERENCES `filials` (`filial_id`);

--
-- Constraints for table `loan_conditions`
--
ALTER TABLE `loan_conditions`
  ADD CONSTRAINT `FK_i413nj906i7038ahxmndoq7vy` FOREIGN KEY (`filial_id`) REFERENCES `filials` (`filial_id`);

--
-- Constraints for table `loan_interests`
--
ALTER TABLE `loan_interests`
  ADD CONSTRAINT `FK_9kvuk71cryli8rmykfs6esc7j` FOREIGN KEY (`loan_id`) REFERENCES `loans` (`loan_id`);

--
-- Constraints for table `loan_movements`
--
ALTER TABLE `loan_movements`
  ADD CONSTRAINT `FK_cdwvj7tam7rda0g5tuw31un4q` FOREIGN KEY (`loan_id`) REFERENCES `loans` (`loan_id`);

--
-- Constraints for table `loan_payment`
--
ALTER TABLE `loan_payment`
  ADD CONSTRAINT `FK_7s3iglpunxkjhaxwv291m6kna` FOREIGN KEY (`loan_id`) REFERENCES `loans` (`loan_id`);

--
-- Constraints for table `mobile_models`
--
ALTER TABLE `mobile_models`
  ADD CONSTRAINT `FK_lv3rj7piim6povkgybjh6txk8` FOREIGN KEY (`mobile_brand_id`) REFERENCES `mobile_brands` (`mobile_brand_id`);

--
-- Constraints for table `mobile_phones`
--
ALTER TABLE `mobile_phones`
  ADD CONSTRAINT `FK_d2rv6oj8019ckjk2onq7sgxna` FOREIGN KEY (`loan_id`) REFERENCES `loans` (`loan_id`),
  ADD CONSTRAINT `FK_dv1jv158f0od2ktcwnvvychkp` FOREIGN KEY (`mobile_brand_id`) REFERENCES `mobile_brands` (`mobile_brand_id`);

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `FK_afqu5s8xbwmgsv6jowtp083ku` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `project_movements`
--
ALTER TABLE `project_movements`
  ADD CONSTRAINT `FK_vndy30iuxcabnygqke7fnuo1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`);

--
-- Constraints for table `project_stages`
--
ALTER TABLE `project_stages`
  ADD CONSTRAINT `FK_3avbi76a7vb8jbgs5trquacyn` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`),
  ADD CONSTRAINT `FK_4yn95wfp3ld6e234rbpl0aqk9` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `FK_qoq1b6kwgbu0vllphjxs804ib` FOREIGN KEY (`project_stage_type_id`) REFERENCES `project_stage_types` (`project_stage_type_id`);

--
-- Constraints for table `project_stage_actions`
--
ALTER TABLE `project_stage_actions`
  ADD CONSTRAINT `FK_1c26e0cfis55si3m4dm8gmoht` FOREIGN KEY (`project_stage_id`) REFERENCES `project_stages` (`project_stage_id`);

--
-- Constraints for table `project_stage_action_expenses`
--
ALTER TABLE `project_stage_action_expenses`
  ADD CONSTRAINT `FK_7f3qvrseta1c9vhadx5evd2qn` FOREIGN KEY (`element_id`) REFERENCES `elements` (`element_id`),
  ADD CONSTRAINT `FK_dn0fxwwhlcm6wwe4qwg7kiiqf` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`),
  ADD CONSTRAINT `FK_p6n2jrq25gqtogkig3gdflxrh` FOREIGN KEY (`project_stage_id`) REFERENCES `project_stages` (`project_stage_id`),
  ADD CONSTRAINT `FK_sf8x8q94a0ket9pe967elh1nu` FOREIGN KEY (`project_stage_action_id`) REFERENCES `project_stage_actions` (`project_stage_actiont_id`);

--
-- Constraints for table `project_stage_action_expense_movements`
--
ALTER TABLE `project_stage_action_expense_movements`
  ADD CONSTRAINT `FK_dqnc63oddq5m1a4irg6uy2wx6` FOREIGN KEY (`project_stage_actiont_expense_id`) REFERENCES `project_stage_action_expenses` (`project_stage_action_expense_id`);

--
-- Constraints for table `project_stage_action_expense_requests`
--
ALTER TABLE `project_stage_action_expense_requests`
  ADD CONSTRAINT `FK_1w3am43ddm34knaun5mkjs1e3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `FK_9dm90lksubxlksciq3h16ncno` FOREIGN KEY (`project_stage_actiont_id`) REFERENCES `project_stage_actions` (`project_stage_actiont_id`);

--
-- Constraints for table `project_stage_action_expense_request_elements`
--
ALTER TABLE `project_stage_action_expense_request_elements`
  ADD CONSTRAINT `FK_dk6dq2ax0w4f5ggtmu4yaba26` FOREIGN KEY (`project_stage_action_expense_request_id`) REFERENCES `project_stage_action_expense_requests` (`project_stage_action_expense_request_id`),
  ADD CONSTRAINT `FK_mw0pkinwus287eor6aconn5e7` FOREIGN KEY (`element_id`) REFERENCES `elements` (`element_id`);

--
-- Constraints for table `project_stage_action_expense_request_movements`
--
ALTER TABLE `project_stage_action_expense_request_movements`
  ADD CONSTRAINT `FK_3na5xpmir9bgfekmuqxhsqrto` FOREIGN KEY (`project_stage_actiont_expense_request_id`) REFERENCES `project_stage_action_expense_requests` (`project_stage_action_expense_request_id`);

--
-- Constraints for table `project_stage_action_movements`
--
ALTER TABLE `project_stage_action_movements`
  ADD CONSTRAINT `FK_m656ww5s5r6wmcs6wy84xamsx` FOREIGN KEY (`project_stage_actiont_id`) REFERENCES `project_stage_actions` (`project_stage_actiont_id`);

--
-- Constraints for table `project_stage_movements`
--
ALTER TABLE `project_stage_movements`
  ADD CONSTRAINT `FK_t8eml5hy0yfc1idyifx3ym1no` FOREIGN KEY (`project_stage_id`) REFERENCES `project_stages` (`project_stage_id`);

--
-- Constraints for table `project_to_prarab`
--
ALTER TABLE `project_to_prarab`
  ADD CONSTRAINT `FK_9lwleh6j7p52gsuyjl18o185h` FOREIGN KEY (`val1`) REFERENCES `projects` (`project_id`),
  ADD CONSTRAINT `FK_pv5ciepxh0aaad8rjvdg5kdt4` FOREIGN KEY (`val2`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `FK_ll67hfsoxbb4aj85oexrpq39l` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `store_houses`
--
ALTER TABLE `store_houses`
  ADD CONSTRAINT `FK_r149a5sdqjsk9e55756o49ryu` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`);

--
-- Constraints for table `store_house_boxes`
--
ALTER TABLE `store_house_boxes`
  ADD CONSTRAINT `FK_knw1tvhq8v635gcunis7u8jx0` FOREIGN KEY (`store_house_id`) REFERENCES `store_houses` (`store_house_id`),
  ADD CONSTRAINT `FK_oc9hl9toh3ds1gwqq5d8343vg` FOREIGN KEY (`company_item_id`) REFERENCES `company_items` (`company_item_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_i5kjqdy6ue9wnt7mbn30cb7ar` FOREIGN KEY (`filial_id`) REFERENCES `filials` (`filial_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
