import React, { useContext, useEffect, useRef, useState } from 'react'
import uniqid from 'uniqid'
import Quill from 'quill'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const AddCourse = () => {

  const {backendUrl,getToken}=useContext(AppContext)

  const quillref = useRef(null)

  const editorRef = useRef(null)

  const [courseTitle, setCourseTitle] = useState('')
  const [coursePrice, setCoursePrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [image, setImage] = useState(null)
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterID] = useState(null)
  const [lectureDetails, setLectureDetails] = useState(
    {
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    }
  )
  const [courseDescription, setCourseDescription] = useState('')
  const handleChapter = (action, chapterId) => {
    if (action === 'add') {
      const title = prompt('Enter Chapter Name:');
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder +
            1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
      } else if (action === 'remove') {
        setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));

      } else if (action === 'toggle') {
        setChapters(
          chapters.map((chapter) => chapter.chapterId === chapterId ? { ...chapter, collapsed: !chapter.collapsed } : chapter)

        );
      }
    

    };

    const addLecture=()=>{
      setChapters( chapters.map((chapter)=>{

        if(chapter.chapterId===currentChapterId){
          const newLecture={
            ...lectureDetails,
            lectureOrder:chapter.chapterContent.lenght>0?chapter.chapterContent.slice(-1)[0].lectureOrder+1:1,
            lectureId:uniqid()
          };
          chapter.chapterContent.push(newLecture);
        }
        return chapter;
      })
          
      );
      setShowPopup(false);
      setLectureDetails({
        lectureTitle:'',
        lectureDuration:'',
        lectureUrl:'',
        isPreviewFree: false,

      })
    };
    const handleSubmit=async (e)=>{
      try {
        e.preventDefault()
     if(!image){
      toast.error("Thumbnail not present")
      return
     }

     const courseData={
      courseTitle,
      courseDescription, // use state value
      coursePrice:Number(coursePrice),
      discount:Number(discount),
      courseContent:chapters
     }

     const formData=new FormData()
     formData.append('courseData',JSON.stringify(courseData))
     formData.append('image',image)

     const token=await getToken()
     const {data}=await axios.post(backendUrl+'/api/educator/add-course',formData,{headers:{Authorization:`Bearer ${token}`}})
    
     if(data.success){
      toast.success(data.message)
      setCourseTitle('')
      setCoursePrice(0)
      setDiscount(0)
      setImage(null)
      setChapters([])
      quillref.current.root.innerHTML=""
     }
     else{
      toast.error(data.message)
      console.log(data.message)
     }

    
    } catch (error) {
        toast.error(error.message)
      }
    }

    const handleLecture = (action, chapterId, lectureIndex) => {
      if (action === 'add') {
      setCurrentChapterID(chapterId);
      setShowPopup(true);
      } else if (action === 'remove') {
      setChapters(
      chapters.map((chapter) => {
      if (chapter.chapterId === chapterId) {
      chapter.chapterContent.splice(lectureIndex, 1);}
      
      return chapter;
      })
    );
      }
    };
     


    useEffect(() => {
      if (!quillref.current && editorRef.current) {
        quillref.current = new Quill(editorRef.current, { theme: 'snow' })
        quillref.current.on('text-change', () => {
          setCourseDescription(quillref.current.root.innerHTML)
        })
      }
    }, [])

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col items-center py-10 px-2">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 max-w-2xl w-full bg-white/95 rounded-3xl shadow-2xl p-10 border-2 border-teal-100"
      >
        <h2 className="text-3xl font-extrabold text-teal-700 mb-4 tracking-tight">Add New Course</h2>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700 mb-1">Course Title</label>
          <input
            onChange={e => setCourseTitle(e.target.value)}
            value={courseTitle}
            type="text"
            placeholder="Type here"
            className="outline-none py-3 px-4 rounded-xl border-2 border-gray-200 focus:border-teal-500 bg-gray-50 transition placeholder-gray-400 text-gray-800 shadow-sm"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700 mb-1">Course Description</label>
          <div ref={editorRef} className="bg-gray-50 rounded-xl border-2 border-gray-200 min-h-[120px] shadow-inner px-2 py-2" />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-2 flex-1">
            <label className="font-semibold text-gray-700 mb-1">Course Price</label>
            <input
              onChange={e => setCoursePrice(e.target.value)}
              value={coursePrice}
              type="number"
              placeholder="0"
              className="outline-none py-3 px-4 rounded-xl border-2 border-gray-200 focus:border-teal-500 bg-gray-50 transition placeholder-gray-400 text-gray-800 shadow-sm w-full"
              required
            />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label className="font-semibold text-gray-700 mb-1">Discount %</label>
            <input
              onChange={e => setDiscount(e.target.value)}
              value={discount}
              type="number"
              placeholder="0"
              min={0}
              max={100}
              className="outline-none py-3 px-4 rounded-xl border-2 border-gray-200 focus:border-teal-500 bg-gray-50 transition placeholder-gray-400 text-gray-800 shadow-sm w-full"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700 mb-1">Course Thumbnail</label>
          <label htmlFor="thumbnailImage" className="flex items-center gap-3 cursor-pointer">
            <img
              src={assets.file_upload_icon}
              alt=""
              className="p-2 bg-teal-500 rounded-lg shadow hover:bg-teal-600 transition"
            />
            <input
              type="file"
              id="thumbnailImage"
              onChange={e => setImage(e.target.files[0])}
              accept="image/*"
              hidden
            />
            {image && (
              <img className="max-h-14 rounded-xl shadow border-2 border-teal-200" src={URL.createObjectURL(image)} alt="" />
            )}
          </label>
        </div>

        {/* Chapters & Lectures */}
        <div>
          <h3 className="font-semibold text-teal-700 mb-2">Course Content</h3>
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className="bg-gray-50 border-2 border-gray-200 rounded-2xl mb-4 shadow-sm">
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <img
                    onClick={() => handleChapter('toggle', chapter.chapterId)}
                    src={assets.dropdown_icon}
                    width={16}
                    alt=""
                    className={`cursor-pointer transition-transform ${chapter.collapsed && '-rotate-90'}`}
                  />
                  <span className="font-semibold text-gray-700">{chapterIndex + 1}. {chapter.chapterTitle}</span>
                </div>
                <span className="text-gray-500">{chapter.chapterContent.length} Lectures</span>
                <img
                  src={assets.cross_icon}
                  alt=""
                  className="cursor-pointer hover:bg-red-50 rounded-full p-1"
                  onClick={() => handleChapter('remove', chapter.chapterId)}
                  width={22}
                />
              </div>
              {!chapter.collapsed && (
                <div className="p-4">
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div key={lectureIndex} className="flex justify-between items-center mb-2 bg-white rounded-xl px-3 py-2 shadow-sm border border-gray-100">
                      <span className="text-gray-700">
                        <span className="font-semibold text-teal-700">{lectureIndex + 1}.</span> {lecture.lectureTitle} - {lecture.lectureDuration} mins -{' '}
                        <a href={lecture.lectureUrl} target="_blank" rel="noopener noreferrer" className="text-teal-600 underline hover:text-teal-800">Link</a> -{' '}
                        <span className={lecture.isPreviewFree ? 'text-green-600' : 'text-gray-400'}>
                          {lecture.isPreviewFree ? 'Free Preview' : 'Paid'}
                        </span>
                      </span>
                      <img
                        src={assets.cross_icon}
                        alt=""
                        className="cursor-pointer hover:bg-red-50 rounded-full p-1"
                        onClick={() => handleLecture('remove', chapter.chapterId, lectureIndex)}
                        width={20}
                      />
                    </div>
                  ))}
                  <div
                    className="inline-flex bg-teal-50 text-teal-700 rounded-xl cursor-pointer mt-2 px-4 py-2 font-semibold hover:bg-teal-100 transition border border-teal-100"
                    onClick={() => handleLecture('add', chapter.chapterId)}
                  >
                    + Add Lecture
                  </div>
                </div>
              )}
            </div>
          ))}
          <div
            className="flex justify-center items-center bg-teal-100 text-teal-700 p-2 rounded-xl cursor-pointer font-semibold hover:bg-teal-200 transition border border-teal-200"
            onClick={() => handleChapter('add')}
          >
            + Add Chapter
          </div>
        </div>

        {/* Popup for adding lecture */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white text-gray-700 p-8 rounded-2xl relative w-full max-w-xs shadow-lg border-2 border-teal-100">
              <h2 className="text-xl font-bold mb-4 text-teal-700">Add Lecture</h2>
              <div className="mb-4">
                <label className="font-semibold mb-1 block">Lecture Title</label>
                <input
                  type="text"
                  className="mt-1 block w-full border-2 rounded-xl py-2 px-3 border-gray-200 focus:border-teal-500 transition bg-gray-50"
                  value={lectureDetails.lectureTitle}
                  onChange={e => setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="font-semibold mb-1 block">Duration (minutes)</label>
                <input
                  type="number"
                  className="mt-1 block w-full border-2 rounded-xl py-2 px-3 border-gray-200 focus:border-teal-500 transition bg-gray-50"
                  value={lectureDetails.lectureDuration}
                  onChange={e => setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="font-semibold mb-1 block">Lecture URL</label>
                <input
                  type="text"
                  className="mt-1 block w-full border-2 rounded-xl py-2 px-3 border-gray-200 focus:border-teal-500 transition bg-gray-50"
                  value={lectureDetails.lectureUrl}
                  onChange={e => setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })}
                />
              </div>
              <div className="mb-6 flex items-center gap-2">
                <input
                  type="checkbox"
                  className="scale-125 accent-teal-600"
                  checked={lectureDetails.isPreviewFree}
                  onChange={e => setLectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked })}
                />
                <span className="text-sm">Is Preview Free?</span>
              </div>
              <button
                onClick={addLecture}
                type="button"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl font-semibold transition"
              >
                Add
              </button>
              <img
                onClick={() => setShowPopup(false)}
                src={assets.cross_icon}
                alt=""
                className="absolute top-4 right-4 w-5 cursor-pointer hover:bg-gray-100 rounded-full p-1"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="bg-teal-700 hover:bg-teal-800 text-white w-max py-3 px-10 rounded-xl font-semibold shadow mt-4 transition"
        >
          Add Course
        </button>
      </form>
    </div>
    )

  }




export default AddCourse