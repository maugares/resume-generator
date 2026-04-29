import type { ResumeData } from '../types/resume'

export const mockResumeData: ResumeData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '555-555-5555',
  address: '123 Main St, Anytown, USA',
  education: [
    {
      institution: 'University of Example',
      degree: 'Bachelor of Science in Computer Science',
      startDate: '2015-09-01',
      endDate: '2019-06-01',
    },
    {
      institution: 'Example High School',
      degree: 'High School Diploma',
      startDate: '2011-09-01',
      endDate: '2015-06-01',
    },
  ],
  experience: [
    {
      position: 'Software Engineer',
      company: 'Tech Company',
      startDate: '2019-06-01',
      endDate: '2021-08-01',
      description:
        'Worked on various projects using JavaScript, React, and Node.js.',
    },
    {
      position: 'Intern',
      company: 'Startup Inc.', 
      startDate: '2018-06-01',
      endDate: '2018-08-01',
      description: 'Assisted in developing a web application using React.',
    },
  ],
  skills: ['JavaScript', 'React', 'Node.js'],
}
