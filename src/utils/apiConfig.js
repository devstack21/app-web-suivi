export const CountryIndicator = '+237';

export const PASSWORD_ENCRYPTED_KEY = 'mabanqueiccsoft1';

export const CODE_ROLE_COLLECTE = "COLLECTE";


export const API_URL = {
	CreateAccount:'/user/create/',
	CreateCheckpoint: '/checkpoint/create/',
	CreateRole: '/role/create/',
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
	ListRole: '/role/list/',
	Login: '/login/',
	ResetPassword: '/reset/password/',
	UpdatePassword: '/change/password/',
	UpdateRole: '/role/update/',

	TendanceVilleDashboard: '/alertVilleStat/',
};


export const REQUEST_STATUS = {
	idle: "idle",
	loading: "loading",
	succeed: 'succeed',
	error: "error"
}