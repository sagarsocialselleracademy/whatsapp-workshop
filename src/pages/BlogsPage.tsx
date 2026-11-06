import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen, Search, X } from 'lucide-react';
import { Header, NoticeBar } from '@/components/NoticeBar';
import { Button, cn } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';

interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl?: string;
  imageAlt?: string;
}

const BLOG_CATEGORIES = [
  'AI business ideas',
  'New AI updates',
  'AI strategies',
  'AI for videos',
  'AI for sales',
  'AI for Marketing',
  'AI for Operations',
] as const;

const ARTICLES: BlogArticle[] = [];

function filterArticles(articles: BlogArticle[], query: string, category: string): BlogArticle[] {
  const q = query.trim().toLocaleLowerCase();
  return articles.filter(
    (a) =>
      (category === 'All articles' || a.category === category) &&
      (!q ||
        `${a.title} ${a.excerpt} ${a.content} ${a.category}`.toLocaleLowerCase().includes(q))
  );
}

export function BlogsPage() {
  const [searchInput, setSearchInput] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All articles');
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);

  const filtered = filterArticles(ARTICLES, appliedQuery, selectedCategory);
  const hasFilters = !!(appliedQuery || selectedCategory !== 'All articles');

  function clearFilters() {
    setSearchInput('');
    setAppliedQuery('');
    setSelectedCategory('All articles');
  }

  return (
    <div className="min-h-screen bg-background">
      <NoticeBar />
      <Header />
      <main>
        <section className="bg-primary px-5 pb-12 pt-44 text-primary-foreground sm:px-10 sm:pb-16">
          <div className="mx-auto max-w-7xl">
            <p className="mb-4 text-sm font-medium text-electric-glow">
              Lakshit Sethiya / Journal
            </p>
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <h1 className="font-display text-5xl font-semibold leading-tight tracking-normal sm:text-7xl">
                The AI <span className="text-electric-glow">Blog.</span>
              </h1>
              <form
                role="search"
                onSubmit={(e) => {
                  e.preventDefault();
                  setAppliedQuery(searchInput.trim());
                }}
                className="flex w-full items-center gap-2 lg:max-w-md"
              >
                <label htmlFor="blog-search" className="sr-only">
                  Search blogs
                </label>
                <div className="relative min-w-0 flex-1">
                  <Search
                    aria-hidden="true"
                    className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-primary-foreground/50"
                  />
                  <input
                    id="blog-search"
                    type="search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search blogs…"
                    className={cn(
                      'flex h-12 w-full rounded-md border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-1 pl-10 text-base text-primary-foreground shadow-sm transition-colors placeholder:text-primary-foreground/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm'
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  aria-label="Search"
                  className="h-12 rounded-md bg-electric px-5 text-primary-foreground hover:bg-electric/90"
                >
                  <Search className="size-4" />
                  <span className="hidden sm:inline">Search</span>
                </Button>
              </form>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-10 sm:px-10 sm:py-14 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
          <aside>
            <h2 className="mb-5 font-display text-sm font-semibold tracking-normal text-muted-foreground">
              Categories
            </h2>
            <nav
              aria-label="Blog categories"
              className="flex flex-wrap gap-2 lg:flex-col lg:gap-1"
            >
              {['All articles', ...BLOG_CATEGORIES].map((cat) => (
                <Button
                  key={cat}
                  variant="ghost"
                  aria-pressed={selectedCategory === cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`h-auto min-h-11 justify-start whitespace-normal rounded-md px-3 py-3 text-left ${
                    selectedCategory === cat
                      ? 'bg-electric/10 text-electric hover:bg-electric/15 hover:text-electric'
                      : 'text-muted-foreground'
                  }`}
                >
                  {cat}
                </Button>
              ))}
            </nav>
          </aside>

          <div className="min-w-0">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5">
              <h2 className="font-display text-xl font-semibold tracking-normal">
                {selectedCategory === 'All articles' ? 'Latest articles' : selectedCategory}
              </h2>
              <div className="flex items-center gap-3">
                <span role="status" className="text-sm text-muted-foreground">
                  {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
                </span>
                {hasFilters && (
                  <Button size="sm" variant="ghost" onClick={clearFilters}>
                    <X className="size-4" />
                    Clear filters
                  </Button>
                )}
              </div>
            </div>

            {filtered.length ? (
              <div className="grid gap-8 sm:grid-cols-2">
                {filtered.map((art) => (
                  <article
                    key={art.id}
                    className="overflow-hidden rounded-md border border-border bg-card"
                  >
                    {art.imageUrl && (
                      <img
                        src={art.imageUrl}
                        alt={art.imageAlt || art.title}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[3/2] w-full object-cover"
                      />
                    )}
                    <div className="p-6">
                      <p className="mb-3 text-sm text-electric">{art.category}</p>
                      <h3 className="font-display text-2xl font-semibold tracking-normal">
                        {art.title}
                      </h3>
                      <p className="mb-6 mt-3 text-sm leading-relaxed text-muted-foreground">
                        {art.excerpt}
                      </p>
                      <Button
                        variant="ghost"
                        className="px-0 text-electric"
                        onClick={() => setActiveArticle(art)}
                      >
                        Read article
                        <ArrowUpRight className="size-4" />
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="flex min-h-72 flex-col items-center justify-center py-10 text-center">
                <BookOpen
                  className="mb-5 size-9 text-electric"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
                <h3 className="font-display text-2xl font-semibold tracking-normal">
                  {ARTICLES.length ? 'No matching articles' : 'Articles coming soon'}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {ARTICLES.length
                    ? 'Try another search or category.'
                    : 'New articles by Lakshit Sethiya will appear here.'}
                </p>
                {hasFilters && (
                  <Button variant="outline" onClick={clearFilters} className="mt-6 rounded-md">
                    View all articles
                  </Button>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-5 py-8 sm:px-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 text-sm text-muted-foreground">
          <Link to="/" className="font-display font-semibold text-foreground">
            Lakshit Sethiya
          </Link>
          <div className="flex gap-5">
            <Link to="/programs?category=All&mode=All&status=All">Programs</Link>
            <Link to="/consultancy">Consultancy</Link>
            <Link to="/privacy">Privacy</Link>
          </div>
        </div>
      </footer>

      <Dialog
        open={activeArticle !== null}
        onOpenChange={(open) => {
          if (!open) setActiveArticle(null);
        }}
      >
        <DialogContent className="max-h-[85vh] overflow-y-auto rounded-md sm:max-w-3xl">
          <DialogHeader>
            <DialogDescription className="text-electric">
              {activeArticle?.category}
            </DialogDescription>
            <DialogTitle className="text-3xl leading-tight tracking-normal">
              {activeArticle?.title}
            </DialogTitle>
          </DialogHeader>
          {activeArticle?.imageUrl && (
            <img
              src={activeArticle.imageUrl}
              alt={activeArticle.imageAlt || activeArticle.title}
              className="h-auto w-full rounded-md"
            />
          )}
          <div className="whitespace-pre-line text-base leading-relaxed">
            {activeArticle?.content}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
