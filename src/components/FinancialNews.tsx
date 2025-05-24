import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { News } from '../types';
import toast from 'react-hot-toast';

export const FinancialNews: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          country: 'us',
          category: 'business',
          apiKey: import.meta.env.VITE_NEWS_API_KEY
        }
      });

      setNews(response.data.articles.map((article: any, index: number) => ({
        id: index.toString(),
        title: article.title,
        content: article.description,
        url: article.url,
        published_at: article.publishedAt
      })));
    } catch (error) {
      toast.error('Failed to fetch news');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="animate-pulse">Loading news...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Financial News</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {new Date(item.published_at).toLocaleDateString()}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};