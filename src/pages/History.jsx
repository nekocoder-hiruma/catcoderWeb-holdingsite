import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import TimelineItem from '../components/TimelineItem';
import useTranslatedContent from '../hooks/useTranslatedContent';

const History = () => {
  const { t } = useTranslation();
  const historyData = useTranslatedContent('history');
  const [activeTab, setActiveTab] = useState('work');

  const workHistory = historyData.filter(item => item.type === 'work');
  const education = historyData.filter(item => item.type === 'education');

  return (
    <div className="max-w-3xl mx-auto">
      <Helmet>
        <title>{t('nav.history')} | Wong Wai Keat</title>
        <meta name="description" content="My professional journey, work experience, and education history." />
      </Helmet>
      <h1 className="text-4xl font-bold mb-12 text-center text-white">
        {t('nav.history')}
      </h1>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-8 border-b border-navy-700">
        <button
          onClick={() => setActiveTab('work')}
          className={`px-6 py-3 font-semibold transition-all duration-300 ${activeTab === 'work'
            ? 'text-orange border-b-2 border-orange'
            : 'text-gray-400 hover:text-white'
            }`}
        >
          {t('history.workExperience')}
        </button>
        <button
          onClick={() => setActiveTab('education')}
          className={`px-6 py-3 font-semibold transition-all duration-300 ${activeTab === 'education'
            ? 'text-magenta border-b-2 border-magenta'
            : 'text-gray-400 hover:text-white'
            }`}
        >
          {t('history.education')}
        </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        {activeTab === 'work' && (
          <div className="space-y-4 animate-fadeIn">
            {workHistory.map((item, index) => (
              <TimelineItem
                key={item.id}
                {...item}
                isLast={index === workHistory.length - 1}
              />
            ))}
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-4 animate-fadeIn">
            {education.map((item, index) => (
              <TimelineItem
                key={item.id}
                {...item}
                isLast={index === education.length - 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
