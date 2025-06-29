declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]] & Render;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"blog": {
"a-b-testing.mdx": {
  id: "a-b-testing.mdx",
  slug: "a-b-testing",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"blank.mdx": {
  id: "blank.mdx",
  slug: "blank",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"card-sorting.mdx": {
  id: "card-sorting.mdx",
  slug: "card-sorting",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"clickstream-analysis.mdx": {
  id: "clickstream-analysis.mdx",
  slug: "clickstream-analysis",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"cognitive-walkthrough.mdx": {
  id: "cognitive-walkthrough.mdx",
  slug: "cognitive-walkthrough",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"contextual-inquiry.mdx": {
  id: "contextual-inquiry.mdx",
  slug: "contextual-inquiry",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"customer-satisfaction.mdx": {
  id: "customer-satisfaction.mdx",
  slug: "customer-satisfaction",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"diary-studies.mdx": {
  id: "diary-studies.mdx",
  slug: "diary-studies",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"docker-mcp-integration-developer-guide.mdx": {
  id: "docker-mcp-integration-developer-guide.mdx",
  slug: "docker-mcp-integration-developer-guide",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"ethnographic-research.mdx": {
  id: "ethnographic-research.mdx",
  slug: "ethnographic-research",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"field-studies.mdx": {
  id: "field-studies.mdx",
  slug: "field-studies",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"focus-groups.mdx": {
  id: "focus-groups.mdx",
  slug: "focus-groups",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"future-collaboration-with-ai.mdx": {
  id: "future-collaboration-with-ai.mdx",
  slug: "future-collaboration-with-ai",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"heuristic-evaluation.mdx": {
  id: "heuristic-evaluation.mdx",
  slug: "heuristic-evaluation",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"key-performance-indicators.mdx": {
  id: "key-performance-indicators.mdx",
  slug: "key-performance-indicators",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"net-promoter-score.mdx": {
  id: "net-promoter-score.mdx",
  slug: "net-promoter-score",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"prioritization-the-key-to-product-design-success.mdx": {
  id: "prioritization-the-key-to-product-design-success.mdx",
  slug: "prioritization-the-key-to-product-design-success",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"prompt-engineers-is-the-future-position.mdx": {
  id: "prompt-engineers-is-the-future-position.mdx",
  slug: "prompt-engineers-is-the-future-position",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"remote-a-b-testing.mdx": {
  id: "remote-a-b-testing.mdx",
  slug: "remote-a-b-testing",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"simplicity-wins.mdx": {
  id: "simplicity-wins.mdx",
  slug: "simplicity-wins",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"surveys.mdx": {
  id: "surveys.mdx",
  slug: "surveys",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"system-usability-scale.mdx": {
  id: "system-usability-scale.mdx",
  slug: "system-usability-scale",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"tactical-vs-strategic-programming.mdx": {
  id: "tactical-vs-strategic-programming.mdx",
  slug: "tactical-vs-strategic-programming",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"the-future-of-design-ai-and-human-creativity.mdx": {
  id: "the-future-of-design-ai-and-human-creativity.mdx",
  slug: "the-future-of-design-ai-and-human-creativity",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"tree-testing.mdx": {
  id: "tree-testing.mdx",
  slug: "tree-testing",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"usability-testing.mdx": {
  id: "usability-testing.mdx",
  slug: "usability-testing",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"user-interviews.mdx": {
  id: "user-interviews.mdx",
  slug: "user-interviews",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"user-research-comprehensive-guide.mdx": {
  id: "user-research-comprehensive-guide.mdx",
  slug: "user-research-comprehensive-guide",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"web-analytics.mdx": {
  id: "web-analytics.mdx",
  slug: "web-analytics",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"you-dont-know-your-customers.mdx": {
  id: "you-dont-know-your-customers.mdx",
  slug: "you-dont-know-your-customers",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
},

	};

	type ContentConfig = typeof import("../src/content/config");
}
