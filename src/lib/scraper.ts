import axios from 'axios';
import * as cheerio from 'cheerio';

interface LinkedInJobData {
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  jobUrl: string;
}

/**
 * Extracts job data from a LinkedIn job posting URL using a lightweight approach
 * @param url LinkedIn job posting URL
 * @returns Promise with structured job data
 */
export async function getLinkedInJobData(
  url: string,
): Promise<LinkedInJobData | null> {
  if (!url.includes('linkedin.com/jobs/')) {
    throw new Error('Invalid LinkedIn job URL');
  }

  try {
    // Make a request to the job posting page
    const response = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
        Accept: 'text/html',
      },
    });

    // Parse the HTML
    const $ = cheerio.load(response.data);

    // Extract job data
    const title = $('.top-card-layout__title').text().trim();
    const company = $('.topcard__org-name-link').text().trim();
    const location = $('.topcard__flavor--bullet').text().trim();
    const description = $('.description__text').text().trim();

    // Extract requirements
    const requirements: string[] = [];
    $('.description__text li').each((_, element) => {
      const text = $(element).text().trim();
      if (text) requirements.push(text);
    });

    return {
      title,
      company,
      location,
      description,
      requirements,
      jobUrl: url,
    };
  } catch (error) {
    console.error('Error fetching LinkedIn job data:', error);
    return null;
  }
}

/**
 * Alternative approach: Use LinkedIn's public API to get job data
 * This requires a job ID which can be extracted from the URL
 */
export async function getLinkedInJobDataFromAPI(jobId: string): Promise<any> {
  try {
    // LinkedIn's public API endpoint for job details
    const apiUrl = `https://www.linkedin.com/jobs-guest/jobs/api/jobPosting/${jobId}`;

    const response = await axios.get(apiUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
      },
    });

    // The response is HTML, so we need to parse it
    const $ = cheerio.load(response.data);

    return {
      title: $('.top-card-layout__title').text().trim(),
      company: $('.topcard__org-name-link').text().trim(),
      location: $('.topcard__flavor--bullet').text().trim(),
      description: $('.description__text').text().trim(),
      jobUrl: `https://www.linkedin.com/jobs/view/${jobId}/`,
    };
  } catch (error) {
    console.error('Error fetching LinkedIn job data from API:', error);
    return null;
  }
}

/**
 * Helper function to extract job ID from LinkedIn URL
 */
export function extractJobIdFromUrl(url: string): string | null {
  const match = url.match(/linkedin\.com\/jobs\/view\/([0-9]+)/);
  return match ? match[1] : null;
}
