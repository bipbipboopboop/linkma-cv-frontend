// src/services/mockApi.ts
import * as Diff from "diff";

const escapeHtml = (unsafe: string): string => {
  if (typeof unsafe !== "string") return ""; // Handle non-string inputs gracefully
  return unsafe
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, '"')
    .replace(/'/g, "'");
};

export const generateDisplayedMarkdown = (
  originalText: string,
  correctedText: string
): string => {
  const changes = Diff.diffWordsWithSpace(originalText, correctedText);
  let result = "";

  changes.forEach((part) => {
    const value = part.value;

    if (part.added) {
      // Added parts are wrapped in a span. The 'value' might contain Markdown
      // that should be processed later by ReactMarkdown.
      result += `<span class="highlight-added">${value}</span>`;
    } else if (part.removed) {
      if (value.trim() === "") {
        // Preserve whitespace-only removed parts if necessary, or omit.
        result += value;
      } else {
        // Removed parts are wrapped in an HTML <del> tag.
        // The content 'value' MUST be HTML-escaped here.
        result += `<del class="diff-removed">${escapeHtml(value)}</del>`;
      }
    } else {
      // common part
      // Common parts are passed through as is, potentially containing Markdown.
      result += value;
    }
  });
  return result;
};

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
  job_url: string
}

export interface FeedbackCategory {
  critique: string[];
  rating: number;
  suggestions: string[];
}

export interface FullResumeFeedback {
  content: FeedbackCategory;
  presentation: FeedbackCategory;
  resumes: {
    // Corrected from your text 'resume' to 'resumes' as in your JSON example
    improved: string;
    original: string;
    displayed_markdown: string;
  };
}

// --- DUMMY DATA ---

const originalResumeForDummy = `# Thanirmalai Nagappan

+6019-479 8675 | 2003thanir10@gmail.com | [LinkedIn](LinkedIn) | [Github](Github) | [Latest Resume](Latest Resume)

## Interests

- Machine Learning and Deep Learning
- Reinforcement Learning
- Cloud Computing
- Distributed Systems
- Backend Development

## Work Experience

### Software Engineer - Internship – Willowglen MSC Berhad
May 2024 – Present

- Implemented role-based access control by integrating permissions across 4 codebases, ensuring secure access
- Developed and maintained permission-checking modules that validated user roles, zones, and IP addresses, ensuring accurate access control for over 100 distinct resources
- Secured RESTful and WebSocket endpoints by designing and deploying security protocols, preventing 95% of potential unauthorized access attempts.
- Collaborated with cross-functional teams to streamline permission validation processes, enhancing system security compliance
- Improved the load time of frontend components from 20 seconds to 2 seconds
- Migrated production database from MySQL to MsSQL
- Tech Stack: Vue.js, Typescript, SQL, Express, Quasar

## Education

### Bachelor of Science (Honours) Software Engineering – Universiti Tunku Abdul Rahman
Sungai Long, Malaysia
Oct. 2022 – Oct. 2025

* GPA 3.80, 3x Dean’s List, 2x President’s List

### Foundation in Information Technology – Multimedia University
Cyberjaya, Malaysia
Aug. 2021 – Jul. 2022

* GPA 3.66, 1x Dean’s List

## Projects

### Onlycars

- Onlycars is a web app that for buying and selling cars online
- Integrated Stripe API for secure payment processing, enabling seamless transactions and webhook verification to ensure payment validity
- Implemented JWT authentication to provide secure access control for various user roles, enhancing overall system security.
- Scraped data from CARSOME to populate the platform with up-to-date car listings, enriching the content available to users.
- Tech Stack: PHP, Javascript, MySQL

### Sorting Algorithm Visualizer

- Developed a web-based application using React to visualize sorting algorithms, including insertion sort, bubble sort, quicksort, merge sort, and selection sort, in real-time.
- Implemented interactive controls allowing users to select different sorting algorithms, adjust array sizes, and observe step-by-step sorting animations.
- Enhanced user engagement and understanding of sorting algorithms by providing real-time visual feedback and detailed animations.
- Tech Stack: React.js, Typescript, Redux

### Aquafarming Smart Fish Farming

- Developed a mobile application using React Native, enabling real-time data visualization of water parameters such as Dissolved Oxygen, pH level, Temperature, and Ammonia Level through interactive dashboards and gauges.
- Implemented user interface components for alert notifications and predictive analytics, enhancing user engagement and proactive aquaculture management.
- Integrated REST API communication with the Data Processing Module and ThingSpeak IoT platform, facilitating seamless data retrieval and display within the app.
- Tech Stack: Arduino, React Native, Javascript, PHP, Laravel, Thingspeak

## Technical Skills

- Programming Languages: Typescript, Javascript, Python, HTML, CSS, Java, PHP
- Web Technology: React.js, Next.js, React Native, Node.js, Express.js, Redux
- Database: PostgreSQL, MySQL, MongoDB
- Cloud Technology: AWS, Firebase, Docker, Github

## Honors & Awards

- Solved around 200 problems in Leetcode
- SQL (Intermediate)
- SQL (Beginner)
- Networking Basics
`;

