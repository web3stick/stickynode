// ============================================
const ROUTES = {
	home: { path: "/", label: "HOME" },
	docker: { path: "/docker", label: "RUNNING WITH DOCKER" },
	config: { path: "/config", label: "config.json" },
	near: { path: "/near", label: "~/.near" }
} as const;

export default ROUTES;
// ============================================
