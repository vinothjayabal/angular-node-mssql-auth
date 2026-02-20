const sql = require('mssql');

const config = {
	user: process.env.DB_USER || 'VJ\\arul',
	password: process.env.DB_PASSWORD || '1990',
	server: process.env.DB_SERVER || 'VJ\\SQLEXPRESS01',
	database: process.env.DB_DATABASE || 'userapp',
	port: parseInt(process.env.DB_PORT, 10) || 1433,
	pool: {
		max: 10,
		min: 0,
		idleTimeoutMillis: 30000
	},
	options: {
		encrypt: false,
		trustServerCertificate: true
	}
};

let poolPromise;
let poolConnected = false;

const initializePool = async () => {
	try {
		const pool = await new sql.ConnectionPool(config).connect();
		console.log('Connected to MSSQL');
		poolConnected = true;
		return pool;
	} catch (err) {
		console.warn('Database Connection Failed - running in offline mode:', err.message);
		return null;
	}
};

poolPromise = initializePool();

module.exports = {
	sql,
	poolPromise,
	config,
	poolConnected: () => poolConnected
};
