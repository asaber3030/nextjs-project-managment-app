-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2024 at 06:50 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project-management-app`
--

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `url` varchar(191) NOT NULL,
  `icon` varchar(191) NOT NULL DEFAULT 'notifications/default.svg',
  `sentIn` timestamp NOT NULL DEFAULT current_timestamp(),
  `isRead` tinyint(1) DEFAULT 0,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`id`, `title`, `url`, `icon`, `sentIn`, `isRead`, `userId`) VALUES
(49, '<b>Team FLC</b> team has been created!', '/dashboard/teams/10', '/notifications/create-team.svg', '2024-06-13 11:13:41', 1, 10),
(50, 'You have been invited to join team <b>Team FLC</b>', '/dashboard/teams', '/notifications/invite-to-team.svg', '2024-06-13 11:20:43', 1, 9),
(51, '<b>LOUD</b> team has been created!', '/dashboard/teams/11', '/notifications/create-team.svg', '2024-06-15 17:31:38', 1, 10),
(52, '<b>LOUD</b> team has been created!', '/dashboard/teams/12', '/notifications/create-team.svg', '2024-06-15 17:35:44', 1, 10),
(53, 'You have been invited to join team <b>LOUD</b>', '/dashboard/invitations', '/notifications/invite-to-team.svg', '2024-06-15 17:35:56', 0, 13),
(54, 'You have been invited to join team <b>LOUD</b>', '/dashboard/invitations', '/notifications/invite-to-team.svg', '2024-06-15 17:35:56', 0, 9),
(55, 'You have been invited to join team <b>LOUD</b>', '/dashboard/invitations', '/notifications/invite-to-team.svg', '2024-06-15 17:35:56', 0, 15),
(56, 'You have been invited to join team <b>LOUD</b>', '/dashboard/invitations', '/notifications/invite-to-team.svg', '2024-06-15 17:35:56', 0, 14),
(57, '<b>convex</b> - A project has been created to your list!', '/dashboard/teams/12/projects/6', '/notifications/create-project.svg', '2024-06-15 17:38:51', 1, 10),
(58, '<b>social-media</b> - A project has been created to your list!', '/dashboard/teams/12/projects/7', '/notifications/create-project.svg', '2024-06-15 17:39:18', 1, 10),
(59, '<b>blog-nestjs</b> - A project has been created to your list!', '/dashboard/teams/12/projects/8', '/notifications/create-project.svg', '2024-06-15 17:39:33', 1, 10),
(60, '<b>youtube-clone</b> - A project has been created to your list!', '/dashboard/teams/12/projects/9', '/notifications/create-project.svg', '2024-06-15 17:39:59', 1, 10),
(61, '<b>project-manager</b> - A project has been created to your list!', '/dashboard/teams/12/projects/10', '/notifications/create-project.svg', '2024-06-15 17:40:24', 1, 10),
(62, '<b>convex</b> - This project details has been updated!', '/dashboard/teams/12/projects/6', '/notifications/update.svg', '2024-06-15 17:40:45', 1, 10),
(63, '<b>valorant-website-clone</b> - A project has been created to your list!', '/dashboard/teams/12/projects/11', '/notifications/create-project.svg', '2024-06-15 17:45:49', 1, 10),
(64, 'You have been added to team <b>LOUD</b>', '/dashboard/teams', '/notifications/check.svg', '2024-06-15 18:06:21', 0, 9),
(65, 'You have been added to team <b>LOUD</b>', '/dashboard/teams', '/notifications/check.svg', '2024-06-15 18:06:37', 0, 11),
(66, 'You have been added to team <b>LOUD</b>', '/dashboard/teams', '/notifications/check.svg', '2024-06-15 18:06:43', 0, 12),
(67, 'You have been added to team <b>LOUD</b>', '/dashboard/teams', '/notifications/check.svg', '2024-06-15 18:06:48', 0, 13),
(68, 'You have been added to team <b>LOUD</b>', '/dashboard/teams', '/notifications/check.svg', '2024-06-15 18:06:54', 0, 14),
(69, 'You have been added to team <b>LOUD</b>', '/dashboard/teams', '/notifications/check.svg', '2024-06-15 18:07:00', 0, 15),
(72, 'You have been invited to join team <b>TEAM1</b>', '/dashboard/invitations', '/notifications/invite-to-team.svg', '2024-06-16 15:11:55', 0, 8),
(73, 'You have been invited to join team <b>TEAM1</b>', '/dashboard/invitations', '/notifications/invite-to-team.svg', '2024-06-16 15:11:55', 0, 10),
(74, 'You have been invited to join team <b>TEAM1</b>', '/dashboard/invitations', '/notifications/invite-to-team.svg', '2024-06-16 15:11:55', 0, 11),
(75, 'You have been invited to join team <b>TEAM1</b>', '/dashboard/invitations', '/notifications/invite-to-team.svg', '2024-06-16 15:11:55', 0, 13),
(76, 'You have been invited to join team <b>TEAM1</b>', '/dashboard/invitations', '/notifications/invite-to-team.svg', '2024-06-16 15:11:55', 0, 12),
(79, 'You have been added to team <b>TEAM1</b>', '/dashboard/teams', '/notifications/check.svg', '2024-06-16 15:14:40', 0, 8),
(80, 'You have been added to team <b>TEAM1</b>', '/dashboard/teams', '/notifications/check.svg', '2024-06-16 15:14:44', 0, 9),
(81, 'You have been added to team <b>TEAM1</b>', '/dashboard/teams', '/notifications/check.svg', '2024-06-16 15:14:54', 0, 10),
(82, 'You have been added to team <b>TEAM1</b>', '/dashboard/teams', '/notifications/check.svg', '2024-06-16 15:15:03', 0, 12),
(83, 'Your role inside team <b>TEAM1</b> has been changed to Owner', '/dashboard/teams', '/notifications/status.svg', '2024-06-16 15:15:59', 0, 12),
(84, 'Your role inside team <b>TEAM1</b> has been changed to Editor', '/dashboard/teams', '/notifications/status.svg', '2024-06-16 15:16:04', 0, 10),
(85, 'Your subscription to plan <b>Basic</b> has been paid and your are successfully subscribed.', '/account/subscriptions', '/notifications/default.svg', '2024-06-17 17:51:22', 0, 10),
(86, 'Your subscription to plan <b>Professional</b> has been paid and your are successfully subscribed.', '/account/subscriptions', '/notifications/default.svg', '2024-06-17 18:29:46', 0, 21),
(87, 'Your subscription to plan <b>Professional</b> has been paid and your are successfully subscribed.', '/account/subscriptions', '/notifications/default.svg', '2024-06-17 19:12:25', 0, 21),
(88, '<b>Abdelrhman Saber</b> team has been created!', '/dashboard/teams/14', '/notifications/create-team.svg', '2024-06-17 21:01:20', 0, 21),
(89, '<b>Abdelrhman Saber</b> - A project has been created to your list!', '/dashboard/teams/14/projects/13', '/notifications/create-project.svg', '2024-06-17 21:02:55', 0, 21),
(90, 'Your subscription to plan <b>Basic</b> has been paid and your are successfully subscribed.', '/account/subscriptions', '/notifications/default.svg', '2024-06-17 21:13:56', 0, 21),
(91, 'You have been invited to join team <b>Abdelrhman Saber</b>', '/dashboard/invitations', '/notifications/invite-to-team.svg', '2024-06-18 01:25:37', 0, 10),
(92, '<b>Team2</b> team has been created!', '/dashboard/teams/15', '/notifications/create-team.svg', '2024-06-18 01:26:05', 1, 21),
(93, 'Your subscription to plan <b>Professional</b> has been paid and your are successfully subscribed.', '/account/subscriptions', '/notifications/default.svg', '2024-06-18 14:25:03', 0, 22),
(94, '<b>FCB Spain</b> team has been created!', '/dashboard/teams/16', '/notifications/create-team.svg', '2024-06-18 14:26:11', 0, 22),
(95, 'You have been invited to join team <b>FCB Spain</b>', '/dashboard/invitations', '/notifications/invite-to-team.svg', '2024-06-18 14:26:55', 1, 9),
(96, '<b>Project number1</b> - A project has been created to your list!', '/dashboard/teams/16/projects/14', '/notifications/create-project.svg', '2024-06-18 14:28:00', 0, 22),
(97, '<b>duex-project</b> - A project has been created to your list!', '/dashboard/teams/16/projects/15', '/notifications/create-project.svg', '2024-06-18 14:29:13', 0, 22),
(98, '<b>software-tester</b> - A project has been created to your list!', '/dashboard/teams/16/projects/16', '/notifications/create-project.svg', '2024-06-18 14:29:51', 0, 22),
(99, '<b>software-tester</b> - This project details has been updated!', '/dashboard/teams/16/projects/16', '/notifications/update.svg', '2024-06-18 14:30:26', 0, 22),
(100, '<b>Abdelrhman Saber</b> - A project has been created to your list!', '/dashboard/teams/16/projects/17', '/notifications/create-project.svg', '2024-06-18 14:32:22', 0, 22),
(101, 'You have been added to team <b>FCB Spain</b>', '/dashboard/teams', '/notifications/check.svg', '2024-06-18 14:33:03', 0, 8),
(102, 'You have been added to team <b>FCB Spain</b>', '/dashboard/teams', '/notifications/check.svg', '2024-06-18 14:33:14', 0, 10),
(103, 'You have been added to team <b>FCB Spain</b>', '/dashboard/teams', '/notifications/check.svg', '2024-06-18 14:33:19', 0, 11),
(104, 'You have been added to team <b>FCB Spain</b>', '/dashboard/teams', '/notifications/check.svg', '2024-06-18 14:33:23', 0, 12),
(105, 'Your role inside team <b>FCB Spain</b> has been changed to Owner', '/dashboard/teams', '/notifications/status.svg', '2024-06-18 14:36:25', 0, 11),
(106, 'Your role inside team <b>FCB Spain</b> has been changed to Owner', '/dashboard/teams', '/notifications/status.svg', '2024-06-18 14:36:30', 0, 9),
(107, 'Your role inside team <b>FCB Spain</b> has been changed to Member', '/dashboard/teams', '/notifications/status.svg', '2024-06-18 14:37:10', 0, 8),
(108, '<b>software-tester</b> - This project details has been updated!', '/dashboard/teams/16/projects/16', '/notifications/update.svg', '2024-06-18 15:25:26', 0, 22),
(109, '<b>software-tester</b> - This project details has been updated!', '/dashboard/teams/16/projects/16', '/notifications/update.svg', '2024-06-18 15:25:33', 0, 22),
(110, '<b>duex-project</b> - This project details has been updated!', '/dashboard/teams/16/projects/15', '/notifications/update.svg', '2024-06-18 15:25:42', 0, 22),
(111, 'Your status inside team <b>FCB Spain</b> has been changed to Active', '/dashboard/teams', '/notifications/status.svg', '2024-06-18 16:00:07', 0, 12),
(112, '<b>youtube-clone</b> - This project details has been updated!', '/dashboard/teams/16/projects/17', '/notifications/update.svg', '2024-06-18 18:13:48', 0, 22),
(113, 'You have new message about task <b>taskas djfaksldhasjkl</b> that says <b>This is new title</b>', '/dashboard/teams/16/tasks/46', '/notifications/default.svg', '2024-06-18 18:14:39', 1, 9),
(114, 'Your subscription to plan <b>Basic</b> has been paid and your are successfully subscribed.', '/account/subscriptions', '/notifications/default.svg', '2024-06-18 18:38:16', 0, 22),
(115, '<b>New team</b> team has been created!', '/dashboard/teams/17', '/notifications/create-team.svg', '2024-06-18 20:33:53', 1, 9),
(116, 'You have been invited to join team <b>New team</b>', '/dashboard/invitations', '/notifications/invite-to-team.svg', '2024-06-18 20:34:05', 1, 22),
(117, '<b>facebook-clone-nextjs</b> - A project has been created to your list!', '/dashboard/teams/17/projects/18', '/notifications/create-project.svg', '2024-06-18 20:35:07', 0, 9),
(118, '<b>blog-reddit-js</b> - A project has been created to your list!', '/dashboard/teams/17/projects/19', '/notifications/create-project.svg', '2024-06-18 20:35:27', 0, 9),
(119, 'Your subscription to plan <b>Professional</b> has been paid and your are successfully subscribed.', '/account/subscriptions', '/notifications/default.svg', '2024-06-18 20:53:34', 0, 22),
(120, 'Your subscription to plan <b>Basic</b> has been paid and your are successfully subscribed.', '/account/subscriptions', '/notifications/default.svg', '2024-06-18 21:04:34', 0, 22),
(121, 'Your subscription to plan <b>Professional</b> has been paid and your are successfully subscribed.', '/account/subscriptions', '/notifications/default.svg', '2024-06-18 21:16:43', 0, 23),
(122, '<b>NewTeam</b> team has been created!', '/dashboard/teams/18', '/notifications/create-team.svg', '2024-06-18 21:16:54', 0, 23),
(123, 'You have been invited to join team <b>NewTeam</b>', '/dashboard/invitations', '/notifications/invite-to-team.svg', '2024-06-18 21:17:04', 0, 9),
(124, 'You have been invited to join team <b>NewTeam</b>', '/dashboard/invitations', '/notifications/invite-to-team.svg', '2024-06-18 21:17:04', 0, 8),
(125, 'You have been invited to join team <b>NewTeam</b>', '/dashboard/invitations', '/notifications/invite-to-team.svg', '2024-06-18 21:17:04', 0, 10),
(126, 'You have been invited to join team <b>NewTeam</b>', '/dashboard/invitations', '/notifications/invite-to-team.svg', '2024-06-18 21:17:04', 0, 11),
(127, 'You have been invited to join team <b>NewTeam</b>', '/dashboard/invitations', '/notifications/invite-to-team.svg', '2024-06-18 21:17:37', 0, 22),
(128, 'Your subscription to plan <b>Professional</b> has been paid and your are successfully subscribed.', '/account/subscriptions', '/notifications/default.svg', '2024-06-18 21:32:52', 0, 22),
(129, 'Your subscription to plan <b>Professional</b> has been paid and your are successfully subscribed.', '/account/subscriptions', '/notifications/default.svg', '2024-06-18 21:34:39', 0, 24),
(130, '<b>Abdelrhman Saber</b> team has been created!', '/dashboard/teams/19', '/notifications/create-team.svg', '2024-06-18 21:34:48', 0, 24),
(131, 'You have been invited to join team <b>Abdelrhman Saber</b>', '/dashboard/invitations', '/notifications/invite-to-team.svg', '2024-06-18 21:34:56', 0, 22),
(132, 'Your subscription to plan <b>Professional</b> has been paid and your are successfully subscribed.', '/account/subscriptions', '/notifications/default.svg', '2024-06-18 21:43:19', 0, 25),
(133, '<b>LoudTeam</b> team has been created!', '/dashboard/teams/20', '/notifications/create-team.svg', '2024-06-18 21:43:38', 0, 25),
(134, '<b>NewProject</b> - A project has been created to your list!', '/dashboard/teams/20/projects/20', '/notifications/create-project.svg', '2024-06-18 21:43:54', 0, 25),
(135, 'Your subscription to plan <b>Professional</b> has been paid and your are successfully subscribed.', '/account/subscriptions', '/notifications/default.svg', '2024-06-18 21:46:55', 0, 26),
(136, '<b>Abdelrhman Saber</b> team has been created!', '/dashboard/teams/21', '/notifications/create-team.svg', '2024-06-18 21:47:07', 0, 26),
(137, 'You have been invited to join team <b>Abdelrhman Saber</b>', '/dashboard/invitations', '/notifications/invite-to-team.svg', '2024-06-18 21:47:18', 0, 9),
(138, 'You have been invited to join team <b>Abdelrhman Saber</b>', '/dashboard/invitations', '/notifications/invite-to-team.svg', '2024-06-18 21:47:18', 0, 22),
(139, 'You have been invited to join team <b>Abdelrhman Saber</b>', '/dashboard/invitations', '/notifications/invite-to-team.svg', '2024-06-18 21:47:18', 1, 10),
(140, '<b>convex</b> - A project has been created to your list!', '/dashboard/teams/21/projects/21', '/notifications/create-project.svg', '2024-06-18 21:47:50', 0, 26),
(141, 'You have been added to team <b>FCB Spain</b>', '/dashboard/teams', '/notifications/check.svg', '2024-06-18 21:49:38', 0, 26),
(142, 'Your role inside team <b>FCB Spain</b> has been changed to Owner', '/dashboard/teams', '/notifications/status.svg', '2024-06-18 21:49:43', 0, 26),
(143, 'You have new message about task <b>Do sidebar #1</b> that says <b>Adding new reply</b>', '/dashboard/teams/17/tasks/48', '/notifications/default.svg', '2024-06-18 21:51:03', 0, 22),
(144, 'Your subscription to plan <b>Professional</b> has been paid and your are successfully subscribed.', '/account/subscriptions', '/notifications/default.svg', '2024-07-03 01:05:06', 0, 10),
(145, '<b>Abdelrhman Saber</b> team has been created!', '/dashboard/teams/22', '/notifications/create-team.svg', '2024-07-03 01:06:47', 0, 10),
(146, 'Your subscription to plan <b>Professional</b> has been paid and your are successfully subscribed.', '/account/subscriptions', '/notifications/default.svg', '2024-07-03 10:43:39', 0, 27),
(147, '<b>test-team</b> team has been created!', '/dashboard/teams/23', '/notifications/create-team.svg', '2024-07-03 10:44:51', 0, 27),
(148, 'You have been added to team <b>test-team</b>', '/dashboard/teams', '/notifications/check.svg', '2024-07-03 10:47:00', 1, 8),
(149, 'You have been added to team <b>test-team</b>', '/dashboard/teams', '/notifications/check.svg', '2024-07-03 10:47:06', 0, 9),
(150, 'Your subscription to plan <b>Basic</b> has been paid and your are successfully subscribed.', '/account/subscriptions', '/notifications/default.svg', '2024-10-10 07:07:56', 0, 28),
(151, 'Your subscription to plan <b>Professional</b> has been paid and your are successfully subscribed.', '/account/subscriptions', '/notifications/default.svg', '2024-10-10 07:08:19', 0, 28),
(152, '<b>xyz-team</b> team has been created!', '/dashboard/teams/24', '/notifications/create-team.svg', '2024-10-17 15:10:06', 0, 29),
(153, 'You have been invited to join team <b>xyz-team</b>', '/dashboard/invitations', '/notifications/invite-to-team.svg', '2024-10-17 15:11:37', 0, 10),
(154, '<b>convex</b> - A project has been created to your list!', '/dashboard/teams/24/projects/22', '/notifications/create-project.svg', '2024-10-17 15:12:22', 0, 29),
(155, 'You have been added to team <b>xyz-team</b>', '/dashboard/teams', '/notifications/check.svg', '2024-10-17 15:16:55', 0, 28),
(156, 'Your status inside team <b>xyz-team</b> has been changed to Banned', '/dashboard/teams', '/notifications/status.svg', '2024-10-17 15:17:05', 0, 28),
(157, 'Your status inside team <b>xyz-team</b> has been changed to Active', '/dashboard/teams', '/notifications/status.svg', '2024-10-17 15:17:09', 0, 28),
(158, '<b>XYZ_ZYX</b> - A project has been created to your list!', '/dashboard/teams/10/projects/23', '/notifications/create-project.svg', '2024-10-18 10:51:20', 0, 10),
(159, 'You have been added to team <b>Team FLC</b>', '/dashboard/teams', '/notifications/check.svg', '2024-10-18 10:52:54', 0, 15),
(160, 'You have been invited to join team <b>Team FLC</b>', '/dashboard/invitations', '/notifications/invite-to-team.svg', '2024-10-18 10:53:14', 0, 8),
(161, 'You have been invited to join team <b>Team FLC</b>', '/dashboard/invitations', '/notifications/invite-to-team.svg', '2024-10-18 10:53:14', 0, 12),
(162, 'You have new message about task <b>Task</b> that says <b>;jdlkf</b>', '/dashboard/teams/16/tasks/42', '/notifications/default.svg', '2024-10-18 10:53:54', 0, 10),
(163, '<b>dfjaskdf</b> team has been created!', '/dashboard/teams/25', '/notifications/create-team.svg', '2024-10-18 10:54:41', 1, 10),
(164, 'You have new message about task <b>TASK_1_XYZ</b> that says <b>asdasd</b>', '/dashboard/teams/10/tasks/55', '/notifications/default.svg', '2024-10-18 10:57:49', 0, 9),
(165, 'Your status inside team <b>LOUD</b> has been changed to Active', '/dashboard/teams', '/notifications/status.svg', '2024-12-10 03:43:36', 0, 11);

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

CREATE TABLE `permission` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `tag` varchar(191) NOT NULL DEFAULT 'tasks',
  `displayName` varchar(191) NOT NULL DEFAULT 'Display Name'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permission`