const improvedResumeForDummy = `# Thanirmalai Nagappan

+6019-479 8675 | 2003thanir10@gmail.com | [LinkedIn](LinkedIn) | [Github](Github) | [Latest Resume](Latest Resume)

## Interests

- Proficient in Machine Learning algorithms and Deep Learning frameworks
- Expertise in Reinforcement Learning methodologies
- Knowledge of Cloud Computing platforms and services
- Understanding of Distributed Systems architectures
- Skilled in Backend Development practices and technologies

## Work Experience

### Software Engineer - Internship – Willowglen MSC Berhad
May 2024 – Present

- Implemented role-based access control by integrating permissions across 4 codebases, ensuring secure access
- Developed and maintained permission-checking modules that validated user roles, zones, and IP addresses, ensuring accurate access control for over 100 distinct resources
- Secured RESTful and WebSocket endpoints by designing and deploying security protocols, preventing 95% of potential unauthorized access attempts.
- Streamlined permission validation processes, reducing average validation time by 15% and enhancing system security compliance.
- Improved the load time of frontend components from 20 seconds to 2 seconds
- Migrated a 50GB production database from MySQL to MsSQL, resulting in a 20% improvement in query response time.
- Tech Stack: Vue.js, Typescript, SQL, Express, Quasar

## Education

### Bachelor of Science (Honours) Software Engineering – Universiti Tunku Abdul Rahman
Sungai Long, Malaysia
Oct. 2022 – Oct. 2025

* GPA 3.80, 3x Dean’s List, 2x President’s List

### Foundation in Information Technology – Multimedia University
Cyberjaya, Malaysia
Aug. 2021 – Jul. 2022

* GPA 3.66, 1x Dean’s List

## Projects

### Onlycars

- Onlycars is a web app that for buying and selling cars online
- Integrated Stripe API, processing over 500 secure transactions in the first month with 100% successful webhook verification.
- Implemented JWT authentication to provide secure access control for various user roles, enhancing overall system security.
- Scraped data from CARSOME, which increased user engagement by 30% due to enriched car listings.
- Tech Stack: PHP, Javascript, MySQL

### Sorting Algorithm Visualizer

- Developed a web-based application using React to visualize sorting algorithms, including insertion sort, bubble sort, quicksort, merge sort, and selection sort, in real-time.
- Implemented interactive controls allowing users to select different sorting algorithms, adjust array sizes, and observe step-by-step sorting animations.
- Enhanced user engagement with over 200 active users per week using interactive controls to understand sorting algorithms.
- Tech Stack: React.js, Typescript, Redux

### Aquafarming Smart Fish Farming

- Developed a mobile application using React Native, enabling real-time data visualization of water parameters such as Dissolved Oxygen, pH level, Temperature, and Ammonia Level through interactive dashboards and gauges.
- Implemented user interface components for alert notifications triggered by pH levels outside the range of 6.5-7.5, ensuring proactive aquaculture management.
- Integrated REST API communication with the Data Processing Module and ThingSpeak IoT platform, facilitating seamless data retrieval and display within the app.
- Tech Stack: Arduino, React Native, Javascript, PHP, Laravel, Thingspeak

## Technical Skills

- Programming Languages: Typescript, Javascript: Angular, Python: TensorFlow, PyTorch, HTML, CSS, Java, PHP
- Web Technology: React.js, Next.js, React Native, Node.js, Express.js, Redux
- Database: PostgreSQL: SQLAlchemy, MySQL: Sequelize, MongoDB
- Cloud Technology: AWS: EC2, S3, Lambda, Firebase, Docker, Github

## Honors & Awards

- Solved 200 LeetCode problems, enhancing problem-solving skills in data structures and algorithms
- SQL (Intermediate)
- SQL (Beginner)
- TCP/IP
`;

