'use client';
import React from 'react';
import { Upload, FileText, Sparkles, ArrowLeft, Download } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/public/logo.svg';
import { nanoid } from 'nanoid';
import { parseResumeAction } from './task/parse-resume';

export default function Home() {
  const handlePdfUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/upload-tmp', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      const result: { data: { url: string }; status: string } =
        await response.json();
      const fileUrl =
        'https://tmpfiles.org/dl' +
        result.data.url.replace('http://tmpfiles.org', '');

      const parseHandle = await parseResumeAction(fileUrl);
      console.log(parseHandle);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Image src={Logo} alt="Logo" width={45} height={45} />
            </div>
            <nav className="flex space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-orange-500 font-medium"
              >
                Home
              </a>
              <Link
                href="/resume"
                className="text-gray-700 hover:text-orange-500 font-medium"
              >
                CV
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">🔒</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              Lock<span className="text-orange-500">Innn</span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-12">
            Adapt your CV to any Job Listing
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="border-2 border-dashed border-orange-300 rounded-lg p-12 bg-orange-50 mb-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <p className="text-gray-600 mb-6">Drag and drop your CV here</p>
                <div className="flex space-x-4">
                  <div className="relative">
                    <input
                      type="file"
                      id="pdf-upload"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept=".pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handlePdfUpload(file);
                        }
                      }}
                    />
                    <label
                      htmlFor="pdf-upload"
                      className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2 cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Browse Files</span>
                    </label>
                  </div>
                  <button
                    className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
                    onClick={() => {
                      const id = nanoid();
                      const now = new Date().toISOString();
                      const newResume = {
                        id,
                        title: 'Untitled Resume',
                        userId: '',
                        createdAt: now,
                        updatedAt: now,
                        templateId: null,
                        content: '', // Empty content for new resume
                      };
                      const stored = localStorage.getItem('resumes');
                      const resumesArr = stored ? JSON.parse(stored) : [];
                      resumesArr.push(newResume);
                      localStorage.setItem(
                        'resumes',
                        JSON.stringify(resumesArr),
                      );
                      window.location.href = `/resume/${id}`;
                    }}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Start from Scratch</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
            Our Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-white shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Adapt CV to Job Listing
              </h3>
              <p className="text-gray-600">
                Automatically customize your CV to match specific job
                requirements and keywords.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-white shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Enhance CV
              </h3>
              <p className="text-gray-600">
                Improve your CV with professional formatting and content
                optimization.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-white shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Generate Resume
              </h3>
              <p className="text-gray-600">
                Create professional resumes from scratch with our intelligent
                templates.
              </p>
            </div>
          </div>
        </div>

        {/* CV Preview Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4" />
                <span>CV UI/UX Designer Gojek - Maret</span>
              </button>
            </div>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Unspecified Bird
                  </h3>
                  <p className="text-gray-600">
                    UI/UX Designer at Your Dream City Java
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Summary</h4>
                  <div className="h-20 bg-gray-100 rounded"></div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Work Experience
                </h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Friday 17 Jul, 26 Jul 2024
                  </p>
                  <div className="h-4 bg-gray-100 rounded"></div>
                  <p className="text-sm text-gray-600">Last Update</p>
                  <p className="text-sm text-gray-600">
                    Sat, 26 Jul - 7 Aug 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-400 mb-4">
                Designed by Ashiee Tagnan Racharel
              </p>
              <p className="text-gray-400">
                Developed by Aaron Christopher Tannar
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">
                Get in contact with us!
              </h4>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">LockIn 2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
