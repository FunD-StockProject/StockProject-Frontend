import { useState } from 'react';
import BottomSheet from './BottomSheet';

import BellCurveChart from '../BellCurveChart/BellCurveChart';
import { TypeSelector, TypeButton, TypeContent, TypeTitle, TypeDescription, BellCurveContainer } from './HumanTypeBottomSheet.Style';
import { getTypeEmoji } from '@utils/humanIndexUtils';

interface HumanTypeBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const HUMAN_TYPES = [
  { id: 'completely_not_human', name: '완전 인간 아님', range: '0~20%', userScore: 1, description: '성공률이 0~20%인 지표를 말해요!\n점수가 낮을 때 매수하여 수익을 보는 투자 패턴을 보여요.\n남들이 관심 없을 때 진입을 해두는 경우가 많아요!' },
  { id: 'not_human', name: '인간 아님', range: '20~40%', userScore: 3, description: '성공률이 20~40%인 지표를 말해요!\n점수가 낮을 때 매수하여 수익을 보는 투자 패턴을 보여요.\n남들이 관심 없을 때 진입을 해두는 경우가 많아요!' },
  { id: 'normal_human', name: '평범 인간', range: '40~60%', userScore: 5, description: '성공률이 40~60%인 지표를 말해요!\n점수가 중간일 때 매수하여 수익을 보는 투자 패턴을 보여요.\n시장의 평균적인 관심을 받는 종목에 진입하는 경우가 많아요!' },
  { id: 'human_correct', name: '인간 맞음', range: '60~80%', userScore: 7, description: '성공률이 60~80%인 지표를 말해요!\n점수가 높을 때 매수하여 수익을 보는 투자 패턴을 보여요.\n시장에서 관심을 받는 종목에 진입하는 경우가 많아요!' },
  { id: 'human_totally_correct', name: '인간 완전 맞음', range: '80~100%', userScore: 9, description: '성공률이 80~100%인 지표를 말해요!\n점수가 매우 높을 때 매수하여 수익을 보는 투자 패턴을 보여요.\n시장에서 큰 관심을 받는 종목에 진입하는 경우가 많아요!' },
];

function HumanTypeBottomSheet({ isOpen, onClose }: HumanTypeBottomSheetProps) {
  const [selectedType, setSelectedType] = useState<string>('completely_not_human');

  const selectedTypeData = HUMAN_TYPES.find(type => type.id === selectedType);

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="다른 '인간지표' 유형은 뭐가 있어요?"
    >
      <div>
        <p style={{ marginBottom: '20px', fontSize: '14px', lineHeight: '1.5' }}>
          실험이 끝났을 때 수익률이 0이상인 실험을,<br /> 성공한 실험으로 보고 있어요
        </p>

        <TypeSelector>
          {HUMAN_TYPES.map((type) => (
            <TypeButton
              key={type.id}
              isSelected={selectedType === type.id}
              onClick={() => setSelectedType(type.id)}
            >
              {getTypeEmoji(type.name)} {type.name}
            </TypeButton>
          ))}
        </TypeSelector>

        {selectedTypeData && (
          <TypeContent>
            <TypeTitle>{selectedTypeData.name} 지표란?</TypeTitle>
            <TypeDescription>{selectedTypeData.description}</TypeDescription>

            <BellCurveContainer>
              <BellCurveChart
                userScore={selectedTypeData.userScore}
                userType={selectedTypeData.name}
                successRate={selectedTypeData.range}
                maintainRate="N%"
              />
            </BellCurveContainer>
          </TypeContent>
        )}
      </div>
    </BottomSheet>
  );
}

export default HumanTypeBottomSheet; 