--

INSERT INTO `permission` (`id`, `name`, `tag`, `displayName`) VALUES
(1, 'update-tasks', 'tasks', 'Update Tasks'),
(2, 'delete-tasks', 'tasks', 'Delete Tasks'),
(3, 'add-tasks', 'tasks', 'Add Tasks'),
(4, 'assign-tasks', 'tasks', 'Assign Tasks'),
(5, 'update-team-roles', 'teams', 'Update Team Roles'),
(6, 'update-team-settings', 'teams', 'Update team Settings'),
(7, 'invite-members', 'members', 'Invite Members'),
(8, 'direct-add-members', 'members', 'Direct add members'),
(9, 'delete-members', 'members', 'Delete members'),
(10, 'change-member-status', 'members', 'Change member status'),
(11, 'change-member-role', 'members', 'Change Member Role'),
(12, 'remove-invitations', 'members', 'Remove Invitations'),
(13, 'update-projects', 'projects', 'Update Projects'),
(14, 'delete-projects', 'projects', 'Delete Projects'),
(15, 'add-projects', 'projects', 'Add projects'),
(16, 'add-boards', 'boards', 'Add Boards'),
(17, 'delete-boards', 'boards', 'Delete Boards'),
(18, 'update-boards', 'boards', 'Update Boards');

