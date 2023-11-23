import fs from 'fs';
import path from 'path';
import _ from 'lodash';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import { remarkExtendedTable, extendedTableHandlers } from 'remark-extended-table';
import { parseHeader } from '@libs/markdown';

const BLOG_DIRECTORY = "data/blog/";

export function getAllPosts() {
    const postsDirectory = path.join(process.cwd(), BLOG_DIRECTORY);
    const filenames = fs.readdirSync(postsDirectory);

    const metadata = filenames.map(v => {
        let header = {
            id: v.split('.')[0]
        };

        const postPath = path.join(process.cwd(), BLOG_DIRECTORY, v);
        const content = fs.readFileSync(postPath, { encoding: 'utf-8' });

        unified()
            .use(remarkParse)
            .use(remarkStringify)
            .use(remarkFrontmatter, ['yaml', 'toml'])
            .use(() => tree => {
                header = {
                    ...header,
                    ...parseHeader(tree)
                }
            })
            .processSync(content);

        return header;
    });

    return _.sortBy(metadata, v => Date.parse(v.data)).reverse();
}

export function getPost(id) {
    const postFilename = `${id}.md`;
    const postPath = path.join(process.cwd(), 'data/blog/', postFilename);

    if(!fs.existsSync(postPath)) {
        throw "Post not found";
    }

    let header = {};
    const content = fs.readFileSync(postPath, { encoding: 'utf-8' });

    const parsed = unified()
                    .use(remarkParse)
                    .use(remarkStringify)
                    .use(remarkFrontmatter, ['yaml', 'toml'])
                    .use(() => tree => { header = parseHeader(tree) })
                    .use(remarkGfm)
                    .use(remarkExtendedTable)
                    .use(remarkRehype, null, { handlers: Object.assign({}, extendedTableHandlers) })
                    .use(rehypeSanitize)
                    .use(rehypeStringify)
                    .processSync(content);

    return {
        header: header,
        content: parsed.value
    };
}  