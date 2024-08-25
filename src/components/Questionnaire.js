import React, { useState } from 'react';

const Questionnaire = ({ question, options, onNext, onPrevious }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [otherSport, setOtherSport] = useState('');

  const handleSelect = (option) => {
    if (selectedOption === option) {
      setSelectedOption(''); // 동일한 버튼을 다시 누르면 선택 해제
      setOtherSport(''); // 타종목 필드도 초기화
    } else {
      setSelectedOption(option);
      if (option !== '타종목 선출') {
        setOtherSport(''); // 타종목이 아닌 다른 옵션 선택 시 타종목 필드 초기화
      }
    }
  };

  const handleNext = () => {
    if (selectedOption) {
      if (selectedOption === '타종목 선출' && !otherSport) {
        alert("타종목을 입력해주세요.");
      } else {
        onNext(selectedOption === '타종목 선출' ? `${selectedOption} - ${otherSport}` : selectedOption);
      }
    } else {
      alert("옵션을 선택해주세요.");
    }
  };

  return (
    <div className="questionnaire">
      <h2>{question}</h2>
      <div className={`option-buttons ${options.length === 2 ? 'two-options' : ''}`}>
        {options.map((option, index) => (
          <button
            key={index}
            className={selectedOption === option ? 'selected' : ''}
            onClick={() => handleSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {/* 타종목 선출을 선택했을 때만 입력란을 표시 */}
      {selectedOption === '타종목 선출' && (
        <div className="other-sport-input">
          <label>종목을 입력해주세요:</label>
          <input
            type="text"
            value={otherSport}
            onChange={(e) => setOtherSport(e.target.value)}
            placeholder="종목을 입력해주세요"
          />
        </div>
      )}
      <div className="navigation-buttons">
        <button className="prev-button" onClick={onPrevious}>
          이전
        </button>
        <button onClick={handleNext}>
          다음
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;