-- --------------------------------------------------------

--
-- Table structure for table `plan`
--

CREATE TABLE `plan` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `paymentLink` longtext NOT NULL DEFAULT '',
  `price` double NOT NULL DEFAULT 200,
  `oldPrice` double NOT NULL DEFAULT 400,
  `numberOfTeams` int(11) NOT NULL DEFAULT 1,
  `numberOfProjectTeams` int(11) NOT NULL DEFAULT 1,
  `numberOfPersonalProjects` int(11) NOT NULL DEFAULT 1,
  `numberOfPersonalTasks` int(11) NOT NULL DEFAULT 1,
  `numberOfPersonalBoards` int(11) NOT NULL DEFAULT 1,
  `numberOfTeamMembers` int(11) NOT NULL DEFAULT 1,
  `numberOfBoards` int(11) NOT NULL DEFAULT 1,
  `numberOfTasks` int(11) NOT NULL DEFAULT 1,
  `hasMailSystem` tinyint(1) NOT NULL DEFAULT 0,
  `hasCharts` tinyint(1) NOT NULL DEFAULT 0,
  `hasAnalytics` tinyint(1) NOT NULL DEFAULT 0,
  `canDirectAdd` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `plan`
--

INSERT INTO `plan` (`id`, `name`, `paymentLink`, `price`, `oldPrice`, `numberOfTeams`, `numberOfProjectTeams`, `numberOfPersonalProjects`, `numberOfPersonalTasks`, `numberOfPersonalBoards`, `numberOfTeamMembers`, `numberOfBoards`, `numberOfTasks`, `hasMailSystem`, `hasCharts`, `hasAnalytics`, `canDirectAdd`, `createdAt`, `updatedAt`) VALUES
(1, 'Free', 'https://buy.stripe.com/test_aEU9EqazX32Lg8M146', 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, '2024-06-01 19:05:15', '2024-06-12 22:03:27.000'),
(2, 'Basic', 'https://buy.stripe.com/test_fZeg2OazXdHp6ycdQQ', 10, 20, 10, 25, 20, 50, 20, 20, 30, 10, 1, 0, 0, 1, '2024-06-01 19:05:15', '2024-06-12 22:05:23.000'),
(3, 'Professional', 'https://buy.stripe.com/test_8wM9Eq9vT6eXg8MaEF', 30, 45, 999999, 999999, 999999, 999999, 999999, 999999, 999999, 999999, 1, 1, 1, 1, '2024-06-01 19:05:15', '2024-06-12 22:03:27.000');

-- --------------------------------------------------------

--
-- Table structure for table `planfeature`
--

CREATE TABLE `planfeature` (
  `id` int(11) NOT NULL,
  `planId` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `github` text DEFAULT NULL,
  `url` text DEFAULT NULL,
  `notes` varchar(191) DEFAULT NULL,
  `ownerId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `name`, `description`, `github`, `url`, `notes`, `ownerId`, `createdAt`, `updatedAt`) VALUES
(2, 'Abdelrhman Saber', 'adasdasdasdasdasd asd', 'https://www.facebook.com/', 'https://www.facebook.com/22', 'asdasd', 21, '2024-06-13 14:46:46', '2024-06-13 17:46:46.195'),
(3, 'project-convex', 'adasdasdasdasdasd asd', 'https://www.facebook.com/', 'https://www.facebook.com/22', 'asdasd', 21, '2024-06-13 14:46:46', '2024-06-13 17:46:46.195'),
(4, 'youtube-clone', 'youtube-clone', 'https://www.facebook.com/', 'https://www.facebook.com/22', 'youtube-clone', 22, '2024-06-18 20:48:31', '2024-06-18 23:48:31.680'),
(5, 'blog-next', 'blog-n exblog -nextt', 'https://www.facebook.com/', 'https://www.facebook.com/22', 'blog-next', 22, '2024-06-18 20:48:44', '2024-06-18 23:48:44.788'),
(6, 'Abdulrahman Saber', 'sadasdsadasdasd', 'https://www.facebook.com/', 'https://www.facebook.com/', 'asdasdasd', 10, '2024-12-10 03:29:53', '2024-12-10 05:29:53.580');

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

CREATE TABLE `subscription` (
  `id` int(11) NOT NULL,
  `planId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `subTotal` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `currency` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `status` varchar(191) NOT NULL,
  `customerId` longtext NOT NULL,
  `expiresAt` bigint(20) NOT NULL,
  `invoiceId` longtext NOT NULL,
  `subscriptionId` longtext NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subscription`
--

INSERT INTO `subscription` (`id`, `planId`, `userId`, `subTotal`, `total`, `currency`, `email`, `status`, `customerId`, `expiresAt`, `invoiceId`, `subscriptionId`, `createdAt`) VALUES
(20, 2, 22, 1000, 1000, 'usd', 'malek@a.com', 'canceled', 'cus_QJpgpFqIs7ZwQA', 1718841802, 'in_1PTC0n2NdJf3JTfn2WKLqUQj', 'sub_1PTC0n2NdJf3JTfnN6x5WBOG', '2024-06-18 21:04:34'),
(21, 1, 22, 0, 0, 'usd', 'malek@a.com', 'complete', '', 0, '', '', '2024-06-18 21:04:53'),
(22, 3, 23, 3000, 3000, 'usd', 'khaled2200@a.com', 'complete', 'cus_QJps6rhgZJ8Lwb', 1718842592, 'in_1PTCCY2NdJf3JTfnRDr48TpJ', 'sub_1PTCCY2NdJf3JTfnUJ3cV6By', '2024-06-18 21:16:43'),
(23, 3, 22, 3000, 3000, 'usd', 'malek@a.com', 'complete', 'cus_QJq8n7abG9n6VT', 1718843560, 'in_1PTCSA2NdJf3JTfniKAGTVNP', 'sub_1PTCSA2NdJf3JTfnumScAQKV', '2024-06-18 21:32:52'),
(24, 3, 24, 3000, 3000, 'usd', 'yoru80@a.com', 'complete', 'cus_QJqAJAVZg9gZnp', 1718843668, 'in_1PTCTv2NdJf3JTfnna9SO6RG', 'sub_1PTCTv2NdJf3JTfnbmGTgLIt', '2024-06-18 21:34:39'),
(25, 3, 25, 3000, 3000, 'usd', 'waleed@a.com', 'complete', 'cus_QJqIhnAabBeNLE', 1718844185, 'in_1PTCcH2NdJf3JTfnPWZOpDgz', 'sub_1PTCcH2NdJf3JTfnWYdTo80q', '2024-06-18 21:43:19'),
(26, 3, 26, 3000, 3000, 'usd', 'yassien@a.com', 'complete', 'cus_QJqMEsFsr9JSA5', 1718844402, 'in_1PTCfl2NdJf3JTfn9RzTlKLr', 'sub_1PTCfl2NdJf3JTfnfp5r7ojF', '2024-06-18 21:46:55'),
(27, 3, 10, 3000, 3000, 'usd', 'abdulrahmansaber120@gmail.com', 'complete', 'cus_QP8iTpjjIwkQ63', 1720065884, 'in_1PYKRD2NdJf3JTfn8Ciavrsy', 'sub_1PYKRD2NdJf3JTfnr9KFAIic', '2024-07-03 01:05:06'),
(28, 3, 27, 3000, 3000, 'usd', 'yasser99@a.com', 'complete', 'cus_QPI3Ev42VN0GbX', 1720100591, 'in_1PYTSz2NdJf3JTfn597g0Van', 'sub_1PYTSz2NdJf3JTfnQYQfapzP', '2024-07-03 10:43:39'),
(29, 2, 28, 1000, 1000, 'usd', 'u@a.com', 'complete', 'cus_R0JvjZtlOFo8bQ', 1728641262, 'in_1Q8JHf2NdJf3JTfnQpwOj5WY', 'sub_1Q8JHf2NdJf3JTfn3EJeU5V2', '2024-10-10 07:07:56'),
(30, 3, 28, 3000, 3000, 'usd', 'u@a.com', 'complete', 'cus_R0JvknQHeN0Fkg', 1728641290, 'in_1Q8JI52NdJf3JTfn852ktrGq', 'sub_1Q8JI52NdJf3JTfnLKQM3Oxa', '2024-10-10 07:08:19');

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `description` longtext NOT NULL,
  `url` text DEFAULT NULL,
  `notes` varchar(191) DEFAULT NULL,
  `status` enum('Pending','Done','Todo') NOT NULL DEFAULT 'Pending',
  `ownerId` int(11) NOT NULL,
  `finishAt` date NOT NULL DEFAULT current_timestamp(3),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`id`, `title`, `description`, `url`, `notes`, `status`, `ownerId`, `finishAt`, `createdAt`, `updatedAt`) VALUES
(4, 'Hello this is task', 'asdasfsdakl;fgh dsjlkfhdsfl;\n', 'https://www.facebook.com/22', 'project new updated ecommerce', 'Todo', 10, '2024-06-15', '2024-06-13 14:47:07', '2024-06-13 17:47:07.955'),
(5, 'asdopjfdsdl;kgfh sa', 'asdasfsdafsdfsda', 'https://www.facebook.com/22', 'project new updated ecommerce', 'Pending', 10, '2024-06-22', '2024-06-13 14:47:23', '2024-06-15 18:57:45.776'),
(6, 'سيشسيبشبشسيب شسيبسي بش', 'يبئل يبسلسيبليسبل', 'https://www.facebook.com/22', 'project new updated ecommerce', 'Done', 10, '2024-06-15', '2024-06-15 15:58:01', '2024-06-15 18:58:01.594'),
(7, 'Adding new task', 'project new updated ecommerce', 'https://www.facebook.com/22', 'project new updated ecommerce', 'Pending', 21, '2024-06-15', '2024-06-18 01:27:04', '2024-06-18 04:27:04.542');

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `about` varchar(191) DEFAULT NULL,
  `ownerId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`id`, `name`, `about`, `ownerId`, `createdAt`, `updatedAt`) VALUES
