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
	GenerateReport: '/generate/note_flux/',
	ListAccounts: '/user/list/',
	ListBetail: '/betails/',
	ListAgentCheckpoints: '/user/list/checkpoints',
	ListCheckpoints: '/checkpoint/list/',
	ListDistrcits: '/list/districts/',
	ListModule: '/module/list/',
	ListReports: '/rapport/user/historique/',
	ListReportsCheckpoint: '/list/rapport/checkpoint',
	ListRegions: '/list/regions/',
	ListRole: '/role/list/',
	ListTypeBetail: '/betails/type/',
	ListTransport: '/transport/list',

	ListVilles: '/list/villes/',
	Login: '/login/',
	LoginVisitor: '/code/',
	ResetPassword: '/reset/password/',
	StatApproTypeBetail: '/stat/approvisionement/betail/region/',
	statCkeckpoint: '/stat/checkpoint',
	StatImportTypeBetail: '/stat/importation/betail/',
	StatIndicateur: '/stat/indicateur/',
	StatGeneral: '/stat/general/',
	UpdatePassword: '/change/password/',
	UpdateRole: '/role/update/',
	

	VisitorStatApproTypeBetail: '/stat/visitor/approvisionement/betail/region/',
	VisitotStatIndicateur: '/stat/visitor/indicateur/',
	VisitorStatGeneral: '/stat/visitor/general/',



	TransportItinary: '/transport/itinary',


	activeDesactiveAlerte: '/alerteActiveDeactive/',
	detailRapport: '/rapport/user/details/',
	activerRapport: '/rapport/valider/',
	rejeterRapport: '/rapport/rejeter/',

	ListeValidatePassword: '/collecteur/demande/reset/password/',
	CollecteurResetPassword: '/collecteur/reset/password/',

	listeAxeparcours: '/axeparcours/list/',
	createAxeparcours: '/axeparcours/create/',
	updateAxeparcours: '/axeparcours/update/',
	detailAxeparcours: '/axeparcours/detail/',
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

