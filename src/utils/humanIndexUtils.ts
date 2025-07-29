import { theme } from "@styles/themes";

// 타입별 이모지 매핑
export const getTypeEmoji = (type: string): string => {
  switch (type) {
    case '완전 인간 아님': return '😱';
    case '인간 아님': return '😞';
    case '평범 인간': return '😐';
    case '인간 맞음': return '🙂';
    case '인간 완전 맞음': return '😂';
    default: return '🚨';
  }
};

// 점수대별 배경 색상 매핑
export const getTypeColor = (type: string): string => {
  switch (type) {
    case '완전 인간 아님': return theme.colors.red;
    case '인간 아님': return theme.colors.red;
    case '평범 인간': return theme.colors.sub_gray9;
    case '인간 맞음': return theme.colors.sub_gray1;
    case '인간 완전 맞음': return theme.colors.sub_gray1;
    default: return theme.colors.sub_gray1;
  }
};

// 벨 커브 데이터 생성 (정규분포 근사)
export const generateBellCurveData = () => {
  const data = [];
  for (let i = 0; i <= 10; i += 0.5) {
    const density = Math.exp(-Math.pow((i - 5) / 1.5, 2) / 2) / (1.5 * Math.sqrt(2 * Math.PI));
    data.push({ score: i, density: density * 100 });
  }
  return data;
};

// 점수에 따른 타입 결정
export const getTypeByScore = (score: number): string => {
  if (score >= 0 && score <= 2) return '완전 인간 아님';
  if (score > 2 && score <= 4) return '인간 아님';
  if (score > 4 && score <= 6) return '평범 인간';
  if (score > 6 && score <= 8) return '인간 맞음';
  if (score > 8 && score <= 10) return '인간 완전 맞음';
  return '평범 인간';
};

// 성공률 계산
export const calculateSuccessRate = (profitCount: number, totalCount: number): string => {
  const rate = (profitCount / totalCount) * 100;
  if (rate >= 80) return '80% 이상';
  if (rate >= 60) return '60~80%';
  if (rate >= 40) return '40~60%';
  if (rate >= 20) return '20~40%';
  return '0~20%';
}; 