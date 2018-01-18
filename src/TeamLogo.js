// Grab team logo url from nba.com

var abbreviation = {
	'Hawks': 'ATL',
	'Celtics': 'BOS',
	'Nets': 'BKN',
	'Hornets': 'CHA',
	'Bulls': 'CHI',
	'Cavaliers': 'CLE',
	'Mavericks': 'DAL',
	'Nuggets': 'DEN',
	'Pistons': 'DET',
	'Warriors': 'GSW',
	'Rockets': 'HOU',
	'Pacers': 'IND',
	'Clippers': 'LAC',
	'Lakers': 'LAL',
	'Grizzlies': 'MEM',
	'Heat':'MIA',
	'Bucks':'MIL',
	'Timberwolves':'MIN',
	'Pelicans':'NOP',
	'Knicks':'NYK',
	'Thunder':'OKC',
	'Magic':'ORL',
	'76ers':'PHI',
	'Suns':'PHX',
	'Trail Blazers':'POR',
	'Kings':'SAC',
	'Spurs':'SAS',
	'Raptors':'TOR',
	'Jazz':'UTA',
	'Wizards':'WAS'
}

function getLogoUrl(nickname) {
	var abbr = abbreviation[nickname]
	return 'http://china.nba.com/media/img/teams/logos/'+abbr+'_logo.svg'
}

export default getLogoUrl;