(12, 'LOUD', '', 10, '2024-06-15 17:35:44', '2024-06-15 20:35:44.246'),
(14, 'Abdelrhman Saber', '', 21, '2024-06-17 21:01:20', '2024-06-18 00:01:20.344'),
(15, 'Team2', '', 21, '2024-06-18 01:26:05', '2024-06-18 04:26:05.731'),
(16, 'FCB Spain', 'Spain team', 22, '2024-06-18 14:26:11', '2024-06-18 17:26:11.074'),
(17, 'New team', '', 9, '2024-06-18 20:33:53', '2024-06-18 23:33:53.949'),
(18, 'NewTeam', '', 23, '2024-06-18 21:16:54', '2024-06-19 00:16:54.469'),
(19, 'Abdelrhman Saber', '', 24, '2024-06-18 21:34:48', '2024-06-19 00:34:48.785'),
(20, 'LoudTeam', '', 25, '2024-06-18 21:43:38', '2024-06-19 00:43:38.661'),
(21, 'Abdelrhman Saber', '', 26, '2024-06-18 21:47:07', '2024-06-19 00:47:07.375'),
(22, 'Abdelrhman Saber', 'asdasd', 10, '2024-07-03 01:06:47', '2024-07-03 04:06:47.670'),
(23, 'test-team', '', 27, '2024-07-03 10:44:51', '2024-07-03 13:44:51.212'),
(24, 'xyz-team', '', 29, '2024-10-17 15:10:06', '2024-10-17 18:10:06.197'),
(25, 'dfjaskdf', 'sdfas', 10, '2024-10-18 10:54:41', '2024-10-18 13:54:41.948');

-- --------------------------------------------------------

--
-- Table structure for table `teaminvite`
--

