import React from 'react'

export const ResumePreview = () => {
  return (
    <div className="flex justify-center items-center min-h-screen p-10">
      <article className="flex w-a4 h-a4 p-12 bg-white font-sans print:m-0 ">
        {/* Sidebar */}
        <aside className="w-1/3 flex flex-col items-center gap-10 py-10 px-4 bg-blue-300">
          {/* Avatar */}
          <Avatar />
          {/* Contact Info */}
          <ContactInfo />
          {/* Education */}
          <Education />
          {/* Skills */}
          <Skills />
        </aside>
        {/* Main content */}
        <div className="flex-1 bg-red-300">
          {/* Name */}
          <Name />
          {/* Experience */}
          <Experience />
        </div>
      </article>
    </div>
  )
}

function Header({
  title,
  ...props
}: { title: string } & React.HTMLAttributes<HTMLHeadingElement>) {
  const { className, ...rest } = props

  return (
    <h3
      className={`bg-amber-600 border border-yellow-200 text-[14px] font-bold uppercase border-b border-white/20 tracking-[1px] ${className}`}
      {...rest}
    >
      {title}
    </h3>
  )
}

function Avatar({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props
  return (
    <div
      className={`w-32 h-32 bg-[#777] rounded-full mx-auto border-4 border-white/10 ${className}`}
      {...rest}
    >
      {/* Placeholder for avatar image */}
    </div>
  )
}

function ContactInfo() {
  return (
    <div className="w-full bg-lime-400">
      <Header title="Header" />
      <div className=" bg-gray-400 ">Text</div>
      <div className=" bg-gray-400 ">Text</div>
      <div className=" bg-gray-400 ">Text</div>
      {/* Placeholder for contact info */}
    </div>
  )
}

function Item({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props
  return (
    <div className={`m-2 ${className}`} {...rest}>
      <div className="bg-gray-400 w-full font">
        Full Stack Web Developer
      </div>
      <div className="bg-gray-400 w-full mt-1">
        Company Name
      </div>
      <div className="bg-gray-400 w-full mt-1">
        Jan 2020 - Present
      </div>
      {/* {children} */}
    </div>
  )
}

function Education() {
  return (
    <div className="w-full bg-lime-400">
      <Header title="Header" />
      <Item className='bg-red-400'>Text</Item>
      <Item>Text</Item>
      <Item>Text</Item>
     
      {/* Placeholder for education info */}
    </div>
  )
}

function Skills() {
  return <div></div>
}

function Name() {
  return <div></div>
}

function Experience() {
  return <div></div>
}
