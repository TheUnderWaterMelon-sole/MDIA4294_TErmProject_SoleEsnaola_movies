-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jul 24, 2025 at 11:03 PM
-- Server version: 5.7.39
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movies`
--

-- --------------------------------------------------------

--
-- Table structure for table `movie_info`
--

CREATE TABLE `movie_info` (
  `id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `director` varchar(255) DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `movie_info`
--

INSERT INTO `movie_info` (`id`, `movie_id`, `director`, `genre`, `description`) VALUES
(1, 1, 'Quentin Tarantino', 'Crime', 'Quentin Tarantino’s nonlinear crime masterpiece weaves interconnected stories of hitmen (John Travolta and Samuel L. Jackson), a boxer (Bruce Willis), and a mob boss’s wife (Uma Thurman). Filled with sharp dialogue, dark humor, and shocking violence, Pulp Fiction redefined modern cinema with its stylish direction and unpredictable storytelling.'),
(2, 2, 'Lana and Lilly Wachowski (The Wachowski Brothers)', 'Action', 'A cyberpunk action film directed by the Wachowskis, The Matrix follows Neo (Keanu Reeves), a computer hacker who discovers that reality is a simulated world controlled by machines. With the help of rebels led by Morpheus (Laurence Fishburne), Neo learns to bend the rules of the Matrix and fights against the machines in a mind-bending battle between illusion and truth. The film revolutionized action cinema with its groundbreaking visual effects and philosophical themes.'),
(3, 3, 'Jonathan Demme', 'Thriller', 'A psychological thriller featuring Jodie Foster as Clarice Starling, an FBI trainee who must seek the help of imprisoned cannibalistic serial killer Hannibal Lecter (Anthony Hopkins) to catch another murderer, Buffalo Bill. The film is a chilling cat-and-mouse game, blending horror and crime elements while delivering unforgettable performances, particularly Hopkins’ eerie portrayal of Lecter.'),
(4, 4, 'Amy Heckerling', 'Comedy', 'A modern adaptation of Jane Austen’s Emma, Clueless stars Alicia Silverstone as Cher, a wealthy, fashion-obsessed Beverly Hills teen who plays matchmaker for her friends and teachers. The film is a witty, satirical take on high school life in the \'90s, filled with iconic one-liners, colorful outfits, and a surprisingly heartfelt message about self-discovery.'),
(5, 5, 'Gus Van Sant', 'Drama', 'This emotional drama stars Matt Damon as Will Hunting, a janitor at MIT with an extraordinary gift for mathematics. After solving an impossible problem, he’s mentored by a psychologist (Robin Williams) who helps him confront his troubled past and realize his potential. The film explores themes of genius, trauma, and self-worth, with powerful performances and a heartfelt script by Damon and Ben Affleck.'),
(6, 6, ' Luc Besson', 'Drama', 'Léon is an Italian-American hitman (or \"cleaner\", as he refers to himself) working for a mafioso named \"Old Tony\" in the Little Italy neighborhood of New York City. One day, Léon meets Mathilda Lando, a lonely twelve-year-old who lives with her dysfunctional family in an apartment down the hall from Léon and has stopped attending class at her school for troubled girls.');

-- --------------------------------------------------------

--
-- Table structure for table `movie_title`
--

CREATE TABLE `movie_title` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `movie_title`
--

INSERT INTO `movie_title` (`id`, `title`, `filename`, `image`) VALUES
(1, 'Pulp Fiction', NULL, 'PulpFiction.jpg'),
(2, 'The Matrix', NULL, 'TheMatrix.jpeg'),
(3, 'The Silence of the Lambs', NULL, 'SilenceLambs.jpg'),
(4, 'Clueless', NULL, 'Clueless.jpg'),
(5, 'Good Will Hunting', NULL, 'Good_Will_Hunting.png'),
(6, 'Leon: The Professional', NULL, '1753393406086-Leon.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `movie_info`
--
ALTER TABLE `movie_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `movie_id` (`movie_id`);

--
-- Indexes for table `movie_title`
--
ALTER TABLE `movie_title`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `movie_info`
--
ALTER TABLE `movie_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `movie_title`
--
ALTER TABLE `movie_title`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `movie_info`
--
ALTER TABLE `movie_info`
  ADD CONSTRAINT `movie_info_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movie_title` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
