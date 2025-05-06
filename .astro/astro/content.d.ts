declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"case-studies": {
"ds-assistance-expectations-research.mdx": {
	id: "ds-assistance-expectations-research.mdx";
  slug: "ds-assistance-expectations-research";
  body: string;
  collection: "case-studies";
  data: InferEntrySchema<"case-studies">
} & { render(): Render[".mdx"] };
"ds-compliance-research.mdx": {
	id: "ds-compliance-research.mdx";
  slug: "ds-compliance-research";
  body: string;
  collection: "case-studies";
  data: InferEntrySchema<"case-studies">
} & { render(): Render[".mdx"] };
"dsr-research.mdx": {
	id: "dsr-research.mdx";
  slug: "dsr-research";
  body: string;
  collection: "case-studies";
  data: InferEntrySchema<"case-studies">
} & { render(): Render[".mdx"] };
"mping-mobile-redesign.mdx": {
	id: "mping-mobile-redesign.mdx";
  slug: "mping-mobile-redesign";
  body: string;
  collection: "case-studies";
  data: InferEntrySchema<"case-studies">
} & { render(): Render[".mdx"] };
"panacea-case-study.mdx": {
	id: "panacea-case-study.mdx";
  slug: "panacea-case-study";
  body: string;
  collection: "case-studies";
  data: InferEntrySchema<"case-studies">
} & { render(): Render[".mdx"] };
"the-patio-place-redesign.mdx": {
	id: "the-patio-place-redesign.mdx";
  slug: "the-patio-place-redesign";
  body: string;
  collection: "case-studies";
  data: InferEntrySchema<"case-studies">
} & { render(): Render[".mdx"] };
};
"work": {
"conditional-form-pattern.mdx": {
	id: "conditional-form-pattern.mdx";
  slug: "conditional-form-pattern";
  body: string;
  collection: "work";
  data: InferEntrySchema<"work">
} & { render(): Render[".mdx"] };
"isac-v1-fitbit.md": {
	id: "isac-v1-fitbit.md";
  slug: "isac-v1-fitbit";
  body: string;
  collection: "work";
  data: InferEntrySchema<"work">
} & { render(): Render[".md"] };
"isac-v1-pebble.mdx": {
	id: "isac-v1-pebble.mdx";
  slug: "isac-v1-pebble";
  body: string;
  collection: "work";
  data: InferEntrySchema<"work">
} & { render(): Render[".mdx"] };
"live-updates-notification-chip-concept-android.mdx": {
	id: "live-updates-notification-chip-concept-android.mdx";
  slug: "live-updates-notification-chip-concept-android";
  body: string;
  collection: "work";
  data: InferEntrySchema<"work">
} & { render(): Render[".mdx"] };
"old-portfolio-site.md": {
	id: "old-portfolio-site.md";
  slug: "old-portfolio-site";
  body: string;
  collection: "work";
  data: InferEntrySchema<"work">
} & { render(): Render[".md"] };
"patios-n-stuff.mdx": {
	id: "patios-n-stuff.mdx";
  slug: "patios-n-stuff";
  body: string;
  collection: "work";
  data: InferEntrySchema<"work">
} & { render(): Render[".mdx"] };
"sm-miles-skill-tree-hd.mdx": {
	id: "sm-miles-skill-tree-hd.mdx";
  slug: "sm-miles-skill-tree-hd";
  body: string;
  collection: "work";
  data: InferEntrySchema<"work">
} & { render(): Render[".mdx"] };
"unhelpful-thinking-habits.mdx": {
	id: "unhelpful-thinking-habits.mdx";
  slug: "unhelpful-thinking-habits";
  body: string;
  collection: "work";
  data: InferEntrySchema<"work">
} & { render(): Render[".mdx"] };
"ux-engineer-wordmark.mdx": {
	id: "ux-engineer-wordmark.mdx";
  slug: "ux-engineer-wordmark";
  body: string;
  collection: "work";
  data: InferEntrySchema<"work">
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
