// src/services/mockApi.ts

export interface ResumeFeedback {
  original_resume: string;
  corrected_resume: string;
}

export interface Job {
  id: number;
  title: string;
  company_name: string;
  company_logo: string;
  posted_date: string;
  job_description: string;
  "Seniority level": string;
  "Employment type": "Full-time" | "Part-time" | "Contract" | "Internship";
  "Job function": string;
  Industries: string;
  applicants: string | null;
}

// --- DUMMY DATA ---

const DUMMY_RESUME_FEEDBACK: { [key: string]: ResumeFeedback } = {
  "12345": {
    original_resume: `
# John Doe
john.doe@email.com | (555) 123-4567 | linkedin.com/in/johndoe

## Experience
**Software Intern** @ OldTech Inc. (Jan 2022 - May 2022)
- Wrote some code.
- Fixed bugs sometimes.

## Education
**B.S. in Computer Science** - State University (2018 - 2022)
- GPA: 3.2
`,
    corrected_resume: `
# John Doe
<john.doe@email.com> | (555) 123-4567 | [linkedin.com/in/johndoe](https://linkedin.com/in/johndoe)

## Professional Experience
**Software Development Intern** @ FutureForward Tech (Jan 2022 - May 2022)
- Developed and implemented 3 new features for the company's flagship product using Python and Django, resulting in a 10% increase in user engagement.
- Collaborated with a team of 5 engineers to identify and resolve over 50 critical bugs, improving application stability by 15%.
- Participated in agile development cycles, including daily stand-ups, sprint planning, and retrospectives.

## Education
**Bachelor of Science in Computer Science** - Tech State University (Graduated May 2022)
- Relevant Coursework: Data Structures, Algorithms, Web Development, Database Management.
- GPA: 3.5/4.0

## Skills
- Programming Languages: Python, JavaScript, Java
- Frameworks: Django, React, Spring Boot
- Tools: Git, Docker, AWS
`,
  },
};

const DUMMY_JOBS: Job[] = [
  {
    id: 4216497490,
    title: "Frontend Web Developer",
    company_name: "Poet Farmer",
    company_logo: "https://via.placeholder.com/50?text=PF",
    posted_date: "2025-04-28",
    job_description: `
Our ideal candidate will have the following tasks and responsibilities:<br/><br/><ul><li>Be able to work the frontend (Html/CSS/Javascript)</li><li>Able to work on the frontend of custom Wordpress themes </li><li>Able to work on React, or any of the modern component JS or is willing to pick that up along the way<br/><br/></li></ul>,<br/><br/><ul><li>Skilful in HTML, CSS/SASS, Javascript</li><li>2-3 years of relevant working experience is preferred</li><li>Eager to learn, on and off the job, you always keep up with the latest front-end trends</li><li>Good clean code following the web standards, and a passion for usability</li><li>Experience with responsive web design</li><li>Experience with developing front-end for WordPress, Drupal and Laravel is a plus</li><li>Have been using or passing knowledge of version controlling like git</li><li>Knowing your way around Figma</li><li>Comfortable to express yourself in English, ask for clarifications, discuss approach and express your vision</li><li>Able to work independently<br/><br/></li></ul>[Apply now at https://my.hiredly.com/jobs/jobs-malaysia-poet-farmer-job-frontend-web-developer]
    `,
    "Seniority level": "Entry level",
    "Employment type": "Full-time",
    "Job function": "Engineering and Information Technology",
    Industries: "Software Development",
    applicants: "15 applicants",
  },
  {
    id: 4216497491,
    title: "Backend Developer (Python/Node.js)",
    company_name: "Data Solutions Ltd.",
    company_logo: "https://via.placeholder.com/50?text=DS",
    posted_date: "2025-04-25",
    job_description: `
Join our dynamic team to build scalable backend services.
**Responsibilities:**
- Design and develop RESTful APIs.
- Work with databases like PostgreSQL and MongoDB.
- Ensure code quality and system security.
**Requirements:**
- Proficiency in Python (Django/Flask) or Node.js (Express).
- Experience with microservices architecture.
- Familiarity with cloud platforms (AWS, Azure, or GCP).
    `,
    "Seniority level": "Mid-Senior level",
    "Employment type": "Full-time",
    "Job function": "Engineering",
    Industries: "Data Services, Cloud Computing",
    applicants: null,
  },
  {
    id: 4216497492,
    title: "Full Stack Engineer",
    company_name: "Innovatech",
    company_logo: "https://via.placeholder.com/50?text=IT",
    posted_date: "2025-05-01",
    job_description: `
Seeking a versatile Full Stack Engineer to work on exciting new projects.
**You will:**
- Develop both client-side and server-side applications.
- Collaborate with product managers and designers.
- Write clean, maintainable, and testable code.
**Skills:**
- React, Angular, or Vue.js for frontend.
- Node.js, Python, Ruby, or Java for backend.
- Experience with CI/CD pipelines.
    `,
    "Seniority level": "Mid-Senior level",
    "Employment type": "Full-time",
    "Job function": "Engineering and Information Technology",
    Industries: "Tech, SaaS",
    applicants: "5 applicants",
  },
];

// --- MOCK API FUNCTIONS ---

export const uploadResumeAPI = (file: File): Promise<{ resumeId: string }> => {
  console.log("Simulating resume upload for:", file.name);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate success/failure
      if (Math.random() > 0.1) {
        // 90% success rate
        const resumeId = "12345"; // Dummy ID
        resolve({ resumeId });
      } else {
        reject(new Error("Simulated upload failed. Please try again."));
      }
    }, 1500); // Simulate network delay
  });
};

export const fetchResumeFeedbackAPI = (
  resumeId: string
): Promise<ResumeFeedback> => {
  console.log("Fetching feedback for resumeId:", resumeId);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const feedback = DUMMY_RESUME_FEEDBACK[resumeId];
      if (feedback) {
        resolve(feedback);
      } else {
        reject(new Error("Feedback not found for this resume."));
      }
    }, 1000);
  });
};

export const fetchRecommendedJobsAPI = (_resumeId: string): Promise<Job[]> => {
  // _resumeId is not used for dummy data but would be in a real API
  console.log("Fetching recommended jobs for resumeId:", _resumeId);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DUMMY_JOBS);
    }, 800);
  });
};

export const fetchJobDetailsAPI = (
  _resumeId: string,
  jobId: number
): Promise<Job | undefined> => {
  console.log("Fetching job details for resumeId:", _resumeId, "jobId:", jobId);
  return new Promise((resolve) => {
    setTimeout(() => {
      const job = DUMMY_JOBS.find((j) => j.id === jobId);
      resolve(job);
    }, 500);
  });
};
