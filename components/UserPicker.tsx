"use client";
import React, { useState } from "react";

const RandomAssignment = () => {
	const users: string[] = ["Zadek", "Tomek", "Marek", "Pioter", "Przemysław"];
	const leagues: Record<string, string[]> = {
		liga1: ["Brazylia", "Francja", "Niemcy", "Anglia", "Holandia"],
		liga2: ["Portugalia", "Włochy", "Hiszpania", "Belgia", "Argentyna"],
		liga3: ["Urugwaj", "Chorwacja", "Polska", "Austria", "Maroko"],
	};

	const [selectedLeague, setSelectedLeague] = useState<string>("");
	const [randomAssignments, setRandomAssignments] = useState<
		Record<string, string>
	>(
		users.reduce((acc, user) => {
			acc[user] = "";
			return acc;
		}, {} as Record<string, string>)
	);

	const handleLeagueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedLeague = event.target.value;
		setSelectedLeague(selectedLeague);
	};

	const handleRandomize = () => {
		if (selectedLeague) {
			const shuffledTeams = [...leagues[selectedLeague]];
			// Shuffle the teams randomly
			for (let i = shuffledTeams.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[shuffledTeams[i], shuffledTeams[j]] = [
					shuffledTeams[j],
					shuffledTeams[i],
				];
			}

			const newRandomAssignments = users.reduce((acc, user, index) => {
				acc[user] = shuffledTeams[index];
				return acc;
			}, {} as Record<string, string>);

			setRandomAssignments(newRandomAssignments);
		}
	};

	return (
		<div>
			<div>
				<select
					className="p-4 bg-gray-200 rounded-md"
					onChange={handleLeagueChange}
					value={selectedLeague}
				>
					<option value="">Wybierz</option>
					{Object.keys(leagues).map(league => (
						<option key={league} value={league}>
							{league}
						</option>
					))}
				</select>
				<button onClick={handleRandomize} disabled={!selectedLeague}>
					Losuj
				</button>
			</div>
			<div>
				<ul>
					{users.map(user => (
						<li key={user}>
							{user} - {randomAssignments[user]}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default RandomAssignment;
