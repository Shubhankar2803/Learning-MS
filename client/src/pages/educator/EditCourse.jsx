import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import ChapterNotesUpload from '../../components/educator/NotesUpload';
import { useParams } from 'react-router-dom';

const EditCourse = () => {
  const { courseId } = useParams();
  const { backendUrl, getToken } = useContext(AppContext);
  const [course, setCourse] = useState(null);

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = await getToken();
        const { data } = await axios.get(`${backendUrl}/api/courses/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCourse(data);
      } catch (err) {
        setCourse(null);
      }
    };
    fetchCourse();
  }, [backendUrl, courseId, getToken]);

  // Optionally refresh course data after upload
  const refreshCourse = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourse(data);
    } catch (err) {
      setCourse(null);
    }
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div>
      <h2>{course.courseTitle}</h2>
      {course.courseContent.map((chapter) => (
        <div key={chapter.chapterId} style={{ marginBottom: '2rem' }}>
          <h3>{chapter.chapterTitle}</h3>
          <ChapterNotesUpload
            backendUrl={backendUrl}
            courseId={course._id}
            chapterId={chapter.chapterId}
            onUpload={refreshCourse}
          />
          {chapter.notes && (
            <div style={{ marginTop: '0.5rem' }}>
              <a
                href={`${backendUrl}/api/courses/${course._id}/chapters/${chapter.chapterId}/notes/download`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Download Current Notes ({chapter.notes.originalname})
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EditCourse;