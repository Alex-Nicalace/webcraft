import { TCredoData, TFact, TResponsedData } from './apiData.types';
import { TProjectListProps } from '../components/ui/ProjectList';
import { AboutMeDataManager } from './AboutMeDataManager';

const BASE_URL = '/data';
const PROJECT_URL = `${BASE_URL}/projects.json`;
const PROJECT_ALL_URL = `${BASE_URL}/projects-all.json`;

export async function getCompetencies() {
  const response = await fetch(`${BASE_URL}/competencies.json`);
  if (!response.ok) throw Error('Не удалось получить комментарии');
  const result = ((await response.json()) ?? []) as string[];
  return result;
}

export async function getFacts() {
  const response = await fetch(`${BASE_URL}/facts.json`);
  if (!response.ok) throw Error('Не удалось получить факты');
  const result = ((await response.json()) ?? []) as TFact[];
  return result;
}

export async function getProjects(isAll: boolean) {
  const url = isAll ? PROJECT_ALL_URL : PROJECT_URL;
  const response = await fetch(url);
  if (!response.ok) throw Error('Не удалось получить проекты');
  const result = ((await response.json()) ?? []) as TProjectListProps['data'];
  return result;
}

export async function getCredo() {
  const response = await fetch(`${BASE_URL}/credo.json`);
  if (!response.ok) throw Error('Не удалось получить кредо');
  const result = ((await response.json()) ?? []) as TCredoData[];
  return result;
}

export async function getAboutMe() {
  const response = await fetch(`${BASE_URL}/about-me.json`);
  if (!response.ok) throw Error('Не удалось получить данные "О себе"');
  const aboutMeData = (await response.json()) as TResponsedData;
  return new AboutMeDataManager(aboutMeData.hunks).getParagraphsByScreenSize(
    aboutMeData.paragraphsByScreenSize
  );
}

export async function sendTrack() {
  try {
    fetch('/api/track.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: window.location.pathname,
        referrer: document.referrer,
      }),
    });
  } catch (e) {
    console.error('Tracking error:', e);
  }
}
