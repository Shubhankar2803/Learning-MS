import React, { useState } from 'react';
import axios from 'axios';

const ChapterNotesUpload = ({ backendUrl, courseId, chapterId, onUpload }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('notes', file);
    try {
      await axios.post(
        `${backendUrl}/api/courses/${courseId}/chapters/${chapterId}/notes`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setFile(null);
      if (onUpload) onUpload();
      alert('Notes uploaded!');
    } catch (err) {
      alert('Upload failed');
    }
    setUploading(false);
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx,.ppt,.pptx,.txt" />
      <button onClick={handleUpload} disabled={uploading || !file} className="bg-teal-500 text-white px-3 py-1 rounded">
        {uploading ? 'Uploading...' : 'Upload Notes'}
      </button>
    </div>
  );
};

export default ChapterNotesUpload;