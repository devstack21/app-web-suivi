export const CountryIndicator = '+237';

export const PASSWORD_ENCRYPTED_KEY = 'mabanqueiccsoft1';

export const CODE_ROLE_COLLECTE = "COLLECTE";


export const API_URL = {
	CreateAccount: '/user/create/',
	CreateCheckpoint: '/checkpoint/create/',
	CreateRole: '/role/create/',
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
	ListVilles: '/list/Villes/',
	Login: '/login/',
	ResetPassword: '/reset/password/',
	StatTypeBetail: '/stat/typeBetail/',
	StatApproTypeBetail: '/stat/approvisionement/betail/region/',
	UpdatePassword: '/change/password/',
	UpdateRole: '/role/update/',

	TendanceVilleDashboard: '/alertVilleStat',
	statCkeckpoint: '/stat/checkpoint',

	listeCamion: '/camions/liste',
	itineraireCamion: '/camions/itineraire',
	listContacts: '/contact/',

	creerAlerte: '/alerte/',
	listeAlerte: '/alerte/',
	activeDesactiveAlerte: '/alerteActiveDeactive/'
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

