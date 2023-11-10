export const CountryIndicator = '+237';

export const PASSWORD_ENCRYPTED_KEY = 'mabanqueiccsoft1';

export const CODE_ROLE_COLLECTE = "COLLECTE";


export const API_URL = {
	Alert: '/alerte/',
	CreateAccount: '/user/create/',
	CreateCheckpoint: '/checkpoint/create/',
	CreateRole: '/role/create/',
	Contacts: '/contact/',
	DashboardAnalytics: '/stat/dashboard/analytics/',
	DeleteRole: '/role/delete/',
	DetailCheckpoint: '/checkpoint/detail/',
	DetailRole: '/role/detail/',
	EditAccount: '/user/update/',
	EditCheckpoint: '/checkpoint/update/',
	EditRole: '/role/update/',
	ListAccounts: '/user/list/',
	ListBetail: '/betails/',
	ListAgentCheckpoints: '/user/list/checkpoints',
	ListCheckpoints: '/checkpoint/list/',
	ListDistrcits: '/list/districts/',
	ListModule: '/module/list/',
	ListRegions: '/list/regions/',
	ListRole: '/role/list/',
	ListeTypeBetail: '/betails/type/',
	ListVilles: '/list/villes/',
	Login: '/login/',
	ResetPassword: '/reset/password/',
	StatApproTypeBetail: '/stat/approvisionement/betail/region/',
	StatImportTypeBetail: '/stat/importation/betail/',
	StatIndicateur: '/stat/indicateur/',
	statCkeckpoint: '/stat/checkpoint',
	UpdatePassword: '/change/password/',
	UpdateRole: '/role/update/',


	listeCamion: '/camions/liste',
	itineraireCamion: '/camions/itineraire',

	activeDesactiveAlerte: '/alerteActiveDeactive/',
	listeRapports: '/rapport/user/historique/',
	detailRapport: '/rapport/user/details/',
	activerRapport: '/rapport/valider/',
	rejeterRapport: '/rapport/rejeter/',
	genererRapport: '/generate/rapport/'
};

export const PERIODS = [
	{
		value: 'week',
		label: 'this-week'
	},
	{
		value: 'month',
		label: 'this-month'
	}
]


export const REQUEST_STATUS = {
	idle: "idle",
	loading: "loading",
	succeed: 'succeed',
	error: "error"
}

