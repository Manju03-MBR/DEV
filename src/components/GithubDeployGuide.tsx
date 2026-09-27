import React, { useState } from 'react';
import { Github, Copy, Check, Terminal, ExternalLink, Globe, Sparkles, CheckCircle2 } from 'lucide-react';

export const GithubDeployGuide: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const steps = [
    {
      title: 'Step 1: Initialize Git & Commit Code',
      command: `git init\ngit add .\ngit commit -m "feat: complete portfolio, contact inbox, react contact cards and like cards"`,
      explanation: 'Stages all project files and creates the initial repository commit.',
    },
    {
      title: 'Step 2: Create GitHub Repository & Link Remote',
      command: `git branch -M main\ngit remote add origin https://github.com/<YOUR_USERNAME>/portfolio-react-app.git\ngit push -u origin main`,
      explanation: 'Pushes your local codebase to your public GitHub repository.',
    },
    {
      title: 'Step 3: Setup Automated GitHub Pages CI/CD Action',
      command: `name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
      - id: deployment
        uses: actions/deploy-pages@v4`,
      explanation: 'Place this in .github/workflows/deploy.yml. GitHub will automatically build and publish on every push!',
    },
  ];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="deployment" className="py-20 bg-slate-100/50 dark:bg-slate-900/40 border-t border-slate-200/60 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold mb-3">
            <Github className="w-3.5 h-3.5" />
            <span>DEPLOYMENT GUIDE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            GitHub Pages Public Deployment
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            As specified in the project details: <em>"Create a Github repo and publish the app using Github pages, the final app should be deployed as a public Github pages web-app."</em>
          </p>
        </div>

        {/* Steps Container */}
        <div className="max-w-4xl mx-auto space-y-6 text-left">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs"
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>{step.title}</span>
                </h3>

                <button
                  onClick={() => handleCopy(step.command, idx)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                {step.explanation}
              </p>

              <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                <code>{step.command}</code>
              </pre>
            </div>
          ))}

          {/* Final Callout */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-900/30 to-indigo-900/30 border border-emerald-500/30 text-slate-900 dark:text-white flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Public Web App Live URL</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Once pushed, your project will be live at: <code className="font-mono text-indigo-600 dark:text-indigo-400">https://&lt;username&gt;.github.io/portfolio-react-app/</code>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