// Modify your FullResumeFeedback interface to include displayed_markdown
export interface FullResumeFeedback {
  content: FeedbackCategory;
  presentation: FeedbackCategory;
  resumes: {
    original: string; // Keep original for reference if needed
    improved: string; // Keep improved for reference if needed
    displayed_markdown: string; // This will be rendered
  };
}

const DUMMY_FULL_RESUME_FEEDBACK: { [key: string]: FullResumeFeedback } = {
  "12345": {
    content: {
      critique: [
        "Action Orientation: Generally good use of action verbs, but some bullets could be more impactful by further emphasizing the result of the action.",
        "Specificity: The resume provides some specific details (e.g., tech stacks, number of resources), but could benefit from more quantifiable outcomes and metrics.",
        "Impactfulness: Some statements focus more on duties than substantive results. For example, 'Developed and maintained permission-checking modules' could be improved by quantifying the impact of these modules.",
        "Verb Quality: Generally strong verb usage, but some verbs (e.g., 'maintained') could be replaced with more dynamic alternatives to showcase initiative.",
        "Redundancy Check: Minimal redundancy. The content is generally concise and varied.",
        "Conciseness: The resume is generally concise, but some bullet points could be shortened without losing essential details.",
        "Grammar & Mechanics: No apparent grammatical, spelling, or punctuation errors.",
        "Section Completeness and Presence: The resume includes essential sections such as Experience, Education, Projects, and Skills. The Interest and Honors & Awards sections are present but could be improved.",
        "Bullet Point Quality: Bullet points are mostly concise and results-oriented, but consistency in structure could be improved by always leading with the result or impact.",
        "Date Formatting: Consistent date formatting is used.",
        "Length Appropriateness: The content fits within one page but could be optimized to provide more depth in certain areas.",
      ],
      rating: 70.0,
      suggestions: [
        "In the 'Interest' section, transform interests into skills or areas of expertise. Instead of listing 'Machine Learning and Deep Learning,' consider 'Proficient in Machine Learning algorithms and Deep Learning frameworks.'",
        "In the Experience section for the Willowglen internship, quantify the impact of streamlining permission validation processes. For example, 'Streamlined permission validation processes, reducing average validation time by 15% and enhancing system security compliance.'",
        "In the Experience section, when mentioning migrating the database, specify the size and any performance improvements. For example, 'Migrated a 50GB production database from MySQL to MsSQL, resulting in a 20% improvement in query response time.'",
        "In the Projects section for Onlycars, provide specific metrics on the impact of Stripe API integration. For example, 'Integrated Stripe API, processing over 500 secure transactions in the first month with 100% successful webhook verification.'",
        "In the Projects section for Onlycars, add details regarding user base growth or sales increases due to the platform. For example, 'Scraped data from CARSOME, which increased user engagement by 30% due to enriched car listings.'",
        "In the Projects section for Sorting Algorithm Visualizer, quantify the user engagement. For example, 'Enhanced user engagement with over 200 active users per week using interactive controls to understand sorting algorithms.'",
        "In the Projects section for Aquafarming Smart Fish Farming, provide specific sensor data ranges and alert trigger conditions. For example, 'Implemented alert notifications triggered by pH levels outside the range of 6.5-7.5, ensuring proactive aquaculture management.'",
        "In the Technical Skills section, add specific AWS services used (e.g., EC2, S3, Lambda) instead of just 'AWS'.",
        "In the Technical Skills section, add specific database management tools or ORMs used with each database technology (e.g., 'MySQL: Sequelize', 'PostgreSQL: SQLAlchemy').",
        "In the Honors & Awards section, provide context for solving LeetCode problems. For example, 'Solved 200 LeetCode problems, enhancing problem-solving skills in data structures and algorithms'.",
        "Replace generic terms like 'Networking Basics' with specific networking protocols or technologies you are familiar with (e.g., 'TCP/IP', 'HTTP', 'DNS').",
        "Add a 'Professional Summary' section at the top summarizing your skills and career goals, tailoring it to the specific types of roles you are targeting.",
        "If available, incorporate metrics related to code quality, such as 'Reduced bug reports by 15% through rigorous testing' or 'Improved code maintainability by adhering to clean code principles'.",
        "Add specific projects or contributions related to Cloud Computing and Distributed Systems in the 'Projects' section to demonstrate practical application of these skills.",
        "Include specific frameworks or libraries used within each programming language to showcase expertise (e.g., 'Python: TensorFlow, PyTorch', 'JavaScript: Angular, Vuex').",
        "For each project, add a brief description of its purpose and your specific role within the project. This provides context and helps highlight your contributions.",
        "Ensure consistent use of action verbs across all bullet points. Start each bullet point with a strong action verb to emphasize accomplishments.",
        "Check for and eliminate any redundant information within the resume to maximize the impact of each statement.",
        "Use consistent date formatting throughout the resume (e.g., Month Year – Month Year or MM/YYYY – MM/YYYY).",
        "Ensure the LinkedIn and GitHub links are functional and lead directly to your profiles.",
        "In education, expand on relevant coursework or specializations related to software engineering.",
        "Use the projects section to highlight any personal projects that demonstrate your passion for software engineering or specific technologies.",
        "Ensure all technical skills listed are relevant to the types of roles you are applying for, and prioritize the most important skills at the top.",
        "Add any relevant certifications related to programming languages, databases, or cloud technologies to the 'Honors & Awards' section.",
      ],
    },
    presentation: {
      critique: [
        "*Font Usage:* The font is basic and somewhat inconsistent throughout the document. The headers and body text appear to use different fonts, which detracts from the overall professionalism.",
        "*Margins and Padding:* The margins are narrow, especially on the sides, making the content feel cramped. There is little padding within sections, causing content to run together.",
        "*Section Layout and Alignment:* The section layout is functional but lacks visual appeal. The alignment is inconsistent, particularly with the dates and bullet points.",
        "*Color Scheme:* The resume uses only black and white, which is professional but could benefit from a subtle accent color to highlight key sections or titles. However, the lack of color makes it appear quite plain.",
        "*Heading Hierarchy:* The heading hierarchy is somewhat weak. The section titles are not significantly larger or bolder than the body text, making it difficult to quickly scan the resume.",
        "*Bullet Points and Lists:* Bullet points are used, but the spacing and alignment are not always consistent. This causes a lack of uniformity.",
        "*Line Spacing:* The line spacing is tight, making the text appear dense and less readable. Increasing the line spacing would improve the visual appeal and readability.",
        "*Borders and Boxes:* There are no borders or boxes used, which contributes to the resume's minimalist design. However, the lack of visual containers makes it difficult to quickly identify different sections.",
        "*Visual Hierarchy:* The visual hierarchy is not strong. The most important information (e.g., name, job titles) does not stand out significantly from the surrounding text.",
        "*Symmetry and Balance:* The symmetry and balance are generally acceptable, but the overall layout could be improved to create a more visually balanced document.",
        "*Document Proportions:* The document proportions are adequate, but the content feels somewhat cramped due to the narrow margins and tight line spacing.",
        "*Unnecessary Visual Clutter:* There isn't excessive visual clutter, but the resume could benefit from some visual enhancements to make it more engaging. The minimalist design, while clean, is too simple.",
        "*Interest Section:* The interest section lacks visual organization and is just a plain list. It could benefit from icons or a different layout.",
        "*Experience Section:* The experience section is dense. Dates are inline which decreases readibility. A better visual grouping of job title, company, and responsibilities is needed.",
        "*Education Section:* The formatting of the education section is basic. The GPA is not visually separated from the degree details, making it harder to quickly locate.",
        "*Projects Section:* The projects section is text-heavy. The tech stack is embedded within the description, making it less noticeable.",
        "*Technical Skills Section:* The technical skills are listed in a block of text, making it hard to scan. The list could be better organized into categories or columns.",
        "*Honors & Awards Section:* The honors and awards section is a simple list, which lacks visual interest. More context or detail could be added to each item.",
      ],
      rating: 60.0,
      suggestions: [
        "*Overall Font Consistency:* Use the same font throughout the entire document for a cleaner look. Currently, different sections seem to use different fonts, which can be distracting.",
        "*Header Font Size:* Increase the font size of the name at the top to make it stand out more. It should be the most prominent element on the page.",
        "*Contact Information Spacing:* Add more space between the contact information (phone number, email, LinkedIn, GitHub) to improve readability. Consider using icons for each contact method.",
        '*Section Heading Style:* Standardize the style of section headings (e.g., "INTEREST", "EXPERIENCE", "EDUCATION"). Use a consistent font, size, and capitalization for all headings.',
        "*Margins and Padding:* Increase the margins around the edges of the document to give the content more room to breathe. Add more padding within each section to separate the content from the section headings.",
        "*Bullet Point Alignment:* Ensure that all bullet points are consistently aligned. The current alignment is slightly off in some sections.",
        "*Line Spacing within Sections:* Increase the line spacing within each section to improve readability. The current line spacing is too tight, making the text look dense.",
        "*Experience Section Formatting:* Improve the formatting of the experience section. Use a consistent format for the company name, job title, and dates. Consider using a two-column layout to separate the company/title from the dates.",
        "*Date Alignment:* Right-align the dates in the Experience and Education sections to create a cleaner look. This will improve the visual flow of the document.",
        "*Education Section Formatting:* Format the education section to clearly show the degree name, university name, and dates of attendance. Use consistent formatting for all entries.",
        "*Projects Section Clarity:* Make the projects section more visually appealing by using a consistent format for the project name, description, and tech stack. Consider using bullet points to list the tech stack.",
        "*Technical Skills Section:* Format the technical skills section into columns for better readability. Group related skills together.",
        "*Honors & Awards Section:* Use bullet points to list the honors and awards. Add more details to each entry to provide context.",
        "*Color Scheme:* Use a professional color scheme (e.g., black and white, or a muted color palette). Avoid using excessive colors, which can be distracting.",
        "*Visual Hierarchy:* Use font size, bolding, and indentation to create a clear visual hierarchy. Emphasize the most important information (e.g., job titles, company names).",
        "*Remove Unnecessary Lines:* Remove any unnecessary lines or dividers that do not serve a clear purpose. These can add visual clutter and distract from the content.",
        "*Balance:* Adjust the layout to achieve better balance across the page. Avoid having too much content on one side of the page and not enough on the other.",
        "*White Space Usage:* Ensure there's enough white space around each section to visually separate them. Don't cram too much information together.",
        "*Document Proportions:* Ensure that the document proportions are appropriate. The content should not be too cramped or too empty.",
        "*Consider using a template* There are many resume templates online that you can use as a starting point. This can help you create a resume that is both visually appealing and easy to read.",
      ],
    },
    resumes: {
      original: originalResumeForDummy,
      improved: improvedResumeForDummy,
      displayed_markdown: generateDisplayedMarkdown(
        originalResumeForDummy,
        improvedResumeForDummy
      ),
    },
  },
};


