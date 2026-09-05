'use client';

import React, { useState } from 'react';
import { Upload, FileText, Trash2, Download } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  bookingId?: string;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Booking Contract.pdf',
      type: 'pdf',
      size: 245000,
      uploadedAt: '2026-09-05',
    },
    {
      id: '2',
      name: 'Client Invoice.pdf',
      type: 'pdf',
      size: 125000,
      uploadedAt: '2026-09-04',
    },
  ]);

  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);

    // Simulate file upload
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const newDoc: Document = {
        id: Math.random().toString(),
        name: file.name,
        type: file.type.split('/')[1] || 'file',
        size: file.size,
        uploadedAt: new Date().toISOString().split('T')[0],
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Documents</h1>
        <p className="text-gray-400">Upload and manage booking documents</p>
      </div>

      {/* Upload Section */}
      <div className="bg-gradient-to-br from-lime-400/10 to-lime-400/5 border-2 border-dashed border-lime-400/50 rounded-xl p-8 text-center cursor-pointer hover:border-lime-400 transition">
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          disabled={uploading}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer block">
          <Upload className="w-12 h-12 text-lime-400 mx-auto mb-3" />
          <p className="text-white font-medium mb-1">
            {uploading ? 'Uploading...' : 'Drop files here or click to upload'}
          </p>
          <p className="text-gray-400 text-sm">PDF, images, documents up to 50MB</p>
        </label>
      </div>

      {/* Documents List */}
      <div className="bg-gray-950 border border-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">
          {documents.length} Document{documents.length !== 1 ? 's' : ''}
        </h2>

        {documents.length === 0 ? (
          <div className="text-center py-8 text-gray-400">No documents yet</div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {documents.map(doc => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-gray-800 hover:border-gray-700 transition"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 bg-lime-400/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-lime-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{doc.name}</p>
                    <p className="text-gray-500 text-sm">
                      {formatFileSize(doc.size)} • {doc.uploadedAt}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-800 rounded-lg transition text-gray-400 hover:text-gray-300">
                    <Download className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="p-2 hover:bg-red-900/20 rounded-lg transition text-gray-400 hover:text-red-400"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-4 text-sm text-blue-300">
        💡 <strong>Tip:</strong> Upload contracts, invoices, delivery notes, and other booking-related documents
        here for easy access.
      </div>
    </div>
  );
}
