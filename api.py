import json
import logging
from bs4 import BeautifulSoup
from urllib.parse import urlencode
import requests
import os


LINKEDIN_API_URL = 'https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search'
LINKEDIN_JOB_DESC_API_URL = 'https://www.linkedin.com/jobs-guest/jobs/api/jobPosting/'

dir = os.path.dirname(os.path.abspath(__file__)) + '/jobs/'

job_ids = {1}


def get_job_desc(id):
    url = LINKEDIN_JOB_DESC_API_URL + id
    res = requests.get(url)
    bs = BeautifulSoup(res.content, 'html.parser')

    num_applicants_el = bs.find(
        'span',  class_='num-applicants__caption topcard__flavor--metadata topcard__flavor--bullet')
    num_applicants = num_applicants_el.get_text(
        strip=True) if num_applicants_el else None

    description_el = bs.find(
        'div', class_="""show-more-less-html__markup show-more-less-html__markup--clamp-after-5 relative overflow-hidden""")
    description = description_el.decode_contents() if description_el else None

    add_descriptions = {}
    additional_desc = bs.find_all(
        'li', class_='description__job-criteria-item')
    for li in additional_desc:
        item_name = li.find(
            'h3', class_='description__job-criteria-subheader').get_text(strip=True)
        item_desc = li.find(
            'span', class_='description__job-criteria-text description__job-criteria-text--criteria').get_text(strip=True)
        add_descriptions[item_name] = item_desc

    return {
        'job_description': description,
        **add_descriptions,
        'applicants': num_applicants
    }


def get_job_details(keyword, loct, start):
    params = {'keywords': keyword, 'location': loct, 'start': start}
    url = LINKEDIN_API_URL + '?' + urlencode(params)
    res = requests.get(url)
    bs = BeautifulSoup(res.content, 'html.parser')
    li_items = bs.find_all('li')
    jobs = []
    for li in li_items:
        job_card = li.find('div', 'base-card')
        if not job_card:
            continue
        # Job ID
        job_raw_id = job_card.get_attribute_list('data-entity-urn')[0]
        job_id = job_raw_id.split(':')[-1]

        if int(job_id) in job_ids:
            continue

        # Job Title
        title = job_card.find(
            'h3', class_='base-search-card__title').get_text(strip=True)

        # Job Link
        job_link = job_card.find('a', class_='base-card__full-link')['href']

        # Company Name
        company = job_card.find(
            'h4', class_='base-search-card__subtitle').get_text(strip=True)

        # Job location
        location = job_card.find(
            'span', class_='job-search-card__location').get_text(strip=True)

        # Posting date
        date = job_card.find('time')['datetime']

        # Company Logo URL
        company_logo_url = job_card.find(
            'img', class_='artdeco-entity-image').get_attribute_list('data-delayed-url')[0]

        additional_job_desc = get_job_desc(job_id)
        job = {
            'id': int(job_id),
            'title': title,
            'company_name': company,
            'company_logo': company_logo_url,
            'location': location,
            'job_url': job_link,
            'posted_date': date,
            **additional_job_desc
        }
        job_ids.add(int(job_id))
        print('Completed job : ', job_id)
        jobs.append(job)

    return jobs


# -*- coding: utf-8 -*-

# To enable the initializer feature (https://help.aliyun.com/document_detail/2513452.html)
# please implement the initializer function as below：
# def initializer(context):
#   logger = logging.getLogger()
#   logger.info('initializing')

LINKEDIN_API_URL = 'https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search'
LINKEDIN_JOB_DESC_API_URL = 'https://www.linkedin.com/jobs-guest/jobs/api/jobPosting/'

dir = os.path.dirname(os.path.abspath(__file__)) + '/jobs/'

job_ids = {1}


def get_job_desc(id):
    url = LINKEDIN_JOB_DESC_API_URL + id
    res = requests.get(url)
    bs = BeautifulSoup(res.content, 'html.parser')

    num_applicants_el = bs.find(
        'span',  class_='num-applicants__caption topcard__flavor--metadata topcard__flavor--bullet')
    num_applicants = num_applicants_el.get_text(
        strip=True) if num_applicants_el else None

    description_el = bs.find(
        'div', class_="""show-more-less-html__markup show-more-less-html__markup--clamp-after-5 relative overflow-hidden""")
    description = description_el.decode_contents() if description_el else None

    add_descriptions = {}
    additional_desc = bs.find_all(
        'li', class_='description__job-criteria-item')
    for li in additional_desc:
        item_name = li.find(
            'h3', class_='description__job-criteria-subheader').get_text(strip=True)
        item_desc = li.find(
            'span', class_='description__job-criteria-text description__job-criteria-text--criteria').get_text(strip=True)
        add_descriptions[item_name] = item_desc

    return {
        'job_description': description,
        **add_descriptions,
        'applicants': num_applicants
    }


def get_job_details(keyword, loct, start):
    params = {'keywords': keyword, 'location': loct, 'start': start}
    url = LINKEDIN_API_URL + '?' + urlencode(params)
    res = requests.get(url)
    bs = BeautifulSoup(res.content, 'html.parser')
    li_items = bs.find_all('li')
    jobs = []
    for li in li_items:
        job_card = li.find('div', 'base-card')
        if not job_card:
            continue
        # Job ID
        job_raw_id = job_card.get_attribute_list('data-entity-urn')[0]
        job_id = job_raw_id.split(':')[-1]

        if int(job_id) in job_ids:
            continue

        # Job Title
        title = job_card.find(
            'h3', class_='base-search-card__title').get_text(strip=True)

        # Job Link
        job_link = job_card.find('a', class_='base-card__full-link')['href']

        # Company Name
        company = job_card.find(
            'h4', class_='base-search-card__subtitle').get_text(strip=True)

        # Job location
        location = job_card.find(
            'span', class_='job-search-card__location').get_text(strip=True)

        # Posting date
        date = job_card.find('time')['datetime']

        # Company Logo URL
        company_logo_url = job_card.find(
            'img', class_='artdeco-entity-image').get_attribute_list('data-delayed-url')[0]

        additional_job_desc = get_job_desc(job_id)
        job = {
            'id': int(job_id),
            'title': title,
            'company_name': company,
            'company_logo': company_logo_url,
            'location': location,
            'job_url': job_link,
            'posted_date': date,
            **additional_job_desc
        }
        job_ids.add(int(job_id))
        print('Completed job : ', job_id)
        jobs.append(job)

    return jobs


CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',  # Restrict in production
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Methods': 'OPTIONS, GET'
}


def handler(event, context):
    logger = logging.getLogger()

    try:
        # Default to empty dict if no body
        body = json.loads(event.get('body', '{}'))
    except json.JSONDecodeError:
        logger.error("Invalid JSON format in request body.")
        return {
            'statusCode': 400,
            'headers': CORS_HEADERS,
            'body': json.dumps({'error': 'Invalid JSON format in request body'})
        }
    keyword = body.get('keyword')
    loct = body.get('location')
    start = body.get('start')

    if not keyword or not loct or not start or isinstance(keyword, str):
        return {
            'statusCode': 400,
            'headers': CORS_HEADERS,
            'body': json.dumps({'error': "Missing or invalid body in request body"})
        }

    details = get_job_details(keyword, loct, start)
    return {
        'statusCode': 200,
        'headers': CORS_HEADERS,
        'body': json.dumps({'details': details})
    }
