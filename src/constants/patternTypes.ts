import { theme } from "@styles/themes";

export type HumanType = typeof HUMAN_TYPE_LIST[number];
export const HUMAN_TYPE_LIST = [
  {
    type: "가치 선점형",
    emoji: "💎",
    description: "인간지표 낮을 때 매수 → 수익",
    background: theme.colors.sub_blue5,
  },
  {
    type: "트렌드 선점형",
    emoji: "✅",
    description: "인간지표 높을 때 매수 → 수익",
    background: theme.colors.sub_blue6,
  },
  {
    type: "역행 투자형",
    emoji: "📉",
    description: "점수 낮을 때 매수 → 손실",
    background: theme.colors.sub_blue8,
  },
  {
    type: "후행 추종형",
    emoji: "❗",
    description: "인간지표 높을 때 매수 → 손실",
    background: theme.colors.sub_blue9,
  }
] as const;