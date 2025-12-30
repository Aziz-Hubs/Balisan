import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

interface MetaData {
    title: string;
    date: string;
    category?: string;
    author?: string;
    description: string;
    image: string;
    difficulty?: string;
    time?: string;
    slug: string;
}

export function getPosts(type: 'journal' | 'recipes'): MetaData[] {
    const dir = path.join(contentDirectory, type);
    if (!fs.existsSync(dir)) return [];

    const files = fs.readdirSync(dir);

    return files
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => {
            const filePath = path.join(dir, file);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const { data } = matter(fileContent);

            return {
                ...data,
                slug: file.replace('.mdx', ''),
            } as MetaData;
        })
        .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

export function getPostBySlug(type: 'journal' | 'recipes', slug: string) {
    const filePath = path.join(contentDirectory, type, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    return {
        metadata: { ...data, slug },
        content,
    };
}