export const uploadResumeAPI = (file: File): Promise<{ resumeId: string, url: string }> => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:8000/upload-resume", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to upload resume. Please try again.");
      }
      return response.json();
      })  
      .then((data) => {
        resolve({ resumeId: data.id, url: data.file_url });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const fetchRecommendedJobsAPI = (resume: string): Promise<Job[]> => {
  return fetch('http://localhost:8000/job-matching', {
    method: "POST",
    body: JSON.stringify({'resume': resume }),
    headers: {
      'Content-Type': "application/json"
    }
  })
    .then(res => {
      return res.json()
    })
};

export const fetchJobDetailsAPI = (
  _resumeId: string,
  jobId: number
): Promise<Job | undefined> => {
  console.log("Fetching job details for resumeId:", _resumeId, "jobId:", jobId);
 return fetch(`http://localhost:8000/job-detail?id=${jobId}`, {
    method: "GET"
  })
    .then(res => {
      return res.json()
    })
};

// Update the fetchResumeFeedbackAPI function signature and body
export const fetchResumeFeedbackAPI = (
  resumeId: string
): Promise<FullResumeFeedback> => {
  console.log("Fetching full feedback for resumeId:", resumeId);
  return fetch('http://localhost:8000/analyze-resume', {
    method: "POST",
    body: JSON.stringify({'id': resumeId }),
    headers: {
      'Content-Type': "application/json"
    }
  })
    .then(res => {
      return res.json()
    })
};
