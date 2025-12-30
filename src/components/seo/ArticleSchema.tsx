interface Article {
    title: string;
    image: string;
    date: string;
    author: string;
    description: string;
}

export function ArticleSchema({ article }: { article: Article }) {

    const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: article.title,
        image: article.image,
        datePublished: article.date,
        author: {
            "@type": "Person",
            name: article.author,
        },
        description: article.description,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
