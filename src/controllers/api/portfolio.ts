import { fetchAuthData } from './base';

export const fetchExperiment = () =>
  fetchAuthData(`/experiment`);

export const fetchReport = () =>
  fetchAuthData('portfolio/report');


export const fetchResult = () =>
  fetchAuthData('portfolio/result');