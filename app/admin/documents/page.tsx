'use client';

import React, { useState } from 'react';
import { Upload, FileText, Trash2, Download, MoreVertical } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  kind: 'Contract' | 'Invoice' | 'Release' | 'Other';
  size: number;
  uploadedAt: string;
  owner: string;
}

const kinds: (Document['kind'] | 'All')[] = ['All', 'Contract', 'Invoice', 'Release', 'Other'];

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Client Booking Agreement.pdf',
      kind: 'Contract',
      size: 412000,
      uploadedAt: '2026-09-01',
      owner: 'Studio',
    },
    {
      id: '2',
      name: 'Invoice #2024-001.pdf',
      kind: 'Invoice',
      size: 188000,
      uploadedAt: '2026-08-14',
      owner: 'Finance',
    },
  ]);

  const [kind, setKind] = useState<Document['kind'] | 'All'>('All');
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const visible = documents.filter(d => kind === 'All' || d.kind === kind);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const newDoc: Document = {
        id: Math.random().toString(),
        name: file.name,
        kind: 'Other',
        size: file.size,
        uploadedAt: new Date().toISOString().split('T')[0],
        owner: 'Studio',
      };
      setDocuments(prev => [newDoc, ...prev]);
    }
    setUploading(false);
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(d => d.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="grid grid-cols-12 gap-5">
      {/* Upload Card */}
      <div className="col-span-12 lg:col-span-4">
        <div
          onDragOver={e => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => {
            e.preventDefault();
            setDragging(false);
          }}
          className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition ${
            dragging
              ? 'border-lime-400 bg-lime-50'
              : 'border-gray-300 bg-gray-50'
          }`}
        >
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer w-full">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-black text-lime-400 mb-3">
              <Upload className="h-5 w-5" />
            </div>
            <p className="text-black font-semibold mb-1">
              {uploading ? 'Uploading...' : 'Drop files here'}
            </p>
            <p className="text-sm text-gray-600">
              PDF, DOCX, images up to 25 MB
            </p>
            <button
              type="button"
              className="mt-4 px-4 py-2 bg-lime-400 text-black font-semibold rounded-lg hover:bg-lime-300 transition"
            >
              Browse files
            </button>
          </label>
        </div>
      </div>

      {/* Documents Table */}
      <div className="col-span-12 lg:col-span-8 bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="px-8 py-5 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-black">Studio Library</h2>
          <div className="flex flex-wrap gap-2">
            {kinds.map(k => (
              <button
                key={k}
                onClick={() => setKind(k)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  kind === k
                    ? 'bg-black text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="px-8 py-16 text-center text-gray-500">
            <FileText className="w-10 h-10 mx-auto mb-3 opacity-20" />
            <p className="font-medium">No documents yet</p>
            <p className="text-sm">Upload files to get started</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {visible.map(doc => (
              <div
                key={doc.id}
                className="px-8 py-4 flex items-center gap-4 hover:bg-gray-50 transition"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-black truncate">{doc.name}</p>
                  <p className="text-sm text-gray-600">
                    {doc.kind} • {formatFileSize(doc.size)} • {doc.owner} • {new Date(doc.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="p-2 hover:bg-gray-200 rounded-lg transition text-gray-600">
                    <Download className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="p-2 hover:bg-red-100 rounded-lg transition text-gray-600 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