CREATE TABLE `teaminvite` (
  `id` int(11) NOT NULL,
  `teamId` int(11) NOT NULL,
  `invitationRole` enum('Owner','Member','Editor','Admin') NOT NULL DEFAULT 'Member',
  `userId` int(11) NOT NULL,
  `sentIn` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('Pending','Accepted','Refused') NOT NULL DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `teaminvite`
--

INSERT INTO `teaminvite` (`id`, `teamId`, `invitationRole`, `userId`, `sentIn`, `status`) VALUES
(11, 12, 'Member', 13, '2024-06-15 17:35:56', 'Pending'),
(12, 12, 'Member', 9, '2024-06-15 17:35:56', 'Refused'),
(13, 12, 'Member', 14, '2024-06-15 17:35:56', 'Pending'),
(14, 12, 'Member', 15, '2024-06-15 17:35:56', 'Pending'),
(20, 14, 'Member', 10, '2024-06-18 01:25:37', 'Accepted'),
(21, 16, 'Member', 9, '2024-06-18 14:26:55', 'Accepted'),
(22, 17, 'Member', 22, '2024-06-18 20:34:05', 'Accepted'),
(23, 18, 'Member', 9, '2024-06-18 21:17:04', 'Pending'),
(24, 18, 'Member', 8, '2024-06-18 21:17:04', 'Pending'),
(25, 18, 'Member', 10, '2024-06-18 21:17:04', 'Accepted'),
(26, 18, 'Member', 11, '2024-06-18 21:17:04', 'Pending'),
(27, 18, 'Member', 22, '2024-06-18 21:17:37', 'Accepted'),
(28, 19, 'Member', 22, '2024-06-18 21:34:56', 'Accepted'),
(29, 21, 'Member', 9, '2024-06-18 21:47:18', 'Pending'),
(30, 21, 'Member', 10, '2024-06-18 21:47:18', 'Accepted'),
(31, 21, 'Member', 22, '2024-06-18 21:47:18', 'Accepted'),
(32, 24, 'Member', 10, '2024-10-17 15:11:37', 'Accepted');

-- --------------------------------------------------------

--
-- Table structure for table `teammember`
--

CREATE TABLE `teammember` (
  `id` int(11) NOT NULL,
  `teamId` int(11) NOT NULL,
  `role` enum('Owner','Member','Editor','Admin') NOT NULL DEFAULT 'Member',
  `status` enum('Active','Banned') NOT NULL DEFAULT 'Active',
  `userId` int(11) NOT NULL,
  `joinedIn` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `teammember`
--

INSERT INTO `teammember` (`id`, `teamId`, `role`, `status`, `userId`, `joinedIn`) VALUES
(23, 12, 'Member', 'Active', 9, '2024-06-15 18:06:21'),
(24, 12, 'Member', 'Active', 11, '2024-06-15 18:06:37'),
(25, 12, 'Member', 'Active', 12, '2024-06-15 18:06:43'),
(26, 12, 'Member', 'Active', 13, '2024-06-15 18:06:48'),
(27, 12, 'Member', 'Active', 14, '2024-06-15 18:06:54'),
(28, 12, 'Member', 'Active', 15, '2024-06-15 18:07:00'),
(34, 14, 'Member', 'Active', 21, '2024-06-17 21:01:20'),
(35, 15, 'Member', 'Active', 21, '2024-06-18 01:26:05'),
(36, 16, 'Member', 'Active', 22, '2024-06-18 14:26:11'),
(37, 16, 'Owner', 'Active', 9, '2024-06-18 14:27:04'),
(38, 16, 'Member', 'Active', 8, '2024-06-18 14:33:03'),
(40, 16, 'Owner', 'Active', 11, '2024-06-18 14:33:19'),
(41, 16, 'Member', 'Active', 12, '2024-06-18 14:33:23'),
(42, 17, 'Member', 'Active', 9, '2024-06-18 20:33:53'),
(43, 17, 'Member', 'Active', 22, '2024-06-18 20:34:11'),
(44, 18, 'Member', 'Active', 23, '2024-06-18 21:16:54'),
(45, 18, 'Member', 'Active', 22, '2024-06-18 21:17:43'),
(46, 19, 'Member', 'Active', 24, '2024-06-18 21:34:48'),
(47, 19, 'Member', 'Active', 22, '2024-06-18 21:35:03'),
(48, 20, 'Member', 'Active', 25, '2024-06-18 21:43:38'),
(49, 21, 'Member', 'Active', 26, '2024-06-18 21:47:07'),
(50, 21, 'Member', 'Active', 22, '2024-06-18 21:49:05'),
(51, 16, 'Owner', 'Active', 26, '2024-06-18 21:49:38'),
(52, 18, 'Member', 'Active', 10, '2024-07-03 01:00:01'),
(54, 21, 'Member', 'Active', 10, '2024-07-03 01:00:01'),
(55, 18, 'Member', 'Active', 10, '2024-07-03 01:00:02'),
(56, 21, 'Member', 'Active', 10, '2024-07-03 01:00:02'),
(58, 23, 'Member', 'Active', 27, '2024-07-03 10:44:51'),
(59, 23, 'Member', 'Active', 8, '2024-07-03 10:47:00'),
(60, 23, 'Member', 'Active', 9, '2024-07-03 10:47:06'),
(61, 24, 'Member', 'Active', 29, '2024-10-17 15:10:06'),
(62, 24, 'Member', 'Active', 28, '2024-10-17 15:16:55'),
(64, 25, 'Member', 'Active', 10, '2024-10-18 10:54:41'),
(65, 24, 'Member', 'Active', 10, '2024-12-10 03:41:10');

-- --------------------------------------------------------

--
-- Table structure for table `teampermission`
--

CREATE TABLE `teampermission` (
  `id` int(11) NOT NULL,
  `whoCanDo` enum('Owner','Member','Editor','Admin') NOT NULL DEFAULT 'Member',
  `teamId` int(11) NOT NULL,
  `permissionId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `teampermission`
--

INSERT INTO `teampermission` (`id`, `whoCanDo`, `teamId`, `permissionId`) VALUES
(31, 'Owner', 16, 11),
(32, 'Member', 16, 16),
(33, 'Owner', 16, 16),
(34, 'Editor', 16, 16),
(35, 'Admin', 16, 16),
(36, 'Admin', 16, 17),
(37, 'Editor', 16, 17),
(38, 'Member', 16, 17),
(39, 'Owner', 16, 17),
(40, 'Editor', 16, 18),
(41, 'Owner', 16, 18),
(42, 'Member', 16, 18),
(43, 'Admin', 16, 18),
(44, 'Member', 16, 16),
(45, 'Owner', 16, 16),
(46, 'Admin', 16, 16),
(47, 'Editor', 16, 16),
(48, 'Member', 16, 17),
(49, 'Owner', 16, 17),
(50, 'Editor', 16, 17),
(51, 'Admin', 16, 17),
(52, 'Member', 16, 18),
(53, 'Editor', 16, 18),
(54, 'Owner', 16, 18),
(55, 'Admin', 16, 18),
(56, 'Member', 21, 4),
(57, 'Editor', 21, 4),
(58, 'Owner', 21, 4),
(59, 'Owner', 21, 3),
(60, 'Member', 21, 3),
(61, 'Admin', 21, 3),
(62, 'Member', 21, 2),
(63, 'Owner', 21, 2),
(64, 'Editor', 21, 2),
(65, 'Member', 21, 1),
(66, 'Owner', 21, 1),
(67, 'Admin', 21, 1),
(68, 'Owner', 22, 13),
(69, 'Member', 22, 14),
(70, 'Member', 22, 15),
(71, 'Owner', 22, 15),
(72, 'Admin', 22, 15),
(73, 'Member', 22, 15),
(74, 'Editor', 22, 15),
(75, 'Member', 22, 14),
(76, 'Owner', 22, 13),
(77, 'Owner', 22, 6),
(78, 'Admin', 22, 5),
(79, 'Admin', 23, 2),
(80, 'Member', 23, 2),
(81, 'Editor', 23, 2),
(82, 'Editor', 23, 4),
(83, 'Admin', 23, 3),
(84, 'Owner', 23, 3),
(85, 'Member', 23, 8),
(86, 'Member', 23, 7),
(87, 'Member', 23, 12),
(88, 'Member', 23, 10),
(89, 'Member', 23, 11),
(90, 'Member', 23, 9),
(91, 'Admin', 24, 4),
(92, 'Owner', 24, 4),
(93, 'Owner', 24, 3),
(94, 'Member', 24, 3),
(95, 'Editor', 24, 3),
(96, 'Admin', 24, 3);

-- --------------------------------------------------------

--
-- Table structure for table `teamproject`
--

CREATE TABLE `teamproject` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `github` text DEFAULT NULL,
  `url` text DEFAULT NULL,
  `notes` varchar(191) DEFAULT NULL,
  `teamId` int(11) NOT NULL,
  `ownerId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `teamproject`
--

INSERT INTO `teamproject` (`id`, `name`, `description`, `github`, `url`, `notes`, `teamId`, `ownerId`, `createdAt`, `updatedAt`) VALUES
(6, 'convex', 'this is facekbook clone in day 5 of learning programming asda das asd this is facekbook clone in day 5 of aslearning programming ad ads dd a asdthis is facekbook clone in day 5 of learning programming', 'https://www.facebook.com/', 'https://www.facebook.com/22', 'klhjf dsjkafh dksafgdhs ajkfgsadfh jkadsf\n', 12, 10, '2024-06-15 17:38:51', '2024-06-15 20:40:45.109'),
(7, 'social-media', 'this is facekbook clone in day 5 of learning programming', 'https://www.facebook.com/', 'https://www.facebook.com/22', 'this is facekbook clone in day 5 of learning programming\n', 12, 10, '2024-06-15 17:39:18', '2024-06-15 20:39:18.449'),
(8, 'blog-nestjs', 'sdathis is facekbook clone in day 5 of learning programmingds d', 'https://www.facebook.com/', 'https://www.facebook.com/22', 'this is facekbook clone in day 5 of learning programming', 12, 10, '2024-06-15 17:39:33', '2024-06-15 20:39:33.419'),
(9, 'youtube-clone', 'this is facekbook clone in day 5 of learning programming', 'https://www.facebook.com/', 'https://www.facebook.com/22', 'this is facekbook clone in day 5 of learning programming', 12, 10, '2024-06-15 17:39:59', '2024-06-15 20:39:59.095'),
(10, 'project-manager', 'this is facekbook clone in day 5 of learning programming', 'https://www.facebook.com/', 'https://www.facebook.com/22', 'this is facekbook clone in day 5 of learning programming', 12, 10, '2024-06-15 17:40:24', '2024-06-15 20:40:24.779'),
(11, 'valorant-website-clone', 'valorant-website-clone asdas d as v dsvalorant-website-clon dsafev dsfalorant-we dasfb sit e-clon ads valorant-website-clone  ', 'https://www.facebook.com/', 'https://www.facebook.com/22', ' valorant-website-clone asdas d as v dsvalorant-website-clon dsafev dsfalorant-we dasfb sit e-clon ads valorant-website-clone  ', 12, 10, '2024-06-15 17:45:49', '2024-06-15 20:45:49.517'),
(13, 'Abdelrhman Saber', 'mb-0.5 font-medium text-sm text-gray-200 items-center flex gap-4 p-2 px-4 ml-2 duration-300 rounded-md hover:bg-secondaryMain/10 transition-all', 'https://www.facebook.com/', 'https://www.facebook.com/22', 'mb-0.5 font-medium text-sm text-gray-200 items-center flex gap-4 p-2 px-4 ml-2 duration-300 rounded-md hover:bg-secondaryMain/10 transition-all', 14, 21, '2024-06-17 21:02:55', '2024-06-18 00:02:55.916'),
(14, 'Project number1', 'Project number1 this is project number one for spain fcb team', 'https://www.facebook.com/', 'https://www.facebook.com/22', 'Project number1 this is project number one for spain fcb team', 16, 22, '2024-06-18 14:28:00', '2024-06-18 17:28:00.772'),
(15, 'duex-project', 'duex- this iproject', 'https://www.facebook.com/', 'https://www.facebook.com/22', '', 16, 22, '2024-06-18 14:29:13', '2024-06-18 18:25:42.487'),
(16, 'software-tester', 'duexsof  tware- te ster project duex -projster djas dab asd', 'https://www.facebook.com/', 'https://www.facebook.com/22', '', 16, 22, '2024-06-18 14:29:51', '2024-06-18 18:25:33.463'),
(17, 'youtube-clone', 'wei sdafbjdsafjkdsa fj', 'https://www.facebook.com/', 'https://www.facebook.com/22', ' bdjfsdkajlfadsf\n', 16, 22, '2024-06-18 14:32:22', '2024-06-18 21:13:48.101'),
(18, 'facebook-clone-nextjs', 'facebook clone nextjs', 'https://github.com/asaber3030', 'https://github.com/asaber3030', '', 17, 9, '2024-06-18 20:35:07', '2024-06-18 23:35:07.632'),
(19, 'blog-reddit-js', 'facebook clone nextjs', 'https://github.com/asaber3030', 'https://github.com/asaber3030', 'facebook clone nextjs', 17, 9, '2024-06-18 20:35:27', '2024-06-18 23:35:27.341'),
(20, 'NewProject', 'NewProjectNewP  rojectNewProject ', 'https://www.facebook.com/', 'https://www.facebook.com/22', '', 20, 25, '2024-06-18 21:43:54', '2024-06-19 00:43:54.583'),
(21, 'convex', 'This is a project', 'https://www.facebook.com/', 'https://www.facebook.com/22', 'This is a project', 21, 26, '2024-06-18 21:47:50', '2024-06-19 00:47:50.414'),
(22, 'convex', 'asdfsdfsdfsdf', 'https://www.facebook.com/', 'https://www.facebook.com/22', 'sdfsdfsdfsdf', 24, 29, '2024-10-17 15:12:22', '2024-10-17 18:12:22.543');

-- --------------------------------------------------------

--
-- Table structure for table `teamprojectboards`
--

CREATE TABLE `teamprojectboards` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `backgroundColor` varchar(191) NOT NULL,
  `textColor` varchar(191) NOT NULL,
  `projectId` int(11) NOT NULL,
  `ownerId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `teamprojectboards`
--

INSERT INTO `teamprojectboards` (`id`, `title`, `description`, `backgroundColor`, `textColor`, `projectId`, `ownerId`, `createdAt`, `updatedAt`) VALUES
(3, 'This is a board', 'This is a board', '#E0FBFC', '#000000', 11, 10, '2024-06-15 17:48:56', '2024-06-15 20:51:14.924'),
(4, 'Hello this is board 2', 'Hello this is board 2', '#735290', '#dddddd', 11, 10, '2024-06-15 17:50:15', '2024-07-03 04:09:05.237'),
(5, 'setOpen(false)', 'setOpen(false)', '#293241', '#dddddd', 11, 10, '2024-06-15 17:50:44', '2024-07-03 04:09:10.690'),
(6, 'setOpen(false)asda sdas', 'setOpen( asd asfalse)sa da sd', '#98A886', '#000000', 11, 10, '2024-06-15 17:51:04', '2024-06-15 20:51:19.711'),
(8, 'New board', 'New board about homeaway', '#E0FBFC', '#000000', 17, 22, '2024-06-18 16:02:33', '2024-06-18 19:02:33.501'),
(9, 'New board', 'New board about homeaway', '#735290', '#dddddd', 17, 22, '2024-06-18 16:02:40', '2024-06-18 19:02:44.085'),
(10, 'New board about homeaway', 'New board about homeaway', '#98A886', '#000000', 16, 22, '2024-06-18 16:02:59', '2024-06-18 19:03:02.415'),
(11, 'New board about homeaway', 'New board about homeaway', '#98C1D9', '#000000', 16, 22, '2024-06-18 16:03:08', '2024-06-18 19:03:08.941'),
(12, 'New board about homeaway', 'New board about homeaway', '#C4A69D', '#000000', 16, 22, '2024-06-18 16:03:14', '2024-06-18 19:03:14.198'),
(13, 'New board about homeaway', 'New board about homeaway', '#735290', '#dddddd', 15, 22, '2024-06-18 16:03:25', '2024-06-18 19:03:25.434'),
(14, 'New board about homeaway', 'New board about homeaway', '#C4A69D', '#000000', 15, 22, '2024-06-18 16:03:29', '2024-06-18 19:03:29.491'),
(15, 'New board about homeaway', 'New board about homeaway', '#98C1D9', '#000000', 15, 22, '2024-06-18 16:03:33', '2024-06-18 19:03:33.527'),
(16, 'New board about homeaway', 'New board about homeaway', '#E0FBFC', '#000000', 15, 22, '2024-06-18 16:03:36', '2024-06-18 19:03:36.985'),
(17, 'New board about homeaway', 'New board about homeaway', '#363457', '#dddddd', 15, 22, '2024-06-18 16:03:42', '2024-06-18 19:03:46.296'),
(18, 'New board about homeaway', 'New board about homeaway', '#363457', '#dddddd', 14, 22, '2024-06-18 16:04:10', '2024-06-18 19:04:17.570'),
(19, 'New board about homeaway', 'New board about homeaway', '#98C1D9', '#000000', 14, 22, '2024-06-18 16:04:14', '2024-06-18 19:12:08.148'),
(20, 'New board about homeaway', 'New board aboutNew board about hy', '#98A886', '#000000', 14, 22, '2024-06-18 16:04:20', '2024-06-18 19:04:26.750'),
(21, 'asdasd', 'asdasdasdasd', '#735290', '#dddddd', 17, 9, '2024-06-18 16:13:15', '2024-06-18 19:13:15.608'),
(22, 'asdasd', 'asdasdasdasdasdasd', '#293241', '#dddddd', 17, 9, '2024-06-18 16:13:21', '2024-06-18 19:13:21.564'),
(23, 'New board', 'New boardNew board', '#293241', '#dddddd', 17, 22, '2024-06-18 21:50:07', '2024-06-19 00:50:07.977'),
(24, 'HELLO ', 'SDFDAFASFSDF', '#293241', '#dddddd', 22, 29, '2024-10-17 15:13:00', '2024-10-17 18:13:00.155');

-- --------------------------------------------------------

--
-- Table structure for table `teamprojecttasks`
--

CREATE TABLE `teamprojecttasks` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `url` text DEFAULT NULL,
  `notes` varchar(191) DEFAULT NULL,
  `status` enum('Pending','Accepted','Refused') NOT NULL DEFAULT 'Pending',
  `projectId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `finishAt` date NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `teamprojecttasks`
--

INSERT INTO `teamprojecttasks` (`id`, `title`, `description`, `url`, `notes`, `status`, `projectId`, `userId`, `createdAt`, `finishAt`, `updatedAt`) VALUES
(38, 'Task', 'tasdajkshd jkashd ajksdh asdghasdkj', '', '', 'Pending', 17, 22, '2024-06-18 16:25:30', '2024-06-28', '2024-06-18 19:25:30.111'),
(39, 'Task', 'tasdajkshd jkashd ajksdh asdghasdkj', '', '', 'Pending', 17, 9, '2024-06-18 16:25:30', '2024-06-28', '2024-06-18 19:25:30.111'),
(40, 'Task', 'tasdajkshd jkashd ajksdh asdghasdkj', '', '', 'Pending', 17, 12, '2024-06-18 16:25:30', '2024-06-28', '2024-06-18 19:25:30.111'),
(41, 'Task', 'tasdajkshd jkashd ajksdh asdghasdkj', '', '', 'Pending', 17, 11, '2024-06-18 16:25:30', '2024-06-28', '2024-06-18 19:25:30.111'),
(42, 'Task', 'tasdajkshd jkashd ajksdh asdghasdkj', '', '', 'Pending', 17, 10, '2024-06-18 16:25:30', '2024-06-28', '2024-06-18 19:25:30.111'),
(43, 'Task', 'tasdajkshd jkashd ajksdh asdghasdkj', '', '', 'Pending', 17, 8, '2024-06-18 16:25:30', '2024-06-28', '2024-06-18 19:25:30.111'),
(44, 'taskas djfaksldhasjkl', ' dsfasf dasf sdl;jflkadshfljkads f', 'https://www.facebook.com/22', 'project new updated ecommerce', 'Accepted', 17, 11, '2024-06-18 16:26:20', '2024-08-23', '2024-06-18 19:26:20.952'),
(45, 'taskas djfaksldhasjkl', ' dsfasf dasf sdl;jflkadshfljkads f', 'https://www.facebook.com/22', 'project new updated ecommerce', 'Accepted', 17, 9, '2024-06-18 16:26:20', '2024-08-23', '2024-06-18 19:26:20.951'),
(46, 'taskas djfaksldhasjkl', ' dsfasf dasf sdl;jflkadshfljkads f', 'https://www.facebook.com/22', 'project new updated ecommerce', 'Accepted', 17, 26, '2024-06-18 16:26:20', '2024-08-23', '2024-06-19 00:49:55.924'),
(47, 'anohter title goes here', ' dsfasf dasf sdl;jflkadshfljkads f', 'https://www.facebook.com/22', 'project new updated ecommerce', 'Accepted', 17, 12, '2024-06-18 16:26:20', '2024-08-23', '2024-06-18 19:26:35.722'),
(48, 'Do sidebar #1', 'Do sidebar #1Do sidebar #1 sa ds Do sidebar #1', '', '', 'Refused', 19, 22, '2024-06-18 20:35:57', '2024-06-20', '2024-06-19 00:52:06.822'),
(49, 'Do Navbar', 'Do Navbar asd asd as dsvDo Navbar', '', '', 'Accepted', 19, 9, '2024-06-18 20:36:14', '2024-06-20', '2024-06-19 00:51:59.766'),
(50, 'Do pages responsive designs', 'Do pages responsive designs', '', '', 'Pending', 19, 22, '2024-06-18 20:36:30', '2024-06-27', '2024-06-18 23:36:30.129'),
(51, 'Thjis is task title', 'project new updated ecommerce', 'https://www.facebook.com/22', 'project new updated ecommerce', 'Pending', 21, 26, '2024-06-18 21:48:15', '2024-06-19', '2024-06-19 00:48:15.273'),
(53, 'ASDASD', 'DASDASDASDASDASDASD', 'https://www.facebook.com/22', 'ASDASDASD', 'Refused', 11, 14, '2024-07-03 01:08:52', '2024-07-03', '2024-07-03 04:08:52.670'),
(54, 'hELLO ', 'ASDASDASASDASDAS D', 'https://www.facebook.com/22', 'project new updated ecommerce', 'Pending', 22, 29, '2024-10-17 15:13:35', '2024-10-18', '2024-10-17 18:13:35.452');

-- --------------------------------------------------------

--
-- Table structure for table `teamtaskreply`
--

CREATE TABLE `teamtaskreply` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `url` text DEFAULT NULL,
  `taskId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `teamtaskreply`
--

INSERT INTO `teamtaskreply` (`id`, `title`, `description`, `url`, `taskId`, `userId`, `createdAt`, `updatedAt`) VALUES
(7, 'This is new title', 'this is new desc\n', '', 46, 22, '2024-06-18 18:14:39', '2024-06-18 21:14:39.924'),
(8, 'Adding new reply', 'Adding new reply', '', 48, 22, '2024-06-18 21:51:03', '2024-06-19 00:51:03.956'),
(9, ';jdlkf', 'ksdfjshdfjksd', 'khjdsjwkfhdskj', 42, 10, '2024-10-18 10:53:54', '2024-10-18 13:53:54.577');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `provider` longtext NOT NULL DEFAULT '',
  `username` varchar(191) NOT NULL,
  `displayName` varchar(191) DEFAULT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `jobTitle` varchar(191) NOT NULL,
  `photo` longtext NOT NULL DEFAULT '/images/user-svg.svg',
  `phone` int(11) DEFAULT NULL,
  `city` varchar(191) DEFAULT NULL,
  `directCode` varchar(191) NOT NULL,
  `bgCover` longtext DEFAULT NULL,
  `planId` int(11) NOT NULL DEFAULT 3,
  `allowUsingDirectCode` tinyint(1) NOT NULL DEFAULT 1,
  `private` tinyint(1) NOT NULL DEFAULT 0,
  `showDetails` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime(3) NOT NULL,
  `showPersonalCounts` tinyint(1) NOT NULL DEFAULT 1,
  `showPersonalProjects` tinyint(1) NOT NULL DEFAULT 1,
  `showJoinedTeams` tinyint(1) NOT NULL DEFAULT 1,
  `showPersonalTeams` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `provider`, `username`, `displayName`, `name`, `email`, `password`, `jobTitle`, `photo`, `phone`, `city`, `directCode`, `bgCover`, `planId`, `allowUsingDirectCode`, `private`, `showDetails`, `createdAt`, `updatedAt`, `showPersonalCounts`, `showPersonalProjects`, `showJoinedTeams`, `showPersonalTeams`) VALUES
(8, '8', 'abdo', 'Abdulrahman', 'Abdulrahman', 'a@a.com', '$2b$10$8DWq58d4R9Guvr34GcpR8Op9FZHtpYdi6/1iJ0iro02kdVFqYCYVu', 'Full Stack Web Developer', 'https://firebasestorage.googleapis.com/v0/b/project-managment-app-425ca.appspot.com/o/user-pictures%2F213c7a36-94fe-4bbc-a6f4-668347b9ba45?alt=media&token=0ff41c6c-9264-4606-b332-6f3cffdb8df5', NULL, NULL, 'RZSf2OOU', 'https://firebasestorage.googleapis.com/v0/b/project-managment-app-425ca.appspot.com/o/user-pictures%2F0b363884-4a5b-4114-b995-5616eba6557c?alt=media&token=7b6c812b-fc37-4de9-9b4b-7e81150c7652', 2, 1, 0, 1, '2024-06-01 17:36:08', '2024-10-13 15:51:50.156', 1, 0, 1, 1),
(9, '9', 'yasser25', 'Yasser Mohamed', 'Yasser Mohamed', 'yasser@a.com', '$2b$10$1mB4E5VEzaSQZNV8lGxsFu14hiByqM1eCDiLn0bZFe6lwth5gPF32', 'Full Stack Web Developer', '/avatars/05.svg', NULL, NULL, 'dd66030a-1127-4064-b544-81b37ec08954', NULL, 3, 1, 0, 1, '2024-06-01 17:39:48', '2024-10-18 13:56:56.338', 1, 1, 1, 1),
(10, '10', 'asaber3030', 'Abdulrahman', 'Abdulrahman', 'abdulrahmansaber120@gmail.com', '$2b$10$G9.gBfUnB9jhpZc8MIZjOemHmB8d2Nsiv3pMbYUYYP33WePXDZys2', 'Full Stack Web Developer', 'https://firebasestorage.googleapis.com/v0/b/project-managment-app-425ca.appspot.com/o/user-pictures%2F654bb0a2-5d92-4ecc-a5c6-b54b801d7d7e?alt=media&token=0a4a5b16-3aae-44c6-b996-748e04e6370a', NULL, NULL, 'pGlwHUtd', 'https://firebasestorage.googleapis.com/v0/b/project-managment-app-425ca.appspot.com/o/user-pictures%2Fd9590c8e-a2e9-4a6a-8068-fbb3ec8a8276?alt=media&token=fb459b4d-4ea7-4c2c-ad6b-69505e24101f', 3, 0, 0, 0, '2024-06-05 02:09:47', '2024-12-10 05:49:39.213', 1, 1, 1, 1),
(11, '8', 'khaled', 'Khaled Tamer', 'Khaled Tamer', 'khaled@a.com', '$2b$10$8DWq58d4R9Guvr34GcpR8Op9FZHtpYdi6/1iJ0iro02kdVFqYCYVu', 'DevOps', '/avatars/01.svg', NULL, 'Egypt', 'RZSf2asd', 'https://firebasestorage.googleapis.com/v0/b/project-managment-app-425ca.appspot.com/o/user-pictures%2F0b363884-4a5b-4114-b995-5616eba6557c?alt=media&token=7b6c812b-fc37-4de9-9b4b-7e81150c7652', 3, 1, 1, 1, '2024-06-01 17:36:08', '2024-06-04 23:47:23.063', 1, 1, 1, 1),
(12, '9', 'yarasayed', 'Yara Sayed', 'Yara Sayed', 'yara@a.com', '$2b$10$1mB4E5VEzaSQZNV8lGxsFu14hiByqM1eCDiLn0bZFe6lwth5gPF32', 'Front-End Developer', '/avatars/08.svg', NULL, NULL, 'dd66030a-1127-4064-b544-81b37ec0asd4', NULL, 3, 1, 0, 1, '2024-06-01 17:39:48', '2024-06-01 20:41:17.069', 1, 1, 1, 1),
(13, '10', 'baymoni', 'Baymoni T', 'Baymoni T', 'baymoni.t@gmail.com', '$2b$10$G9.gBfUnB9jhpZc8MIZjOemHmB8d2Nsiv3pMbYUYYP33WePXDZys2', 'Linux Admin', '/avatars/02.svg', NULL, NULL, '4f81364f-28c4-9999-b599-52075ac20be3', 'https://firebasestorage.googleapis.com/v0/b/project-managment-app-425ca.appspot.com/o/user-pictures%2F2e5ed37e-bb73-41b6-9e5b-11fe2d5f1bbb?alt=media&token=f5ca72c1-1695-42cb-a888-4967f795cbb7', 3, 1, 0, 1, '2024-06-05 02:09:47', '2024-06-05 05:24:23.086', 1, 1, 1, 1),
(14, '8', 'ibrahim', 'Ibrahim Ragy', 'Ibrahim Ragy', 'igr@a.com', '$2b$10$8DWq58d4R9Guvr34GcpR8Op9FZHtpYdi6/1iJ0iro02kdVFqYCYVu', 'Doctor', '/avatars/07.svg', NULL, 'Egypt', 'RZS222f2asd', 'https://firebasestorage.googleapis.com/v0/b/project-managment-app-425ca.appspot.com/o/user-pictures%2F0b363884-4a5b-4114-b995-5616eba6557c?alt=media&token=7b6c812b-fc37-4de9-9b4b-7e81150c7652', 3, 1, 1, 1, '2024-06-01 17:36:08', '2024-06-04 23:47:23.063', 1, 1, 1, 1),
(15, '9', 'yoru_h', 'Yoru main', 'Yoru main', 'yoru111@a.com', '$2b$10$1mB4E5VEzaSQZNV8lGxsFu14hiByqM1eCDiLn0bZFe6lwth5gPF32', 'Front-End Developer', '/avatars/06.svg', NULL, NULL, 'yoru-1127-4064-b544-81b37ec0asd4', NULL, 3, 1, 0, 1, '2024-06-01 17:39:48', '2024-06-01 20:41:17.069', 1, 1, 1, 1),
(16, '10', 'tarek_fathalla', 'Tarek fathalla', 'Tarek fathalla', 'tarek.fathalla@gmail.com', '$2b$10$G9.gBfUnB9jhpZc8MIZjOemHmB8d2Nsiv3pMbYUYYP33WePXDZys2', 'Data Scienctist & AI', '/avatars/03.svg', NULL, NULL, '4f81364f888-28c4-9999-b599-52075ac20be3', 'https://firebasestorage.googleapis.com/v0/b/project-managment-app-425ca.appspot.com/o/user-pictures%2F2e5ed37e-bb73-41b6-9e5b-11fe2d5f1bbb?alt=media&token=f5ca72c1-1695-42cb-a888-4967f795cbb7', 3, 1, 0, 1, '2024-06-05 02:09:47', '2024-06-05 05:24:23.086', 1, 1, 1, 1),
(17, '17', 'salah20', 'Salah', 'Salah', 'salah@a.com', '$2b$10$KXcSBl7u6aWDp7mwZTspru7EkF81ECGkitqCa2HM84WszZx2TqZOy', 'Full Stack Web Developer', '/avatars/05.svg', NULL, NULL, '0b4098fd-a50a-4962-987b-c2a8399d976e', 'https://firebasestorage.googleapis.com/v0/b/project-managment-app-425ca.appspot.com/o/user-pictures%2F52f5eb7a-3dd5-430d-83cf-fc17a509c368?alt=media&token=7b9c3995-9797-48bc-a065-ea54b6559472', 3, 1, 0, 1, '2024-06-12 21:38:08', '2024-06-13 00:41:49.884', 1, 1, 1, 1),
(18, '18', 'fatma22', 'Tasneem', 'Tasneem', 'fatma22@a.com', '$2b$10$JN0DtSwufg7/Pl98SA.zsezilV3i7MsAV.Va1UYyD324rHkzFMQ5e', 'DevOps Developer', '/avatars/06.svg', NULL, NULL, 'c375d064-8071-4e98-a33c-7eddd1de2e65', NULL, 1, 1, 0, 1, '2024-06-13 09:27:40', '2024-06-13 12:28:03.464', 1, 1, 1, 1),
(19, '19', 'khaled88', 'khaled88', 'khaled88', 'khaled88@a.com', '$2b$10$GiZhPR63p4UchaTmgOznWO4dO.kKh0Tz7sURQVoKbrNVbdvCSGvDm', 'Full Stack Web Developer', '/avatars/06.svg', NULL, NULL, 'febb0149-63f0-4cec-a109-c4f26b4774a2', NULL, 3, 1, 0, 1, '2024-06-13 09:29:23', '2024-06-13 12:29:47.699', 1, 1, 1, 1),
(21, '21', 'saber22', 'Saber', 'Saber', 'saber22@a.com', '$2b$10$PYUzmcx0KI/1rR3Zl47uC.QVaCTGVp871AB2ffwZmzPL0gR7wNFOK', 'Full Stack Web Developer', 'https://firebasestorage.googleapis.com/v0/b/project-managment-app-425ca.appspot.com/o/user-pictures%2Fb9aecb69-6439-4fa2-b9b8-b3726850ec2e?alt=media&token=370f2dae-adb4-440f-8f4d-59a8cb9fb740', NULL, NULL, 'TOVnhxG7', 'https://firebasestorage.googleapis.com/v0/b/project-managment-app-425ca.appspot.com/o/user-pictures%2F214bf3b1-8212-4e80-a315-81f3155b3ca8?alt=media&token=13591171-8706-4947-af1f-35695bfbdae6', 2, 0, 0, 0, '2024-06-17 18:29:17', '2024-06-18 04:29:10.946', 1, 0, 1, 1),
(22, '22', 'malek99', 'Malek Ibrahim', 'Malek Ibrahim', 'malek@a.com', '$2b$10$f5FZLLBBJlfBXHuqpi4KWOEI2cxWgqAXZqop1Wxd9vheN4Os6JKLq', 'Full Stack Web Developer', 'https://firebasestorage.googleapis.com/v0/b/project-managment-app-425ca.appspot.com/o/user-pictures%2F58f7946d-d091-483a-bcb3-76dd4e84f3c4?alt=media&token=97bd6629-ace6-4f28-87d1-c5fc0e488f54', NULL, NULL, 'ebaec7bf-3f45-4060-b2ff-d612dde221e7', 'https://firebasestorage.googleapis.com/v0/b/project-managment-app-425ca.appspot.com/o/user-pictures%2F43aab43b-9812-4f53-b064-7af1b135354e?alt=media&token=d25be209-45dc-427a-b322-89b105ac5dd7', 3, 1, 0, 1, '2024-06-18 14:24:38', '2024-06-19 00:32:52.752', 1, 1, 1, 1),
(23, '23', 'khaled22', 'Khaled', 'Khaled', 'khaled2200@a.com', '$2b$10$.PESz0xP8pxlVCcKxEhi8uQap00OoMbJqZK2.qitp2rer2nekSX4y', 'DevOps', '/avatars/07.svg', NULL, NULL, '222f9e2d-5b37-4ff2-88f3-db46d52c29c1', NULL, 3, 1, 0, 1, '2024-06-18 21:16:29', '2024-06-19 00:16:45.878', 1, 1, 1, 1),
(24, '24', 'yoru80', 'yoru80', 'yoru80', 'yoru80@a.com', '$2b$10$DDaVlmSFkDRc3aj4eEUnR.hKOv3v2S4MX3zNdLtU01YULW.U2Zwiy', 'Full Stack Web Developer', '/avatars/08.svg', NULL, NULL, '17607c96-5e60-4262-aa8e-ef53c3340be1', NULL, 3, 1, 0, 1, '2024-06-18 21:34:25', '2024-06-19 00:34:43.630', 1, 1, 1, 1),
(25, '25', 'waleed', 'Waleed', 'Waleed', 'waleed@a.com', '$2b$10$XhJ6ueNR8EiZgLf.J0nWzuLlEEDPRU5.0p59upGeD9t9iOOtihKDO', 'Full Stack Web Developer', '/avatars/04.svg', NULL, NULL, 'bf3548dd-bb25-4304-b276-f4ada6ea134e', NULL, 3, 1, 0, 1, '2024-06-18 21:43:01', '2024-06-19 00:43:21.679', 1, 1, 1, 1),
(26, '26', 'yassien', 'yassien', 'yassien', 'yassien@a.com', '$2b$10$u9tGZE54P.TRm9osCnYYXOKfgazaWco/2k4MF/k1NmOmyEn2j.bAC', 'Full Stack Web Developer', '/avatars/06.svg', NULL, NULL, '86cf7606-9367-4f70-8b34-0ecf2ebcf877', NULL, 3, 1, 0, 1, '2024-06-18 21:46:38', '2024-06-19 00:46:55.300', 1, 1, 1, 1),
(27, '27', 'yasser99', 'Abdulrahman', 'Abdulrahman', 'yasser99@a.com', '$2b$10$QvLWN98813vUibSyS0XKeevCa0ciVorppgc0VPvfuC0IifDNnQe4q', 'Full Stack Web Developer', '/avatars/01.svg', NULL, NULL, '50a319b4-ee52-437e-94af-1d7988586208', NULL, 3, 1, 0, 1, '2024-07-03 10:43:06', '2024-07-03 13:43:39.447', 1, 1, 1, 1),
(28, '28', 'abdouuu', 'Abdulrahman', 'Abdulrahman', 'u@a.com', '$2b$10$9kiww9Qndrihj22y1dUMPOrleQu3IO8caT300l0qs0rXfsAipA7eK', 'Full Stack Web Developer', 'https://firebasestorage.googleapis.com/v0/b/project-managment-app-425ca.appspot.com/o/user-pictures%2F76861e66-5f24-42de-a7a3-9ceccd4a1c95?alt=media&token=774bcd2d-cd4c-4f3d-b302-7772fd77ba22', NULL, NULL, '07616afe-780a-4183-b122-b9ee83c0dc52', 'https://firebasestorage.googleapis.com/v0/b/project-managment-app-425ca.appspot.com/o/user-pictures%2Fe99c4c82-1c2f-45a0-9518-9aa1247f42a2?alt=media&token=d4ce99d2-cf7c-41b2-a1a5-4a665c2e1950', 3, 1, 0, 1, '2024-10-10 05:26:17', '2024-10-10 10:09:17.841', 1, 1, 1, 1),
(29, '29', 'mostafa22', 'Mostafa', 'Mostafa', 'mostafa22@a.com', '$2b$10$vvHO6f/N6uKtCIXhYEwQuuYgdxLCbodSy1qE7yhk1fNqkR4jYBMdW', 'Full Stack Web Developer', '/avatars/07.svg', NULL, NULL, '54894989-e232-4fb0-9265-352b3e949332', NULL, 3, 1, 0, 1, '2024-10-17 15:08:51', '2024-10-17 18:09:24.278', 1, 1, 1, 1),
(30, '30', 'yyeyye', 'uyeea', 'uyeea', 'a995500@a.com', '$2b$10$NKe00ev1MEJgQiE54zutzO/vkBd375rLamvPTCFqRaP3kitaajRu2', 'Full Stack Web Developer', '/avatars/02.svg', NULL, NULL, '1f725262-a626-4ab9-80f9-4ccdba08c20a', NULL, 1, 1, 0, 1, '2024-10-18 10:38:19', '2024-10-18 13:39:03.665', 1, 1, 1, 1),
(31, '', 'abdonas', 'Abdulrahman', 'Abdulrahman', 'nasr@a.com', '$2b$10$oR7MN8yKcI1l6OqMZHVPXOqlZSAxHr2CQ3keVTu6wqk3BNfQp/DG.', 'Full Stack Web Developer', '/avatars/03.svg', NULL, NULL, '79a57758-0c14-4a0b-8fe6-c2607c85b58d', NULL, 3, 1, 0, 1, '2024-10-18 10:48:26', '2024-10-18 13:48:26.313', 1, 1, 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Notification_userId_fkey` (`userId`);

--
-- Indexes for table `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Permission_name_key` (`name`);

--
-- Indexes for table `plan`
--
ALTER TABLE `plan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `planfeature`
--
ALTER TABLE `planfeature`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PlanFeature_planId_fkey` (`planId`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Project_ownerId_fkey` (`ownerId`);

--
-- Indexes for table `subscription`
--
ALTER TABLE `subscription`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Subscription_planId_fkey` (`planId`),
  ADD KEY `Subscription_userId_fkey` (`userId`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Task_ownerId_fkey` (`ownerId`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Team_ownerId_fkey` (`ownerId`);

--
-- Indexes for table `teaminvite`
--
ALTER TABLE `teaminvite`
  ADD PRIMARY KEY (`id`),
  ADD KEY `TeamInvite_teamId_fkey` (`teamId`),
  ADD KEY `TeamInvite_userId_fkey` (`userId`);

--
-- Indexes for table `teammember`
--
ALTER TABLE `teammember`
  ADD PRIMARY KEY (`id`),
  ADD KEY `TeamMember_teamId_fkey` (`teamId`),
  ADD KEY `TeamMember_userId_fkey` (`userId`);

--
-- Indexes for table `teampermission`
--
ALTER TABLE `teampermission`
  ADD PRIMARY KEY (`id`),
  ADD KEY `TeamPermission_permissionId_fkey` (`permissionId`),
  ADD KEY `TeamPermission_teamId_fkey` (`teamId`);

--
-- Indexes for table `teamproject`
--
ALTER TABLE `teamproject`
  ADD PRIMARY KEY (`id`),
  ADD KEY `TeamProject_teamId_fkey` (`teamId`),
  ADD KEY `TeamProject_ownerId_fkey` (`ownerId`);

--
-- Indexes for table `teamprojectboards`
--
ALTER TABLE `teamprojectboards`
  ADD PRIMARY KEY (`id`),
  ADD KEY `TeamProjectBoards_ownerId_fkey` (`ownerId`),
  ADD KEY `TeamProjectBoards_projectId_fkey` (`projectId`);

--
-- Indexes for table `teamprojecttasks`
--
ALTER TABLE `teamprojecttasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `TeamProjectTasks_projectId_fkey` (`projectId`),
  ADD KEY `TeamProjectTasks_userId_fkey` (`userId`);

--
-- Indexes for table `teamtaskreply`
--
ALTER TABLE `teamtaskreply`
  ADD PRIMARY KEY (`id`),
  ADD KEY `TeamTaskReply_taskId_fkey` (`taskId`),
  ADD KEY `TeamTaskReply_userId_fkey` (`userId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_username_key` (`username`),
  ADD UNIQUE KEY `User_email_key` (`email`),
  ADD UNIQUE KEY `User_directCode_key` (`directCode`),
  ADD KEY `User_planId_fkey` (`planId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=166;

--
-- AUTO_INCREMENT for table `permission`
--
ALTER TABLE `permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `plan`
--
ALTER TABLE `plan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `planfeature`
--
ALTER TABLE `planfeature`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `subscription`
--
ALTER TABLE `subscription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `team`
--
ALTER TABLE `team`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `teaminvite`
--
ALTER TABLE `teaminvite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `teammember`
--
ALTER TABLE `teammember`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `teampermission`
--
ALTER TABLE `teampermission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT for table `teamproject`
--
ALTER TABLE `teamproject`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `teamprojectboards`
--
ALTER TABLE `teamprojectboards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `teamprojecttasks`
--
ALTER TABLE `teamprojecttasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `teamtaskreply`
--
ALTER TABLE `teamtaskreply`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `planfeature`
--
ALTER TABLE `planfeature`
  ADD CONSTRAINT `PlanFeature_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `plan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `Project_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subscription`
--
ALTER TABLE `subscription`
  ADD CONSTRAINT `Subscription_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `plan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Subscription_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `Task_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `team`
--
ALTER TABLE `team`
  ADD CONSTRAINT `Team_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teaminvite`
--
ALTER TABLE `teaminvite`
  ADD CONSTRAINT `TeamInvite_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `team` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `TeamInvite_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teammember`
--
ALTER TABLE `teammember`
  ADD CONSTRAINT `TeamMember_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `team` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `TeamMember_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teampermission`
--
ALTER TABLE `teampermission`
  ADD CONSTRAINT `TeamPermission_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `permission` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `TeamPermission_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `team` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teamproject`
--
ALTER TABLE `teamproject`
  ADD CONSTRAINT `TeamProject_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `TeamProject_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `team` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teamprojectboards`
--
ALTER TABLE `teamprojectboards`
  ADD CONSTRAINT `TeamProjectBoards_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `TeamProjectBoards_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `teamproject` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teamprojecttasks`
--
ALTER TABLE `teamprojecttasks`
  ADD CONSTRAINT `TeamProjectTasks_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `teamproject` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `TeamProjectTasks_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teamtaskreply`
--
ALTER TABLE `teamtaskreply`
  ADD CONSTRAINT `TeamTaskReply_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `teamprojecttasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `TeamTaskReply_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `User_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `plan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
