'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import {
  Newspaper,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Save,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { Article } from '@/types';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Textarea } from '@/components/atoms/Textarea';

interface InsightsManagerClientProps {
  initialArticles: Article[];
}

interface NewArticleFormData {
  title: string;
  slug: string;
  category: string;
  author: string;
  excerpt: string;
  body: string;
}

export const InsightsManagerClient: React.FC<InsightsManagerClientProps> = ({
  initialArticles,
}) => {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<NewArticleFormData>({
    defaultValues: {
      category: 'Industry Insights',
      author: 'Dr. Abdelhamid Aboelaly',
    },
  });

  const handleGenerateSlug = () => {
    const title = watch('title');
    if (title) {
      const generated = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setValue('slug', generated);
    }
  };

  const onSubmit: SubmitHandler<NewArticleFormData> = async (data) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/admin/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to create article');
      }

      setArticles((prev) => [json.article, ...prev]);
      reset();
      setShowAddForm(false);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Error creating article');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTogglePublish = async (art: Article) => {
    try {
      const newStatus = !art.is_published;
      const res = await fetch(`/api/admin/insights/${art.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_published: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');

      setArticles((prev) =>
        prev.map((a) => (a.id === art.id ? { ...a, is_published: newStatus } : a))
      );
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Action failed');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete article "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/insights/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete article');

      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-slate-400">
          Published Technical Articles: <strong className="text-white">{articles.length}</strong>
        </p>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs"
        >
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          <span>{showAddForm ? 'Close Article Form' : 'Compose New Article'}</span>
        </Button>
      </div>

      {errorMessage && (
        <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-4 text-xs text-rose-300 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Add Article Form */}
      {showAddForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl border border-teal-500/30 bg-slate-900/90 p-6 space-y-4 shadow-lg"
        >
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Newspaper className="h-4 w-4 text-teal-400" />
            <span>Compose Technical Monograph / Article</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                Article Title *
              </label>
              <Input
                placeholder="e.g. Navigating EDA Regulatory Dossiers for High-Potency APIs"
                className="bg-slate-850 text-white border-slate-700"
                error={errors.title?.message}
                {...register('title', { required: 'Title is required' })}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold uppercase text-slate-300">
                  URL Slug *
                </label>
                <button
                  type="button"
                  onClick={handleGenerateSlug}
                  className="text-[11px] text-teal-400 hover:text-teal-300 font-medium"
                >
                  Generate
                </button>
              </div>
              <Input
                placeholder="navigating-eda-regulatory-dossiers"
                className="bg-slate-850 text-white border-slate-700 font-mono"
                error={errors.slug?.message}
                {...register('slug', { required: 'Slug is required' })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                Category
              </label>
              <Input
                placeholder="e.g. Regulatory Compliance / Cold Chain Logistics"
                className="bg-slate-850 text-white border-slate-700"
                {...register('category')}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                Author
              </label>
              <Input
                placeholder="Dr. Abdelhamid Aboelaly"
                className="bg-slate-850 text-white border-slate-700"
                {...register('author')}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                Executive Abstract / Excerpt
              </label>
              <Textarea
                rows={2}
                placeholder="Brief summary displayed on insights card..."
                className="bg-slate-850 text-white border-slate-700"
                {...register('excerpt')}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                Full Article HTML Body *
              </label>
              <Textarea
                rows={6}
                placeholder="<p>Detailed technical narrative discussing synthesis, quality control, or market shifts...</p>"
                className="bg-slate-850 text-white border-slate-700 font-mono text-xs"
                error={errors.body?.message}
                {...register('body', { required: 'Body content is required' })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowAddForm(false)}
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting}
              className="bg-teal-600 hover:bg-teal-500 text-white font-medium"
            >
              <Save className="mr-1.5 h-3.5 w-3.5" />
              <span>Publish Article</span>
            </Button>
          </div>
        </form>
      )}

      {/* Articles Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-850 text-slate-400 font-semibold uppercase tracking-wider">
              <th className="py-3.5 px-4">Article Title</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Author</th>
              <th className="py-3.5 px-4">Published Date</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {articles.map((art) => (
              <tr key={art.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-4 max-w-sm">
                  <div className="font-bold text-white text-sm line-clamp-1">{art.title}</div>
                  <div className="text-[11px] text-slate-400 font-mono">{art.slug}</div>
                </td>

                <td className="py-3.5 px-4">
                  <span className="rounded-md bg-slate-800 px-2 py-0.5 text-xs text-slate-300 font-medium">
                    {art.category}
                  </span>
                </td>

                <td className="py-3.5 px-4 text-slate-300 font-medium">{art.author}</td>

                <td className="py-3.5 px-4 text-slate-500">
                  {new Date(art.published_at).toLocaleDateString()}
                </td>

                <td className="py-3.5 px-4">
                  <button
                    onClick={() => handleTogglePublish(art)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider transition ${
                      art.is_published
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                        : 'bg-slate-700/30 text-slate-400 border border-slate-700 hover:bg-slate-700/50'
                    }`}
                  >
                    {art.is_published ? (
                      <>
                        <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                        <span>Live</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3 w-3 text-slate-400" />
                        <span>Draft</span>
                      </>
                    )}
                  </button>
                </td>

                <td className="py-3.5 px-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <Link
                      href={`/insights/${art.slug}`}
                      target="_blank"
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
                      title="Read on Site"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>

                    <button
                      onClick={() => handleDelete(art.id, art.title)}
                      className="rounded-lg p-1.5 text-rose-400 hover:bg-rose-950 hover:text-rose-300"
                      title="Delete Article"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
