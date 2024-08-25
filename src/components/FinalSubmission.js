import React from 'react';
import IronTierImage from '../assets/tier_iron.png'; // 이미지 파일 경로를 지정하세요

const FinalSubmission = ({ onPrevious }) => {
  return (
    <div className="final-submission">
      <h2>추천 티어: IRON</h2>
      <img src={IronTierImage} alt="Iron Tier" style={{ width: '50%', height: 'auto', margin: '0 auto', display: 'block' }} />
      <p>기존 NTRP 시스템으로 1.5로 추정됩니다.</p>
      <div className="tier-info">
        <p>일반적으로는 구력 1년 이하의 테린이 단계이며, 이제 막 테니스의 재미를 깨우친 분으로 아직까지 원활한 게임이 쉽지 않습니다.
        얼마나 열심히, 많이 치셨는가에 따라 같은 구력이라도 티어는 달라질 수 있어요^^</p>
      </div>
      <div className="navigation-buttons">
        <button className="prev-button" onClick={onPrevious}>
          이전
        </button>
        <button onClick={() => alert("티어배정이 완료되었습니다!")}>
          확인
        </button>
      </div>
    </div>
  );
};

export default FinalSubmission;
