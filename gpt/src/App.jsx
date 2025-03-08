import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [ count, setCount ] = useState(0)
  const [ code, setCode ] = useState("")

  const [ review, setReview ] = useState(``)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    const response = await axios.post('http://localhost:3000/ai/getresponse', { code })
    setReview(response.data)
  }

  return (
    <>
    <Navbar/>
      <main className='h-[100%] w-[100%] p-[1.5rem] flex gap-[1rem]'>
        <div className="h-[100%] flex-1/2 rounded-[0.7rem] bg-[#000000] relative">
          <div className="h-[100%] w-[100%] m-0 rounded-[0.7rem] bg-[#000000]">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
                overflowY:"auto",
                color:"white"
              }}
            />
          </div>
          <div
          style={{ padding:"4px 20px"}}
            onClick={reviewCode}
            className="absolute bottom-5 right-10 bg-amber-100 text-2xl rounded-md text-black text-500 cursor-pointer z-50 ">Review</div>
        </div>
        <div className="bg-[#343434] p-[1rem, 2rem] text-[1.5rem] overflow-auto h-[100%] flex-1/2 rounded-[0.7rem]">
          <Markdown

            rehypePlugins={[ rehypeHighlight ]}

          >{review}</Markdown>
        </div>
      </main>
    </>
  )
}



export default App
