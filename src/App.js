import React, { useState } from 'react';
import BasicInfo from './components/BasicInfo';
import TournamentCheck from './components/TournamentCheck';
import FinalSubmission from './components/FinalSubmission';
import Questionnaire from './components/Questionnaire'; 
import './App.scss';

function App() {
  const [flow, setFlow] = useState('');
  const [step, setStep] = useState(0);
  const [surveyStep, setSurveyStep] = useState(0); 

  const tournamentCheckData = [
    {
      date: "2023-03-01",
      eventName: "국가대표 선발전",
      category: "복식",
      result: "준우승",
      playerName: "김철수"
    },
    {
      date: "2022-06-15",
      eventName: "오픈 국화 대회",
      category: "단식",
      result: "우승",
      playerName: "홍길동"
    }
  ];

  const surveyQuestions = [
    {
      question: "선수 경험이 있습니까?",
      options: ["선수 경험없음", "테니스, 정구 선출", "타종목 선출"]
    },
    {
      question: "오픈 국화 대회 우승/입상 여부",
      options: ["YES", "NO"]
    },
    {
      question: "오픈 국화 대회 우승/입상 2회 이상 여부",
      options: ["YES", "NO"]
    },
    {
      question: "신입부/개나리 입상 및 우승 여부",
      options: ["YES", "NO"]
    },
    {
      question: "최근 2년동안 입상 내역 작성해 주세요.",
      options: ["입상 내역 있음", "입상 내역 없음"]
    }
  ];

  const nextSurveyStep = () => setSurveyStep(surveyStep + 1);
  const prevSurveyStep = () => {
    if (surveyStep === 0) {
      setFlow(''); // 첫 번째 질문에서 이전 버튼을 눌렀을 때 flow 상태 초기화
    } else {
      setSurveyStep(surveyStep - 1);
    }
  };

  const renderSurvey = () => {
    if (surveyStep >= surveyQuestions.length) {
      return <FinalSubmission onPrevious={() => setSurveyStep(surveyQuestions.length - 1)} />;
    }
  
    return (
      <Questionnaire
        question={surveyQuestions[surveyStep].question}
        options={surveyQuestions[surveyStep].options}
        onNext={nextSurveyStep}
        onPrevious={prevSurveyStep}
      />
    );
  };
  

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const resetFlow = () => {
    setFlow('');
    setStep(0);
    setSurveyStep(0);
  };

  const renderTierAssignment = () => {
    switch (step) {
      case 0:
        return <BasicInfo onNext={nextStep} onPrevious={resetFlow} />;
      case 1:
        return <TournamentCheck data={tournamentCheckData} onNext={nextStep} onPrevious={prevStep} />;
      case 2:
        return <FinalSubmission onPrevious={prevStep} />;
      default:
        return <BasicInfo onNext={nextStep} onPrevious={resetFlow} />;
    }
  };

  const renderContent = () => {
    if (flow === 'survey') {
      return renderSurvey();
    } else if (flow === 'tierAssignment') {
      return renderTierAssignment();
    } else {
      return (
        <div className="selection-page">
          <h2>원하는 흐름을 선택하세요</h2>
          <div className="option-buttons">
            <button onClick={() => { setFlow('survey'); setSurveyStep(0); }}>
              설문지 시작
            </button>
            <button onClick={() => { setFlow('tierAssignment'); setStep(0); }}>
              예비티어 배정 시작
            </button>
          </div>
        </div>
      );
    }
  };

  const renderHeader = () => {
    if (flow === 'survey') {
      return <h1>티어 배정 설문</h1>;
    } else if (flow === 'tierAssignment') {
      return <h1>예비티어 배정</h1>;
    }
    return null;
  };

  return (
    <div className="App">
      <header className="App-header">
        {renderHeader()}
      </header>
      <div className="container">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
