import { useQuery } from 'react-query';
import { fetchExperiment, fetchReport, fetchResult } from "@controllers/api/portfolio";
import { queryOptions } from './common';

export const useExperimentQuery = () => {
  return useQuery(
    ['bookmarkList'],
    fetchExperiment,
    queryOptions
  );
};

export const useReportQuery = () => {
  return useQuery(
    ['bookmarkList'],
    fetchReport,
    queryOptions
  );
};

export const useResultQuery = () => {
  return useQuery(
    ['bookmarkList'],
    fetchResult,
    queryOptions
  );
};