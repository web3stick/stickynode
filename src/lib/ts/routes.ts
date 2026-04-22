// ============================================
const ROUTES = {
	home: { path: "/", label: "HOME" },
	docker: { path: "/docker", label: "SETUP WITH DOCKER" },
	pool: { path: "/pool", label: "SETUP STAKING POOL" },
	config: { path: "/config", label: "~/.near/config.json" },
	near: { path: "/near", label: "~/.near" }
} as const;

export default ROUTES;
// ============================================
