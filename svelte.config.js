import { mdsvex } from "mdsvex";
import adapter from "@sveltejs/adapter-static";
import { createHighlighter } from "shiki";
import { transformerMetaHighlight } from "@shikijs/transformers";

const theme = "catppuccin-mocha";
const highlighter = await createHighlighter({
	themes: [theme],
	langs: [
		"css",
		"gdscript",
		"go",
		"hcl",
		"html",
		"java",
		"javascript",
		"json",
		"python",
		"shellscript",
		"toml",
		"typescript",
		"yaml"
	]
});

function escapeSvelte(str) {
	return str.replace(/`/g, "&#96;").replace(/\{/g, "&#123;").replace(/\}/g, "&#125;");
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		runes: ({ filename }) => (filename.split(/[/\\]/).includes("node_modules") ? undefined : true)
	},
	kit: {
		adapter: adapter({
			pages: "build",
			assets: "build",
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		prerender: {
			handleHttpError: "warn"
		}
	},
	preprocess: [
		mdsvex({
			extensions: [".svx", ".md"],
			highlight: {
				highlighter: async (code, lang, meta) => {
					const html = escapeSvelte(
						highlighter.codeToHtml(code, {
							lang,
							theme,
							transformers: [transformerMetaHighlight()],
							meta: { __raw: meta }
						})
					);
					return `{@html \`${html}\` }`;
				}
			}
		})
	],
	extensions: [".svelte", ".svx", ".md"]
};

export default config;
