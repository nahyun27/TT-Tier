import React from 'react';

const BasicInfo = ({ onNext }) => {
  return (
    <div className="basic-info">
      <h2>기본 정보란</h2>
      <div className="input-group">
        <label>이름</label>
        <input type="text" placeholder="이름을 입력하세요" />
      </div>
      <div className="input-group">
        <label>연락처</label>
        <input type="text" placeholder="연락처를 입력하세요" />
      </div>
      <div className="navigation-buttons">
        <button onClick={onNext}>
          다음
        </button>
      </div>
    </div>
  );
};

export default BasicInfo;
